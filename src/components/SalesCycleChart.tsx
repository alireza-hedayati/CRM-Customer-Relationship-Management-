'use client';

import React, { useState } from 'react';
import { mockSalesCycleData } from '@/data/mockCrmData';
import { BarChart3, TrendingUp, Info } from 'lucide-react';

export default function SalesCycleChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Maximum value for scaling the bar heights
  const maxVal = 220;

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-bold text-slate-800">
              طول چرخه فروش در مراحل مختلف
            </h4>
            <p className="text-[11px] text-slate-400">
              مقایسه میانگین روزهای تبدیل به مشتری در بازه‌های زمانی مختلف
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#71951E]"></span>
            <span className="text-slate-600">مشتریان جدید</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#B7D894]"></span>
            <span className="text-slate-600">مشتریان قبلی</span>
          </div>
        </div>
      </div>

      {/* Main Chart Graphic */}
      <div className="mt-8 relative">
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
          {[200, 150, 100, 50, 0].map((val) => (
            <div key={val} className="flex items-center gap-3">
              <span className="text-[10px] text-slate-300 w-6 text-left">{val}</span>
              <div className="h-px w-full bg-slate-100"></div>
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="relative pr-9 pt-4 pb-2 h-64 flex items-end justify-between gap-2 md:gap-6 z-10">
          {mockSalesCycleData.map((item, idx) => {
            const newHeight = `${(item.newCustomers / maxVal) * 100}%`;
            const existingHeight = `${(item.existingCustomers / maxVal) * 100}%`;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.period}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-16 z-30 bg-slate-800 text-white text-[11px] rounded-xl px-3 py-2 shadow-xl whitespace-nowrap pointer-events-none flex flex-col gap-0.5 border border-slate-700">
                    <span className="font-bold text-[#B7D894]">{item.period}</span>
                    <div className="flex items-center justify-between gap-3 text-[10px]">
                      <span>جدید: {item.newCustomers} ({item.newPercent})</span>
                      <span>قبلی: {item.existingCustomers} ({item.existingPercent})</span>
                    </div>
                  </div>
                )}

                {/* Bars Pair */}
                <div className="w-full flex items-end justify-center gap-1 md:gap-2 h-full pb-1">
                  {/* New Customer Bar */}
                  <div className="w-3.5 sm:w-5 md:w-6 flex flex-col items-center justify-end h-full">
                    <span className="text-[9px] font-bold text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.newPercent}
                    </span>
                    <div
                      style={{ height: newHeight }}
                      className="w-full bg-[#71951E] rounded-t-md group-hover:brightness-110 transition-all duration-300 shadow-2xs"
                    />
                  </div>

                  {/* Existing Customer Bar */}
                  <div className="w-3.5 sm:w-5 md:w-6 flex flex-col items-center justify-end h-full">
                    <span className="text-[9px] font-bold text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.existingPercent}
                    </span>
                    <div
                      style={{ height: existingHeight }}
                      className="w-full bg-[#B7D894] rounded-t-md group-hover:brightness-110 transition-all duration-300 shadow-2xs"
                    />
                  </div>
                </div>

                {/* X-Axis Period Label */}
                <span className="mt-2 text-[10px] md:text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
                  {item.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Insight */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Info className="w-4 h-4 text-[#71951E]" />
          <span>بیشترین حجم بسته‌شدن معاملات جدید در بازه ۱۵ تا ۲۰ روز رخ داده است.</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-[#71951E]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>نرخ تبدیل کلی: ۲۳.۴٪</span>
        </div>
      </div>
    </div>
  );
}
