const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/admin/PengaturanAdmin.jsx',
  'src/pages/admin/ManajemenDokumenAdmin.jsx',
  'src/pages/admin/LowonganAdmin.jsx',
  'src/pages/admin/InfoKampusAdmin.jsx',
  'src/pages/admin/DataAlumni.jsx',
  'src/pages/admin/BeritaAdmin.jsx',
  'src/api/axiosInstance.js'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Ensure Swal is imported
  if (!content.includes('import Swal from \'sweetalert2\'')) {
    // find the last import and insert it after
    const imports = content.match(/import.*from.*/g);
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(lastImport, lastImport + "\nimport Swal from 'sweetalert2';");
    } else {
      content = "import Swal from 'sweetalert2';\n" + content;
    }
  }

  // Replace window.confirm
  // Pattern: if (window.confirm('message')) {
  // we want to extract the message
  content = content.replace(/if\s*\(\s*window\.confirm\(\s*(['"`])(.*?)\1\s*\)\s*\)\s*\{/g, 
    "const result = await Swal.fire({\n      title: 'Konfirmasi',\n      text: '$2',\n      icon: 'warning',\n      showCancelButton: true,\n      confirmButtonColor: '#0F4C3A',\n      cancelButtonColor: '#d33',\n      confirmButtonText: 'Ya, Lanjutkan',\n      cancelButtonText: 'Batal'\n    });\n    if (result.isConfirmed) {"
  );

  // Replace alert
  // Pattern: alert('message');
  content = content.replace(/alert\(\s*(['"`])(.*?)\1\s*\)/g, 
    "Swal.fire('Informasi', '$2', 'info')"
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', file);
  }
});
