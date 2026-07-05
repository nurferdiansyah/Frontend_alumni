import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Button } from './Button';

export function JobListItem({ position, company, location, deadline, logo }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {logo ? (
            <img src={logo} alt={company} className="w-10 h-10 object-contain" />
          ) : (
            <div className="font-bold text-xl text-gray-400">{company.charAt(0)}</div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{position}</h3>
          <p className="text-gray-600">{company}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto mt-2 md:mt-0">
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="w-4 h-4 mr-1.5" /> {location}
        </div>
        <div className="flex items-center text-orange-500 text-sm font-medium bg-orange-50 px-3 py-1 rounded-lg">
          <Calendar className="w-4 h-4 mr-1.5" /> {deadline}
        </div>
        <Button variant="primary" className="w-full md:w-auto px-6 py-2 text-sm">Lamar Sekarang</Button>
      </div>
    </div>
  );
}
