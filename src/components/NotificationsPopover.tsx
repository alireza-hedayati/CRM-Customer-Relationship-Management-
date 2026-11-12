'use client';

import React, { useRef, useEffect } from 'react';
import { NotificationItem } from '@/types/crm';
import { Bell, CheckCheck, Trash2, ArrowLeft, FileSignature, Clock, MessageSquare, AlertCircle } from 'lucide-react';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (item: NotificationItem) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export default function NotificationsPopover({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onMarkAllAsRead,
  onClearAll,
}: NotificationsPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'contract':
        return <FileSignature className="w-4 h-4 text-[#71951E]" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div 
      ref={popoverRef}
      className="absolute left-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-fade-in"
    >
      {/* Popover Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#71951E]" />
          <h4 className="text-xs font-bold text-slate-800">اعلانات و پیام‌ها</h4>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#71951E] text-white">
              {unreadCount} جدید
            </span>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              title="علامت‌گذاری همه به عنوان خوانده‌شده"
              className="p-1 rounded-lg text-slate-400 hover:text-[#71951E] hover:bg-white transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onClearAll}
              title="پاک کردن همه"
              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-white transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Notifications List or Empty State */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100/80">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectNotification(item);
                onClose();
              }}
              className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 group relative ${
                !item.isRead ? 'bg-[#F1F6EB]/30' : ''
              }`}
            >
              {/* Unread indicator dot */}
              {!item.isRead && (
                <span className="absolute top-4 right-2 w-2 h-2 rounded-full bg-[#71951E]" />
              )}

              {/* Type Icon */}
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white group-hover:shadow-xs transition-all">
                {getNotificationIcon(item.type)}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between gap-2">
                  <h5 className={`text-xs truncate ${!item.isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                    {item.title}
                  </h5>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.message}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#71951E] group-hover:translate-x-[-2px] transition-transform">
                  <span>مشاهده جزئیات کامل</span>
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State as requested: "اگه خالیه و پیامی نیست نوشته بشه پیامی وجود ندارد" */
          <div className="py-12 px-6 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Bell className="w-6 h-6 opacity-40" />
            </div>
            <h5 className="text-xs font-bold text-slate-700">پیامی وجود ندارد</h5>
            <p className="text-[11px] text-slate-400 mt-1">
              تمام اعلان‌ها و پیام‌های شما بررسی و خوانده شده‌اند.
            </p>
          </div>
        )}
      </div>

      {/* Popover Footer */}
      {notifications.length > 0 && (
        <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
          <span className="text-[10px] text-slate-400 font-medium">
            برای مشاهده سریع روی هر پیام کلیک کنید
          </span>
        </div>
      )}
    </div>
  );
}
