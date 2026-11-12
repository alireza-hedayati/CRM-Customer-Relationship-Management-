'use client';

import React from 'react';
import { mockTopCompanies } from '@/data/mockCrmData';
import { ArrowLeft, Building2 } from 'lucide-react';

interface TopCompaniesCardProps {
  onSeeAll?: () => void;
}

export default function TopCompaniesCard({ onSeeAll }: TopCompaniesCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-full">
      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">برترین شرکت‌ها</h4>
              <p className="text-[10px] text-slate-400">بیشترین حجم معاملات این ماه</p>
            </div>
          </div>

          <button 
            onClick={onSeeAll}
            className="flex items-center gap-1 text-xs font-semibold text-[#71951E] hover:text-[#5e7c17] transition-colors"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of Companies with Colored Bullet Points (No initials/acronyms) */}
        <div className="mt-4 divide-y divide-slate-100/80">
          {mockTopCompanies.map((company) => (
            <div 
              key={company.id}
              className="py-3 flex items-center justify-between hover:bg-slate-50/70 px-2.5 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                {/* Rank Number */}
                <span className="text-xs font-bold text-slate-400 w-4 text-center">
                  {company.rank}.
                </span>

                {/* Colored Bullet Point Indicator based on Rank */}
                <div className="flex items-center justify-center w-5 h-5">
                  <span className={`w-3 h-3 rounded-full transition-transform group-hover:scale-125 duration-150 ${company.rankColor}`} />
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#71951E] transition-colors">
                    {company.name}
                  </h5>
                  <span className="text-[10px] text-slate-400">
                    {company.tag}
                  </span>
                </div>
              </div>

              <div className="text-left">
                <span className="text-xs font-bold text-slate-700 block">
                  {company.turnover}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">گردش مالی</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>مجموع ۵ شرکت برتر:</span>
        <span className="font-bold text-slate-700">۹۴,۵۰۰ #حیر</span>
      </div>
    </div>
  );
}
