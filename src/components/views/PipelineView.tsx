'use client';

import React from 'react';
import { GitFork, Plus, DollarSign, Calendar, Building2 } from 'lucide-react';

interface PipelineViewProps {
  onAddDeal?: () => void;
}

export default function PipelineView({ onAddDeal }: PipelineViewProps) {
  const columns = [
    {
      id: 'leads',
      title: 'سرنخ‌های اولیه',
      color: 'border-blue-400',
      badgeColor: 'bg-blue-100 text-blue-700',
      deals: [
        { id: 'd1', title: 'درخواست سیستم برای ۱۵ کاربر', company: 'فناوری نوین آریا', value: '۱۸,۰۰۰,۰۰۰ تومان', date: '۱۴ آبان' },
        { id: 'd2', title: 'خرید ماژول انبارداری', company: 'پخش سراسری البرز', value: '۷,۵۰۰,۰۰۰ تومان', date: '۱۵ آبان' },
      ],
    },
    {
      id: 'qualification',
      title: 'ارزیابی نیازها',
      color: 'border-amber-400',
      badgeColor: 'bg-amber-100 text-amber-700',
      deals: [
        { id: 'd3', title: 'توسعه CRM اختصاصی هلدینگ', company: 'صنایع پارس کیا', value: '۴۵,۰۰۰,۰۰۰ تومان', date: '۱۲ آبان' },
      ],
    },
    {
      id: 'proposal',
      title: 'پیش‌فاکتور ارسال‌شده',
      color: 'border-purple-400',
      badgeColor: 'bg-purple-100 text-purple-700',
      deals: [
        { id: 'd4', title: 'لایسنس سالانه و آموزش', company: 'گروه صنعتی موجو', value: '۳۲,۰۰۰,۰۰۰ تومان', date: '۱۰ آبان' },
        { id: 'd5', title: 'سفارشی‌سازی پایپ‌لاین', company: 'معاملات فیمنی', value: '۲۰,۰۰۰,۰۰۰ تومان', date: '۸ آبان' },
      ],
    },
    {
      id: 'won',
      title: 'معاملات موفق (Won)',
      color: 'border-[#71951E]',
      badgeColor: 'bg-[#B7D894]/30 text-[#71951E]',
      deals: [
        { id: 'd6', title: 'پکیج سازمانی طلایی', company: 'شرکت آمیز اندام', value: '۳۹,۰۰۰,۰۰۰ تومان', date: '۳ آبان' },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">قیف فروش و کانبان معاملات</h2>
            <p className="text-xs text-slate-400">رهگیری فرصت‌های فروش، مراحل پیشرفت و ارزش مالی معاملات</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={onAddDeal}
          className="flex items-center gap-2 bg-[#71951E] hover:bg-[#5e7c17] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن معامله جدید</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {columns.map((col) => (
          <div key={col.id} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
            {/* Column Header */}
            <div className={`flex items-center justify-between pb-2 border-b-2 ${col.color}`}>
              <h3 className="text-xs font-bold text-slate-700">{col.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${col.badgeColor}`}>
                {col.deals.length}
              </span>
            </div>

            {/* Column Deals Cards */}
            <div className="space-y-3">
              {col.deals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2 group"
                >
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#71951E] transition-colors">
                    {deal.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{deal.company}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#71951E]">{deal.value}</span>
                    <span className="text-[10px] text-slate-400">{deal.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
