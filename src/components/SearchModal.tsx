'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Users, Briefcase, FileText, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickResults = [
    { type: 'contact', title: 'شرکت آمیز اندام', subtitle: 'گردش مالی: ۳۹,۰۰۰ #حیر', icon: Users },
    { type: 'deal', title: 'قرارداد توسعه نرم‌افزار سازمانی', subtitle: 'مرحله: مذاکره نهایی', icon: Briefcase },
    { type: 'contact', title: 'معاملات فیمنی', subtitle: 'گردش مالی: ۲۰,۰۰۰ #حیر', icon: Users },
    { type: 'task', title: 'پیگیری تلفنی سرنخ‌های نمایشگاه', subtitle: 'موعد: امروز ساعت ۱۶:۰۰', icon: FileText },
  ];

  const filtered = query
    ? quickResults.filter(r => r.title.includes(query) || r.subtitle.includes(query))
    : quickResults;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Search Palette */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 z-10 overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="جستجو در مخاطبان، پرونده‌ها، معاملات یا وظایف..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto">
          <span className="text-[11px] font-bold text-slate-400 px-3 py-1 block">
            پیشنهادات و نتایج سریع
          </span>

          <div className="mt-1 space-y-1">
            {filtered.length > 0 ? (
              filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#B7D894]/30 text-slate-600 group-hover:text-[#71951E] flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#71951E] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#71951E] transition-colors" />
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                موردی یافت نشد.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
