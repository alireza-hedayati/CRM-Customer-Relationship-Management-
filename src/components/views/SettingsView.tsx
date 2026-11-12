'use client';

import React from 'react';
import { Settings, Save, Shield, User, Bell, Palette } from 'lucide-react';

export default function SettingsView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">تنظیمات سامانه همیار</h2>
            <p className="text-xs text-slate-400">شخصی‌سازی حساب کاربری، تیم‌ها و اعلانات سیستم</p>
          </div>
        </div>

        <button 
          onClick={() => alert('تنظیمات با موفقیت ذخیره شد!')}
          className="flex items-center gap-2 bg-[#71951E] hover:bg-[#5e7c17] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>ذخیره تغییرات</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 space-y-6 max-w-2xl">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400">اطلاعات سازمانی</h3>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">عنوان سازمان / کسب‌وکار</label>
            <input 
              type="text" 
              defaultValue="گروه تجاری همیار CRM" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">واحد پول پیش‌فرض سیستم</label>
            <select 
              defaultValue="toman"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E]"
            >
              <option value="toman">تومان (ایران)</option>
              <option value="rial">ریال (ایران)</option>
              <option value="dollar">دلار آمریکا ($)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="text-xs font-bold text-slate-400">اعلانات و پیام‌رسانی</h3>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-bold text-slate-700">ارسال پیامک در زمان ثبت سرنخ جدید</p>
              <p className="text-[10px] text-slate-400">به محض ثبت رکورد جدید، پیامک اطلاع‌رسانی برای کارشناس ارسال شود</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#71951E] rounded-md" />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-bold text-slate-700">هشدارهای ایمیلی قراردادها</p>
              <p className="text-[10px] text-slate-400">اطلاع‌رسانی موعد تمدید لایسنس مشتریان ۵ روز قبل</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#71951E] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
