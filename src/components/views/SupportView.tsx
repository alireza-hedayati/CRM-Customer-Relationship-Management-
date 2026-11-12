'use client';

import React, { useState } from 'react';
import { HelpCircle, PhoneCall, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function SupportView() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketSubject('');
      setTicketBody('');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">مرکز راهنما و پشتیبانی همیار</h2>
            <p className="text-xs text-slate-400">ارتباط مستقیم با کارشناسان و پاسخ به سوالات متداول</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">تماس تلفنی ۲۴/۷</h4>
            <p className="text-xs font-bold text-[#71951E] mt-0.5">۱۶۵۰۰ (داخلی ۲)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">ایمیل پشتیبانی</h4>
            <p className="text-xs font-medium text-slate-600 mt-0.5">support@hamyarcrm.ir</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">واتس‌اپ سازمانی</h4>
            <p className="text-xs font-medium text-slate-600 mt-0.5" dir="ltr">+98 912 345 6789</p>
          </div>
        </div>
      </div>

      {/* Ticket Form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 max-w-2xl">
        <h3 className="text-sm font-bold text-slate-800 mb-4">ارسال تیکت به تیم فنی و پشتیبانی</h3>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#71951E] mb-2" />
            <h4 className="text-sm font-bold text-slate-800">تیکت شما با موفقیت ثبت شد</h4>
            <p className="text-xs text-slate-400 mt-1">کارشناسان ما حداکثر تا ۳۰ دقیقه آینده پاسخگو خواهند بود.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">موضوع تیکت</label>
              <input
                type="text"
                required
                placeholder="مثلاً: راهنمایی در خصوص اتصال وب‌هوک پیامک"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">متن پیام و توضیحات</label>
              <textarea
                rows={4}
                required
                placeholder="توضیحات خود را بنویسید..."
                value={ticketBody}
                onChange={(e) => setTicketBody(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#71951E] hover:bg-[#5e7c17] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ارسال تیکت پشتیبانی</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
