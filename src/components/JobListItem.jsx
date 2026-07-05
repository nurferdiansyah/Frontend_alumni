import React from 'react';
import { MapPin, Calendar, Clock, Building } from 'lucide-react';
import { Button } from './Button';

export function JobListItem({ position, company, location, deadline, logo }) {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-[#F8FAFC] rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {logo ? (
            <img src={logo} alt={company} className="w-8 h-8 object-contain" />
          ) : (
            <div className="text-gray-400">
              <Building size={24} />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-[17px] text-gray-900 mb-1">{position}</h3>
          <p className="text-gray-500 text-[14px]">{company}</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto mt-2 md:mt-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center text-gray-600 text-[13px] bg-[#F8FAFC] px-3 py-2 rounded-xl border border-gray-100 font-medium">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" /> {location}
          </div>
          <div className="flex items-center text-[#E11D48] text-[13px] font-medium bg-[#FFF1F2] px-3 py-2 rounded-xl border border-[#FFE4E6]">
            <Calendar className="w-4 h-4 mr-2" /> {deadline}
          </div>
        </div>
        <Button variant="primary" className="w-full md:w-auto px-7 py-3 text-[14px] rounded-xl shadow-none font-bold bg-[#0F4C3A] hover:bg-[#0a3629] text-white">Lamar Sekarang</Button>
      </div>
    </div>
  );
}
