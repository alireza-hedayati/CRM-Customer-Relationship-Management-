'use client';

import React, { useState } from 'react';
import { X, UserPlus, Briefcase, Calendar, CheckSquare, Sparkles } from 'lucide-react';

interface NewRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordCreated?: (record: any) => void;
}

export default function NewRecordModal({ isOpen, onClose }: NewRecordModalProps) {
  const [recordType, setRecordType] = useState<'contact' | 'deal' | 'task'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    value: '',
    stage: 'سرنخ اولیه',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 z-10 transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">ایجاد رکورد جدید</h3>
              <p className="text-xs text-slate-400">اطلاعات را وارد کنید تا به سیستم همیار افزوده شود</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Record Type Selector */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <button
            type="button"
            onClick={() => setRecordType('contact')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              recordType === 'contact'
                ? 'bg-[#71951E] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>مخاطب جدید</span>
          </button>

          <button
            type="button"
            onClick={() => setRecordType('deal')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              recordType === 'deal'
                ? 'bg-[#71951E] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>فرصت معامله</span>
          </button>

          <button
            type="button"
            onClick={() => setRecordType('task')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              recordType === 'task'
                ? 'bg-[#71951E] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>وظیفه جدید</span>
          </button>
        </div>

        {/* Form Body */}
        {isSubmitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#B7D894]/30 text-[#71951E] flex items-center justify-center mb-3">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-800">رکورد با موفقیت ثبت شد!</h4>
            <p className="text-xs text-slate-400 mt-1">اطلاعات در داشبورد همیار به‌روزرسانی شد.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نام مخاطب یا شرکت
              </label>
              <input
                type="text"
                required
                placeholder="مثلاً: شرکت پیشرو صنعت یا علی رضایی"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E] focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شماره تماس
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="0912..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E] focus:bg-white transition-colors text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  مرحله در پایپ‌لاین
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E] focus:bg-white transition-colors"
                >
                  <option value="سرنخ اولیه">سرنخ اولیه (Lead)</option>
                  <option value="جلسه اولیه">جلسه اولیه (Meeting)</option>
                  <option value="ارسال پیش‌فاکتور">ارسال پیش‌فاکتور</option>
                  <option value="مذاکره نهایی">مذاکره نهایی</option>
                  <option value="معامله موفق">معامله موفق (Won)</option>
                </select>
              </div>
            </div>

            {recordType === 'deal' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ارزش تقریبی معامله (تومان)
                </label>
                <input
                  type="text"
                  placeholder="مثلاً: ۵۰،۰۰۰،۰۰۰"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E] focus:bg-white transition-colors"
                />
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#71951E] hover:bg-[#5e7c17] text-white shadow-xs transition-colors"
              >
                ثبت و ذخیره در همیار
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
