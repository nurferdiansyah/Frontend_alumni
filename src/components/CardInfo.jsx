import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CardInfo({ title, description, icon: Icon, image, actionText, className = "" }) {
  return (
    <div className={`bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full p-8 ${className}`}>
      {Icon && (
        <div className="text-gray-500 mb-5 bg-[#F3F4F6] w-12 h-12 flex items-center justify-center rounded-xl">
          <Icon size={24} />
        </div>
      )}
      <h3 className="font-bold text-[18px] text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 text-[14px] mb-6 flex-grow leading-relaxed">{description}</p>
      
      {image && <img src={image} alt={title} className="w-full h-48 object-cover rounded-[16px] mt-auto shadow-sm" />}
      
      {actionText && (
        <a href="#" className="inline-flex items-center text-[#7FE0B0] font-medium hover:text-[#66c698] transition-colors mt-auto pt-4 text-[14px]">
          {actionText} <ArrowRight className="w-4 h-4 ml-1.5" />
        </a>
      )}
    </div>
  );
}
