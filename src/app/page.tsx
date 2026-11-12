'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import KpiCard from '@/components/KpiCard';
import TopCompaniesCard from '@/components/TopCompaniesCard';
import SalesCycleChart from '@/components/SalesCycleChart';
import NewRecordModal from '@/components/NewRecordModal';
import SearchModal from '@/components/SearchModal';
import NotificationDetailModal from '@/components/NotificationDetailModal';
import AuthModal from '@/components/AuthModal';
import AiAssistantWidget from '@/components/AiAssistantWidget';

// Views
import ProductsView from '@/components/views/ProductsView';
import ContactsView from '@/components/views/ContactsView';
import PipelineView from '@/components/views/PipelineView';
import MessagesView from '@/components/views/MessagesView';
import ActivitiesView from '@/components/views/ActivitiesView';
import SettingsView from '@/components/views/SettingsView';
import SupportView from '@/components/views/SupportView';

import { mockStats, mockNotifications as initialNotifications } from '@/data/mockCrmData';
import { NotificationItem, UserProfile } from '@/types/crm';
import { Plus, ChevronDown, Calendar, Layers } from 'lucide-react';

export default function DashboardPage() {
  // Sidebar starts CLOSED by default on all devices (slides smoothly on menu click)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const [selectedPeriod, setSelectedPeriod] = useState('این ماه');
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);

  // User Profile State: starts as NULL (dummy silhouette icon in preview mode until registration/login)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const periods = ['این ماه', '۳۰ روز گذشته', 'فصل جاری (پاییز)', 'امسال'];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Restore user from localStorage if previously registered
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('hamyar_crm_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const openAuthWithNotice = (notice?: string) => {
    setAuthNotice(notice || null);
    setIsAuthOpen(true);
  };

  const handleSaveUser = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('hamyar_crm_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('hamyar_crm_user');
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleSelectNotification = (item: NotificationItem) => {
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, isRead: true } : n));
    setSelectedNotification(item);
  };

  // Guarded actions: check authentication before allowing creation/changes
  const handleProtectedAction = (action: () => void, noticeText: string) => {
    if (!currentUser) {
      openAuthWithNotice(noticeText);
    } else {
      action();
    }
  };

  // Render content based on selected tab
  const renderViewContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <ProductsView 
            onAddProduct={() => handleProtectedAction(() => setIsNewRecordOpen(true), 'برای افزودن محصول جدید، ابتدا مشخصات خود را وارد کنید.')} 
          />
        );
      case 'contacts':
        return (
          <ContactsView 
            onAddContact={() => handleProtectedAction(() => setIsNewRecordOpen(true), 'برای افزودن مخاطب و سرنخ جدید، لطفاً ابتدا وارد شوید.')} 
          />
        );
      case 'pipeline':
        return (
          <PipelineView 
            onAddDeal={() => handleProtectedAction(() => setIsNewRecordOpen(true), 'برای ثبت فرصت معامله جدید، ابتدا مشخصات خود را ثبت کنید.')} 
          />
        );
      case 'messages':
        return <MessagesView />;
      case 'activities':
        return (
          <ActivitiesView 
            onAddTask={() => handleProtectedAction(() => setIsNewRecordOpen(true), 'برای ایجاد وظیفه و فعالیت جدید، ابتدا وارد شوید.')} 
          />
        );
      case 'settings':
        return <SettingsView />;
      case 'support':
        return <SupportView />;
      case 'dashboard':
      default:
        return (
          <>
            {/* Top Controls Bar: Filter & Add Widget */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 sm:px-5 sm:py-3 rounded-2xl border border-slate-100 shadow-2xs">
              {/* Right: Add Component Button (Guarded) */}
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={() => handleProtectedAction(() => setIsNewRecordOpen(true), 'برای افزودن ماژول و شخصی‌سازی پیشخوان، ابتدا وارد حساب شوید.')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#71951E]" />
                  <span>افزودن ماژول</span>
                </button>
                
                <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 mr-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>نمای پیش‌فرض همیار</span>
                </div>
              </div>

              {/* Left: Time Period Filter Dropdown */}
              <div className="relative self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setPeriodDropdownOpen(!periodDropdownOpen)}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#71951E]" />
                  <span>{selectedPeriod}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${periodDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {periodDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-1.5">
                    {periods.map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => {
                          setSelectedPeriod(period);
                          setPeriodDropdownOpen(false);
                        }}
                        className={`w-full text-right px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                          selectedPeriod === period ? 'text-[#71951E] font-bold bg-[#B7D894]/15' : 'text-slate-600'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Upper Section: 6 KPI Cards + Top Companies Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* KPI Cards Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockStats.map((stat) => (
                  <KpiCard key={stat.id} stat={stat} />
                ))}
              </div>

              {/* Top Companies Widget */}
              <div className="lg:col-span-4 h-full">
                <TopCompaniesCard onSeeAll={() => setActiveTab('contacts')} />
              </div>
            </div>

            {/* Lower Section: Full-Width Sales Cycle Bar Chart */}
            <div className="w-full">
              <SalesCycleChart />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      {/* RTL Right Sidebar with Top-Down Accordion (Smooth slide-in drawer) */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={unreadCount}
      />

      {/* Main Workspace (Full-Width when sidebar is closed) */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden w-full transition-all duration-300">
        {/* Sticky Header with Functional Notifications, Search & Profile */}
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenNewRecord={() => setIsNewRecordOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          notifications={notifications}
          onSelectNotification={handleSelectNotification}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAllNotifications={handleClearAllNotifications}
          onOpenMessages={() => setActiveTab('messages')}
          currentUser={currentUser}
          onOpenAuth={openAuthWithNotice}
        />

        {/* Dashboard Main Content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {renderViewContent()}
        </main>
      </div>

      {/* Modals */}
      <NewRecordModal 
        isOpen={isNewRecordOpen} 
        onClose={() => setIsNewRecordOpen(false)} 
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <NotificationDetailModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onNavigateToRecord={(recordId) => {
          setActiveTab('contacts');
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onSaveUser={handleSaveUser}
        onLogout={handleLogout}
        noticeMessage={authNotice}
      />

      {/* Sticky AI Assistant Widget */}
      <AiAssistantWidget />
    </div>
  );
}
