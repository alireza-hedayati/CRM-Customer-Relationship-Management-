import { StatItem, Company, SalesCycleBucket, NotificationItem } from '@/types/crm';

export const mockStats: StatItem[] = [
  {
    id: 'contacts',
    title: 'مخاطبان جدید',
    value: '۴۲۵',
    subtitle: 'مخاطب ثبت شده در سامانه',
    trend: { value: '۱۲.۵٪+', isPositive: true },
    icon: 'users',
    accentColor: '#71951E',
    badgeBg: '#F3F8EC',
  },
  {
    id: 'calls',
    title: 'تماس‌های ثبت‌شده',
    value: '۲۸۰',
    subtitle: 'تماس موفق با مشتریان',
    trend: { value: '۸.۲٪+', isPositive: true },
    icon: 'phone',
    accentColor: '#3B82F6',
    badgeBg: '#EFF6FF',
  },
  {
    id: 'pipeline-won',
    title: 'معاملات موفق',
    value: '۲۲',
    subtitle: 'قرارداد نهایی و بسته شده',
    trend: { value: '۱۵.۰٪+', isPositive: true },
    icon: 'trophy',
    accentColor: '#71951E',
    badgeBg: '#F3F8EC',
  },
  {
    id: 'pipeline-lost',
    title: 'معاملات از دست رفته',
    value: '۷',
    subtitle: 'معامله ناموفق یا لغو شده',
    trend: { value: '۲.۱٪-', isPositive: false },
    icon: 'loss',
    accentColor: '#EF4444',
    badgeBg: '#FEF2F2',
  },
  {
    id: 'tasks',
    title: 'وظایف تکمیل‌شده',
    value: '۱۱',
    subtitle: 'وظیفه و تسک بسته شده',
    trend: { value: '۱۰۰٪ هدف', isPositive: true },
    icon: 'task',
    accentColor: '#F59E0B',
    badgeBg: '#FFFBEB',
  },
  {
    id: 'events',
    title: 'رویدادها و جلسات',
    value: '۴',
    subtitle: 'جلسه حضوری و آنلاین برگزار شده',
    trend: { value: '۲ جلسه امروز', isPositive: true },
    icon: 'calendar',
    accentColor: '#6366F1',
    badgeBg: '#EEF2FF',
  },
];

// Companies with rank and bullet point colors (no abbreviation acronyms like "م م")
export const mockTopCompanies: Company[] = [
  {
    id: 'c1',
    name: 'آمیز اندام',
    tag: 'مشتریان جدید',
    turnover: '۳۹,۰۰۰ #حیر',
    rank: 1,
    rankColor: 'bg-[#71951E] ring-4 ring-[#71951E]/20', // Green/Gold #1
  },
  {
    id: 'c2',
    name: 'معاملات فیمنی',
    tag: 'مشتریان قبلی',
    turnover: '۲۰,۰۰۰ #حیر',
    rank: 2,
    rankColor: 'bg-blue-500 ring-4 ring-blue-500/20', // Blue #2
  },
  {
    id: 'c3',
    name: 'مشتریان معلبدعه',
    tag: 'مشتریان جدید',
    turnover: '۱۵,۰۰۰ #حیر',
    rank: 3,
    rankColor: 'bg-amber-500 ring-4 ring-amber-500/20', // Amber #3
  },
  {
    id: 'c4',
    name: 'صنایع دورمت',
    tag: 'مشتریان ویژه',
    turnover: '۱۲,۵۰۰ #حیر',
    rank: 4,
    rankColor: 'bg-purple-500 ring-4 ring-purple-500/20', // Purple #4
  },
  {
    id: 'c5',
    name: 'بازرگانی موجو',
    tag: 'مشتریان قبلی',
    turnover: '۸,۰۰۰ #حیر',
    rank: 5,
    rankColor: 'bg-slate-400 ring-4 ring-slate-400/20', // Slate #5
  },
];

export const mockSalesCycleData: SalesCycleBucket[] = [
  {
    period: '۱-۵ روز',
    newCustomers: 165,
    existingCustomers: 95,
    newPercent: '۵.۱٪',
    existingPercent: '۱۲.۰٪',
  },
  {
    period: '۶-۱۰ روز',
    newCustomers: 200,
    existingCustomers: 160,
    newPercent: '۲.۹٪',
    existingPercent: '۸.۲٪',
  },
  {
    period: '۱۱-۱۵ روز',
    newCustomers: 80,
    existingCustomers: 125,
    newPercent: '۳.۱٪',
    existingPercent: '۱۳.۰٪',
  },
  {
    period: '۱۵-۲۰ روز',
    newCustomers: 185,
    existingCustomers: 50,
    newPercent: '۱۳.۵٪',
    existingPercent: '۲۸.۲٪',
  },
  {
    period: '۲۱-۲۵ روز',
    newCustomers: 155,
    existingCustomers: 175,
    newPercent: '۵.۰٪',
    existingPercent: '۲۲.۰٪',
  },
  {
    period: '۲۵-۳۰ روز',
    newCustomers: 105,
    existingCustomers: 140,
    newPercent: '۵.۲٪',
    existingPercent: '۱.۹٪',
  },
  {
    period: '۳۰+ روز',
    newCustomers: 70,
    existingCustomers: 30,
    newPercent: '۴.۱٪',
    existingPercent: '۰.۸٪',
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'انعقاد قرارداد جدید',
    message: 'شرکت آمیز اندام پیش‌فاکتور شماره ۱۲۸ را تایید کرد و قرارداد به مرحله نهایی رسید.',
    time: '۱۰ دقیقه پیش',
    isRead: false,
    type: 'contract',
    linkId: 'c1',
  },
  {
    id: 'notif-2',
    title: 'یادآور تماس پیگیری',
    message: 'زمان تماس تعیین‌شده با مدیر بازرگانی معاملات فیمنی برای تمدید لایسنس فرا رسیده است.',
    time: '۴۵ دقیقه پیش',
    isRead: false,
    type: 'reminder',
    linkId: 'c2',
  },
  {
    id: 'notif-3',
    title: 'تیکت پشتیبانی جدید',
    message: 'یک تیکت اولویت بالا از شرکت مشتریان معلبدعه در خصوص فعال‌سازی وب‌هوک دریافت شد.',
    time: '۲ ساعت پیش',
    isRead: false,
    type: 'message',
    linkId: 'c3',
  },
];
