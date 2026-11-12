'use client';

import React, { useState } from 'react';
import { Activity, CheckSquare, Plus, Calendar, Clock, AlertCircle } from 'lucide-react';

interface ActivitiesViewProps {
  onAddTask?: () => void;
}

export default function ActivitiesView({ onAddTask }: ActivitiesViewProps) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'تماس تلفنی با مدیر خرید شرکت آمیز اندام برای تایید نهایی', time: 'امروز ۱۱:۰۰', priority: 'بالا', completed: false },
    { id: 2, title: 'تنظیم قرارداد لایسنس همیار نسخه پیشرفته برای معاملات فیمنی', time: 'امروز ۱۳:۳۰', priority: 'متوسط', completed: true },
    { id: 3, title: 'جلسه آنلاین ارائه دمو با تیم فنی مشتریان معلبدعه', time: 'فردا ۱۰:۰۰', priority: 'بالا', completed: false },
    { id: 4, title: 'بررسی پیشرفت پایپ‌لاین و گزارش ماهانه به هیئت‌مدیره', time: 'پنج‌شنبه ۱۶:۰۰', priority: 'عادی', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">فعالیت‌ها و برنامه‌های کاری</h2>
            <p className="text-xs text-slate-400">فهرست وظایف روزانه، یادآورهای پیگیری و جلسات هماهنگ‌شده</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={onAddTask}
          className="flex items-center gap-2 bg-[#71951E] hover:bg-[#5e7c17] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن فعالیت / تسک جدید</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 space-y-3">
        <h3 className="text-xs font-bold text-slate-500 mb-2">وظایف و پیگیری‌های زمان‌بندی‌شده</h3>

        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
              task.completed 
                ? 'bg-slate-50 border-slate-100 opacity-60' 
                : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="w-4 h-4 rounded-md accent-[#71951E] cursor-pointer"
              />
              <span className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {task.time}
              </span>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                task.priority === 'بالا' 
                  ? 'bg-rose-50 text-rose-600' 
                  : task.priority === 'متوسط' 
                    ? 'bg-amber-50 text-amber-600' 
                    : 'bg-slate-100 text-slate-600'
              }`}>
                اولویت {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
