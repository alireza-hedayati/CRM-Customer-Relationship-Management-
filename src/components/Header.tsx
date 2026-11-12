'use client';

import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Mail, 
  Plus, 
  Command,
  ChevronDown
} from 'lucide-react';
import NotificationsPopover from './NotificationsPopover';
import { NotificationItem, UserProfile } from '@/types/crm';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenNewRecord: () => void;
  onOpenSearch: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (item: NotificationItem) => void;
  onMarkAllAsRead: () => void;
  onClearAllNotifications: () => void;
  onOpenMessages: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (notice?: string) => void;
}

export default function Header({ 
  onToggleSidebar, 
  onOpenNewRecord, 
  onOpenSearch,
  notifications,
  onSelectNotification,
  onMarkAllAsRead,
  onClearAllNotifications,
  onOpenMessages,
  currentUser,
  onOpenAuth,
}: HeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleCreateRecordClick = () => {
    if (!currentUser) {
      onOpenAuth('برای ایجاد رکورد جدید، ابتدا باید وارد حساب کاربری خود شوید.');
    } else {
      onOpenNewRecord();
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      {/* Right Side: Toggle Sidebar & Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-xl">
        {/* Sidebar Trigger Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 group cursor-pointer"
          title="باز کردن منو و سایدبار"
          aria-label="باز کردن منو"
        >
          <Menu className="w-5 h-5 text-slate-600 group-hover:text-[#71951E] transition-colors" />
          <span className="text-xs font-semibold text-slate-500 hidden md:inline group-hover:text-slate-800">
            منو
          </span>
        </button>

        {/* Search Bar */}
        <div 
          onClick={onOpenSearch}
          className="cursor-pointer group w-full max-w-md hidden sm:flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl px-3.5 py-2 text-sm text-slate-400 transition-all duration-150"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            <span className="text-xs md:text-sm text-slate-500 font-normal">
              جستجو در مشتریان، فاکتورها، پرونده‌ها...
            </span>
          </div>
          
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-slate-500 shadow-2xs">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Left Side: Actions, Notifications & User Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile Search Button */}
        <button 
          type="button"
          onClick={onOpenSearch}
          className="sm:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="جستجو"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Primary CTA: + Create New Record (Guarded: sends to auth if not logged in) */}
        <button
          type="button"
          onClick={handleCreateRecordClick}
          className="flex items-center gap-2 bg-[#71951E] hover:bg-[#5e7c17] active:scale-[0.98] text-white px-3.5 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold shadow-xs shadow-[#71951E]/20 transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden xs:inline">ایجاد رکورد جدید</span>
          <span className="xs:hidden">جدید</span>
        </button>

        {/* Notifications Button & Popover */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`p-2 rounded-xl transition-colors relative cursor-pointer ${
              isNotifOpen ? 'bg-[#F1F6EB] text-[#71951E]' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
            aria-label="اعلانات"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          <NotificationsPopover
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            notifications={notifications}
            onSelectNotification={onSelectNotification}
            onMarkAllAsRead={onMarkAllAsRead}
            onClearAll={onClearAllNotifications}
          />
        </div>

        {/* Messages */}
        <button 
          type="button"
          onClick={onOpenMessages}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden sm:block relative cursor-pointer"
          aria-label="پیام‌ها"
        >
          <Mail className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        {/* User Profile / Registration:
            When currentUser is null: show Instagram-style default dummy silhouette without name or role!
            When currentUser is logged in: show their avatar, full name, and role!
        */}
        {currentUser ? (
          <button 
            type="button"
            onClick={() => onOpenAuth()}
            className="flex items-center gap-2 cursor-pointer group p-1.5 rounded-xl hover:bg-slate-100/80 transition-colors text-right border border-transparent hover:border-slate-200"
            title="مشاهده و ویرایش مشخصات"
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden bg-slate-200 ring-2 ring-[#71951E]/20 shrink-0">
              {currentUser.avatarUrl ? (
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#B7D894]/30 text-[#71951E] flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#71951E] transition-colors">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>
        ) : (
          /* Initial / Guest Preview State */
          <button 
            type="button"
            onClick={() => onOpenAuth()}
            className="flex items-center gap-2 cursor-pointer group px-2.5 py-1.5 rounded-xl hover:bg-slate-100 border border-slate-200/80 transition-all bg-white"
            title="ثبت‌نام و ورود به سامانه همیار"
          >
            {/* Instagram-style Default Silhouette Avatar */}
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-300 border border-slate-300 flex items-center justify-center overflow-hidden shrink-0 group-hover:ring-2 group-hover:ring-[#71951E]/40 transition-all">
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-[#71951E] transition-colors">
              ورود / ثبت‌نام
            </span>
          </button>
        )}
      </div>
    </header>
  );
}
