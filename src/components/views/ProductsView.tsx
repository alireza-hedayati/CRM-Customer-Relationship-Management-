'use client';

import React, { useState } from 'react';
import { Package, Plus, Search, Filter, ArrowUpDown, CheckCircle, Tag, ShoppingCart } from 'lucide-react';

interface ProductsViewProps {
  onAddProduct?: () => void;
}

export default function ProductsView({ onAddProduct }: ProductsViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');

  const categories = ['همه', 'نرم‌افزار و لایسنس', 'خدمات مشاوره', 'پشتیبانی سازمانی'];

  const products = [
    { id: 'p1', code: 'PRD-101', name: 'لایسنس سالانه CRM همیار نسخه پیشرفته', category: 'نرم‌افزار و لایسنس', price: '۲۴,۰۰۰,۰۰۰ تومان', stock: 'نامحدود', status: 'فعال' },
    { id: 'p2', code: 'PRD-102', name: 'پکیج استقرار و آموزش پرسنل فروش', category: 'خدمات مشاوره', price: '۱۲,۵۰۰,۰۰۰ تومان', stock: '۱۵ پکیج', status: 'فعال' },
    { id: 'p3', code: 'PRD-103', name: 'ماژول پیامک و وب‌هوک اختصاصی', category: 'نرم‌افزار و لایسنس', price: '۴,۸۰۰,۰۰۰ تومان', stock: 'نامحدود', status: 'فعال' },
    { id: 'p4', code: 'PRD-104', name: 'پشتیبانی VIP اختصاصی ۲۴ ساعته (شش ماهه)', category: 'پشتیبانی سازمانی', price: '۱۸,۰۰۰,۰۰۰ تومان', stock: '۸ پکیج', status: 'فعال' },
    { id: 'p5', code: 'PRD-105', name: 'لایسنس پایه همیار (۵ کاربره)', category: 'نرم‌افزار و لایسنس', price: '۹,۶۰۰,۰۰۰ تومان', stock: 'نامحدود', status: 'فعال' },
  ];

  const filtered = products.filter(p => {
    const matchSearch = p.name.includes(search) || p.code.includes(search);
    const matchCategory = selectedCategory === 'همه' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">کاتالوگ و لیست محصولات</h2>
            <p className="text-xs text-slate-400">مدیریت تعرفه‌ها، لایسنس‌ها و خدمات ارائه‌شده به مشتریان</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={onAddProduct}
          className="flex items-center gap-2 bg-[#71951E] hover:bg-[#5e7c17] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن محصول جدید</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجو در نام محصول یا کد شناسه..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E] focus:bg-white transition-colors"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#71951E] text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-bold">
              <tr>
                <th className="py-3.5 px-4">کد شناسه</th>
                <th className="py-3.5 px-4">نام محصول / خدمت</th>
                <th className="py-3.5 px-4">دسته‌بندی</th>
                <th className="py-3.5 px-4">قیمت واحد</th>
                <th className="py-3.5 px-4">موجودی / ظرفیت</th>
                <th className="py-3.5 px-4">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400 font-semibold">{product.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      <Tag className="w-3.5 h-3.5 text-[#71951E]" />
                    </div>
                    <span>{product.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{product.category}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{product.price}</td>
                  <td className="py-3 px-4 text-slate-500">{product.stock}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#B7D894]/25 text-[#71951E]">
                      <CheckCircle className="w-3 h-3" />
                      <span>{product.status}</span>
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
