'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  User, 
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  PhoneCall,
  Lightbulb
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const QUICK_SUGGESTIONS = [
  'چطور رکورد جدید ثبت کنم؟',
  'قیف فروش چطور کار می‌کنه؟',
  'چطور با پشتیبانی تماس بگیرم؟',
  'نحوه ثبت محصولات و خدمات',
  'کلید میانبر جستجو چیه؟',
];

export default function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'سلام! من دستیار هوشمند سامانه «همیار» هستم 🤖🌿\nهر سوالی درباره نحوه کار با بخش‌های مختلف CRM، ثبت مشتریان، قیف فروش یا گزارش‌ها داری از من بپرس تا راهنماییت کنم!',
      time: 'هم‌اکنون',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Dismiss floating tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Intelligent Persian CRM Assistant Knowledge Engine
  const generateAiResponse = (query: string): string => {
    const q = query.toLowerCase().trim();

    if (q.includes('رکورد') || q.includes('ثبت مخاطب') || q.includes('مشتری جدید') || q.includes('اضافه کردن') || q.includes('ایجاد')) {
      return 'برای ایجاد رکورد جدید در همیار:\n\n۱. روی دکمه سبز رنگ «+ ایجاد رکورد جدید» در بالای صفحه (هدر) کلیک کنید.\n۲. نوع رکورد را مشخص کنید (مخاطب جدید، فرصت معامله یا وظیفه).\n۳. نام، شماره تماس و مرحله را وارد کرده و دکمه «ثبت و ذخیره در همیار» را بزنید.\n\nنکته: در صورتی که وارد سیستم نشده باشید، ابتدا فرم ورود باز می‌شود تا تغییرات به نام شما ثبت شود.';
    }

    if (q.includes('قیف فروش') || q.includes('پایپ') || q.includes('pipeline') || q.includes('کانبان') || q.includes('معامله') || q.includes('مذاکره')) {
      return 'قیف فروش (Pipeline) همیار به صورت بورد کانبان طراحی شده است:\n\n• سرنخ‌های اولیه (Leads)\n• ارزیابی نیازها (Qualification)\n• پیش‌فاکتور ارسال‌شده (Proposal)\n• مذاکره نهایی و معاملات موفق (Won)\n\nمی‌توانید از منوی سایدبار گزینه «قیف فروش» را انتخاب کنید تا ارزش مالی و تعداد معاملات هر مرحله را مشاهده نمایید.';
    }

    if (q.includes('پشتیبانی') || q.includes('تماس') || q.includes('تلفن') || q.includes('شماره') || q.includes('راهنما') || q.includes('واتساپ')) {
      return 'تیم پشتیبانی همیار به صورت ۲۴ ساعته در ۷ روز هفته در خدمت شماست:\n\n📞 تلفن پشتیبانی ۲۴/۷: ۱۶۵۰۰ (داخلی ۲)\n💬 واتس‌اپ سازمانی: 09123456789\n✉️ ایمیل پشتیبانی: support@hamyarcrm.ir\n\nهمچنین با رفتن به بخش «پشتیبانی» در منوی سایدبار می‌توانید به صورت مستقیم تیکت ثبت کنید.';
    }

    if (q.includes('محصول') || q.includes('تعرفه') || q.includes('لایسنس') || q.includes('قیمت')) {
      return 'برای مشاهده و مدیریت محصولات:\n\n۱. از منوی سایدبار روی گزینه «محصولات» کلیک کنید.\n۲. لیست کاتالوگ، لایسنس‌ها، موجودی و تعرفه هر خدمت را در دسته‌بندی‌های مختلف مشاهده می‌کنید.\n۳. با دکمه «افزودن محصول جدید» می‌توانید تعرفه یا پکیج اختصاصی جدید تعریف کنید.';
    }

    if (q.includes('جستجو') || q.includes('میانبر') || q.includes('ctrl') || q.includes('سرچ')) {
      return 'سامانه همیار دارای پالت جستجوی سریع و هوشمند است:\n\n• کافیست کلیدهای ترکیبی Ctrl + K (یا در مک Command + K) را روی کیبورد فشار دهید.\n• یا روی کادر جستجوی هدر بالا کلیک کنید تا پالت جستجو باز شود و بتوانید بلادرنگ بین مشتریان، فاکتورها و معاملات جستجو نمایید.';
    }

    if (q.includes('سایدبار') || q.includes('منو') || q.includes('بسته') || q.includes('باز')) {
      return 'برای دسترسی به سایدبار و تمام بخش‌های CRM:\n\nروی آیکون ۳ خط (دکمه «منو») در گوشه بالای صفحه کلیک کنید. سایدبار با انیمیشن نرم از سمت راست باز می‌شود و با کلیک روی ضربدر یا فضای خالی، به آرامی بسته خواهد شد.';
    }

    if (q.includes('ورود') || q.includes('ثبت نام') || q.includes('پروفایل') || q.includes('نقش') || q.includes('عکس')) {
      return 'برای مدیریت حساب کاربری و هویت در همیار:\n\nروی آیکون آدمک (یا عکس پروفایل خود) در بالا سمت چپ کلیک کنید. در این بخش می‌توانید نام، سمت سازمانی (مانند مدیر فروش یا کارشناس بازرگانی) و تصویر پروفایل خود را آپلود یا انتخاب نمایید.';
    }

    if (q.includes('سلام') || q.includes('درود') || q.includes('خوبی')) {
      return 'سلام و درود! خوشحالم که در سامانه مدیریت مشتریان همیار در کنارتون هستم 😊\nچه کمکی از دست من برای کارهای روزمره CRM شما برمی‌آید؟';
    }

    // Default Fallback
    return `در خصوص «${query}» در سامانه همیار:\nشما می‌توانید از طریق منوی سایدبار (دکمه منو در بالای صفحه) به بخش‌های مرتبط از جمله پیشخوان، قیف فروش، مخاطبین، محصولات، پیام‌ها و فعالیت‌ها دسترسی پیدا کنید.\n\nاگر سوال مشخص‌تری در مورد ثبت رکورد، تماس با پشتیبانی یا گزارش‌ها دارید بفرمایید تا دقیقاً راهنماییتان کنم!`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate natural AI thinking & response
    setTimeout(() => {
      const reply = generateAiResponse(text);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 850);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: 'گفت‌وگو بازنشانی شد. چطور می‌تونم کمکتون کنم؟ 🌿',
        time: 'هم‌اکنون',
      },
    ]);
  };

  return (
    <>
      {/* Sticky Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Floating Greeting Bubble (idle tooltip) */}
        {!isOpen && showTooltip && (
          <div 
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className="cursor-pointer bg-white border border-[#B7D894] px-3.5 py-1.5 rounded-2xl shadow-lg shadow-[#71951E]/15 text-xs text-slate-700 flex items-center gap-1.5 animate-bounce"
          >
            <span className="w-2 h-2 rounded-full bg-[#71951E]"></span>
            <span>دستیار هوشمند همیار؛ کمکی نیاز دارید؟</span>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600 mr-1 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Sticky Standalone Robot Button (No white background - pure robot) */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative group transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95 select-none"
          title="گفت‌وگو با دستیار هوشمند همیار"
          aria-label="دستیار هوشمند"
        >
          {/* Subtle soft aura glow on hover */}
          <div className="absolute inset-2 rounded-full bg-[#71951E]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

          {/* Standalone Transparent Robot Image */}
          <img 
            src="/ai-assistant.webp" 
            alt="دستیار هوش مصنوعی همیار"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1"
          />

          {/* Active Status Badge */}
          <span className="absolute top-1 left-2 w-3.5 h-3.5 bg-[#71951E] border-2 border-white rounded-full shadow-xs"></span>
        </button>
      </div>

      {/* Floating Chat Window (Anchored to Bottom-Right) */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-84 sm:w-96 max-w-[calc(100vw-2rem)] h-[480px] sm:h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-fade-in"
          style={{ direction: 'rtl' }}
        >
          {/* Header */}
          <div className="p-4 bg-linear-to-l from-slate-900 to-slate-800 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/20">
                <img 
                  src="/ai-assistant.webp" 
                  alt="همیار AI" 
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#B7D894] rounded-full border border-slate-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white">دستیار هوشمند همیار</h3>
                  <Sparkles className="w-3.5 h-3.5 text-[#B7D894]" />
                </div>
                <p className="text-[10px] text-slate-300">پاسخگوی سوالات شما درباره سامانه</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="شروع گفت‌وگوی جدید"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="بستن پنجره"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'}`}
              >
                {/* Avatar Icon */}
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-1 text-xs ${
                  msg.sender === 'user' 
                    ? 'bg-slate-200 text-slate-700' 
                    : 'bg-[#B7D894]/30 text-[#71951E]'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-[#71951E] text-white rounded-tl-xs'
                    : 'bg-white border border-slate-100 text-slate-800 rounded-tr-xs'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1.5 ${
                    msg.sender === 'user' ? 'text-white/70 text-left' : 'text-slate-400 text-left'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-[#B7D894]/30 text-[#71951E] shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-100 px-3.5 py-2.5 rounded-2xl text-xs text-slate-400 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#71951E] animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#71951E] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#71951E] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
            {QUICK_SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(suggestion)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 hover:bg-[#B7D894]/25 hover:text-[#71951E] text-slate-600 border border-slate-200/60 transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="سوال خود درباره کار با همیار را بنویسید..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#71951E] focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-xl bg-[#71951E] hover:bg-[#5e7c17] disabled:opacity-40 disabled:hover:bg-[#71951E] text-white flex items-center justify-center shrink-0 shadow-xs transition-all cursor-pointer"
                title="ارسال پیام"
              >
                <Send className="w-4 h-4 -rotate-90" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
