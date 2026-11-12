'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCheck, Clock, User } from 'lucide-react';

export default function MessagesView() {
  const [activeMessageId, setActiveMessageId] = useState('m1');
  const [replyText, setReplyText] = useState('');

  const messages = [
    {
      id: 'm1',
      sender: 'مهندس حسینی (شرکت آمیز اندام)',
      avatar: 'ح',
      subject: 'تایید پیش‌فاکتور لایسنس همیار',
      date: 'امروز ۱۰:۳۰',
      content: 'سلام و احترام، پیش‌فاکتور ارسالی برای نسخه پیشرفته به تایید امور مالی رسید. لطفاً مراحل قرارداد نهایی و اطلاعات پرداخت را ارسال بفرمایید.',
      unread: true,
    },
    {
      id: 'm2',
      sender: 'خانم احمدی (معاملات فیمنی)',
      avatar: 'ا',
      subject: 'درخواست جلسه دمو برای تیم بازرگانی',
      date: 'دیروز ۱۶:۱۵',
      content: 'با سلام، آیا امکان هماهنگی جلسه حضوری یا آنلاین برای روز دوشنبه ساعت ۱۰ صبح جهت بررسی ماژول انبارداری و اتصال وب‌هوک وجود دارد؟',
      unread: false,
    },
    {
      id: 'm3',
      sender: 'پشتیبانی فنی سیستم همیار',
      avatar: 'هـ',
      subject: 'به‌روزرسانی امنیتی نسخه ۲.۱',
      date: '۲ روز پیش',
      content: 'کاربر گرامی، سرورهای پایگاه‌داده همیار با موفقیت به آخرین وصله امنیتی مجهز شدند. نیازی به اقدام خاصی از سمت شما نیست.',
      unread: false,
    },
  ];

  const activeMessage = messages.find(m => m.id === activeMessageId) || messages[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">مرکز پیام‌ها و صندوق ورودی</h2>
            <p className="text-xs text-slate-400">مکاتبات مستقیم با مشتریان، سرنخ‌ها و تیم پشتیبانی</p>
          </div>
        </div>
      </div>

      {/* Split Inbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Messages List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setActiveMessageId(msg.id)}
              className={`p-4 cursor-pointer transition-colors ${
                activeMessageId === msg.id ? 'bg-[#F1F6EB]/60 border-r-4 border-[#71951E]' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 truncate">{msg.sender}</span>
                <span className="text-[10px] text-slate-400 shrink-0">{msg.date}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 truncate">{msg.subject}</p>
              <p className="text-[11px] text-slate-400 truncate mt-1">{msg.content}</p>
            </div>
          ))}
        </div>

        {/* Message Viewer & Reply (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B7D894]/30 text-[#71951E] flex items-center justify-center font-bold text-sm">
                  {activeMessage.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{activeMessage.sender}</h3>
                  <span className="text-xs text-slate-400">{activeMessage.subject}</span>
                </div>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeMessage.date}
              </span>
            </div>

            <div className="py-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeMessage.content}
            </div>
          </div>

          {/* Quick Reply Box */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="پاسخ سریع خود را بنویسید..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#71951E] focus:bg-white transition-colors"
              />
              <button
                onClick={() => {
                  if (replyText) {
                    alert('پاسخ شما با موفقیت ارسال شد!');
                    setReplyText('');
                  }
                }}
                className="flex items-center gap-1.5 bg-[#71951E] hover:bg-[#5e7c17] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ارسال</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
