'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  GitFork, 
  Users, 
  Package, 
  MessageSquare, 
  Activity, 
  Settings, 
  HelpCircle, 
  ChevronDown,
  Headphones,
  X,
  PhoneCall,
  Circle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount?: number;
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab,
  unreadCount = 2
}: SidebarProps) {
  // State for expanded accordion menus
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    pipeline: false,
    contacts: false,
    products: false,
    activities: false,
  });

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const navItems = [
    { 
      id: 'dashboard', 
      label: 'پیشخوان', 
      icon: LayoutDashboard,
      hasSubmenu: false 
    },
    { 
      id: 'pipeline', 
      label: 'قیف فروش', 
      icon: GitFork,
      hasSubmenu: true,
      subItems: [
        { id: 'pipeline-kanban', label: 'کانبان معاملات' },
        { id: 'pipeline-forecast', label: 'پیش‌بینی فروش' },
        { id: 'pipeline-stages', label: 'مراحل پایپ‌لاین' },
      ]
    },
    { 
      id: 'contacts', 
      label: 'مخاطبین', 
      icon: Users,
      hasSubmenu: true,
      subItems: [
        { id: 'contacts-all', label: 'لیست تمام مشتریان' },
        { id: 'contacts-leads', label: 'سرنخ‌های ورودی' },
        { id: 'contacts-companies', label: 'شرکت‌ها و هلدینگ‌ها' },
      ]
    },
    { 
      id: 'products', 
      label: 'محصولات', 
      icon: Package,
      hasSubmenu: true,
      subItems: [
        { id: 'products-catalog', label: 'کاتالوگ و تعرفه‌ها' },
        { id: 'products-inventory', label: 'موجودی و لایسنس‌ها' },
        { id: 'products-categories', label: 'دسته‌بندی خدمات' },
      ]
    },
    { 
      id: 'messages', 
      label: 'پیام‌ها', 
      icon: MessageSquare,
      badge: unreadCount > 0 ? `${unreadCount}` : undefined,
      hasSubmenu: false 
    },
    { 
      id: 'activities', 
      label: 'فعالیت‌ها', 
      icon: Activity,
      hasSubmenu: true,
      subItems: [
        { id: 'activities-tasks', label: 'وظایف روزانه (Tasks)' },
        { id: 'activities-calendar', label: 'تقویم و جلسات' },
        { id: 'activities-reminders', label: 'یادآورهای پیگیری' },
      ]
    },
    { 
      id: 'settings', 
      label: 'تنظیمات', 
      icon: Settings,
      hasSubmenu: false 
    },
    { 
      id: 'support', 
      label: 'پشتیبانی', 
      icon: HelpCircle,
      hasSubmenu: false 
    },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
    if (item.hasSubmenu) {
      toggleSubmenu(item.id);
      setActiveTab(item.id);
    } else {
      setActiveTab(item.id);
      onClose();
    }
  };

  const handleSubItemClick = (subId: string, parentId: string) => {
    setActiveTab(parentId);
    onClose();
  };

  return (
    <>
      {/* Backdrop (ONLY rendered when sidebar is open) */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container (Closed by default, completely non-interactive and invisible when closed) */}
      <aside 
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white border-l border-slate-100 flex flex-col justify-between shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'translate-x-0 visible pointer-events-auto opacity-100' 
            : 'translate-x-full invisible pointer-events-none opacity-0'
        }`}
      >
        {/* Brand Header */}
        <div className="overflow-y-auto flex-1">
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100/80 sticky top-0 bg-white z-10">
            <Link 
              href="/" 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center group py-1"
            >
              <img 
                src="/logo.webp" 
                alt="همیار CRM" 
                className="h-9 w-auto max-w-[150px] object-contain transition-transform group-hover:scale-[1.03] duration-200" 
              />
            </Link>

            {/* Close button */}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="بستن منو"
              title="بستن منو"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with Top-Down Accordion */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (activeTab.startsWith(item.id));
              const isExpanded = expandedMenus[item.id];

              return (
                <div key={item.id} className="space-y-1">
                  {/* Parent Menu Item */}
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[#B7D894]/35 text-[#71951E] font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#71951E]' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#71951E] text-white">
                          {item.badge}
                        </span>
                      )}
                      {item.hasSubmenu && (
                        <ChevronDown 
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#71951E]' : ''
                          }`} 
                        />
                      )}
                    </div>
                  </button>

                  {/* Top-Down Dropdown Submenu */}
                  {item.hasSubmenu && isExpanded && item.subItems && (
                    <div className="mr-6 pr-3 border-r-2 border-slate-100 space-y-1 py-1 animate-fade-in">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubItemClick(sub.id, item.id)}
                          className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium text-slate-500 hover:text-[#71951E] hover:bg-slate-50 transition-colors text-right"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            {sub.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Support & Hotline Widget */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div 
            onClick={() => {
              setActiveTab('support');
              if (window.innerWidth < 1024) onClose();
            }}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-[#F1F6EB]/60 border border-slate-100/80 flex flex-col gap-2.5 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#71951E]/15 text-[#71951E] flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">پشتیبانی ۲۴/۷</p>
                <p className="text-[10px] text-slate-400">خط مستقیم کارشناسان فروش</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-600">
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#71951E]">
                <PhoneCall className="w-3.5 h-3.5" />
                ۱۶۵۰۰ (داخلی ۲)
              </span>
              <span className="text-[10px] text-slate-400">آنلاین</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
