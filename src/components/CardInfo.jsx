import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CardInfo({ title, description, icon: Icon, image, actionText, isLarge }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full ${isLarge ? 'md:col-span-2' : ''}`}>
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-6 flex flex-col flex-grow">
        {Icon && (
          <div className="text-[#0F4C3A] mb-4 bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl">
            <Icon size={24} />
          </div>
        )}
        <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        {actionText && (
          <a href="#" className="inline-flex items-center text-[#7FE0B0] font-medium hover:text-[#66c698] transition-colors mt-auto">
            {actionText} <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
    </div>
  );
}
