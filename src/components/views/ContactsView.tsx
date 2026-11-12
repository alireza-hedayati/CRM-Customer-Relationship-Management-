'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, Building, MoreVertical, CheckCircle2 } from 'lucide-react';

interface ContactsViewProps {
  onAddContact?: () => void;
}

export default function ContactsView({ onAddContact }: ContactsViewProps) {
  const [search, setSearch] = useState('');

  const contacts = [
    { id: '1', name: 'مهندس حسینی', company: 'شرکت آمیز اندام', role: 'مدیر فناوری اطلاعات', phone: '۰۹۱۲۳۴۵۶۷۸۹', email: 'hosseini@amezandam.ir', status: 'مشتری طلایی' },
    { id: '2', name: 'خانم احمدی', company: 'معاملات فیمنی', role: 'مدیر بازرگانی', phone: '۰۹۱۹۸۷۶۵۴۳۲', email: 'ahmadi@fimani.com', status: 'در حال مذاکره' },
    { id: '3', name: 'دکتر کاظمی', company: 'مشتریان معلبدعه', role: 'مدیرعامل', phone: '۰۹۱۳۱۱۱۲۲۳۳', email: 'kazemi@moalbedeh.ir', status: 'سرنخ جدید' },
    { id: '4', name: 'مهندس رضایی', company: 'صنایع دورمت', role: 'سرپرست فروش', phone: '۰۹۳۵۴۴۴۵۵۶۶', email: 'rezaei@doormat.co', status: 'پیش‌فاکتور ارسال شده' },
    { id: '5', name: 'آقای شریفی', company: 'بازرگانی موجو', role: 'مدیر تامین', phone: '۰۹۱۵۹۹۹۸۸۷۷', email: 'sharifi@crowemojo.com', status: 'مشتری بازگشتی' },
  ];

  const filtered = contacts.filter(c => 
    c.name.includes(search) || c.company.includes(search) || c.email.includes(search)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">مخاطبین و مشتریان</h2>
            <p className="text-xs text-slate-400">بانک اطلاعات سرنخ‌ها، مشتریان وفادار و اشخاص کلیدی شرکت‌ها</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={onAddContact}
          className="flex items-center gap-2 bg-[#71951E] hover:bg-[#5e7c17] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن مخاطب جدید</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجو بر اساس نام، شرکت یا ایمیل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-bold">
              <tr>
                <th className="py-3.5 px-4">نام مخاطب</th>
                <th className="py-3.5 px-4">سازمان / شرکت</th>
                <th className="py-3.5 px-4">سمت سازمانی</th>
                <th className="py-3.5 px-4">شماره تماس</th>
                <th className="py-3.5 px-4">ایمیل</th>
                <th className="py-3.5 px-4">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#B7D894]/30 text-[#71951E] flex items-center justify-center font-bold text-xs">
                      {contact.name.charAt(0)}
                    </div>
                    <span>{contact.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{contact.company}</td>
                  <td className="py-3 px-4 text-slate-500">{contact.role}</td>
                  <td className="py-3 px-4 font-mono text-slate-600" dir="ltr">{contact.phone}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono" dir="ltr">{contact.email}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {contact.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
