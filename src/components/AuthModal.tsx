'use client';

import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '@/types/crm';
import { X, User, Briefcase, Upload, LogOut, Sparkles, AlertCircle, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSaveUser: (user: UserProfile) => void;
  onLogout: () => void;
  noticeMessage?: string | null;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
];

const ROLE_PRESETS = [
  'مدیر فروش',
  'کارشناس ارتباط با مشتریان',
  'سرپرست بازاریابی',
  'مدیرعامل',
  'کارشناس پشتیبانی',
];

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onSaveUser,
  onLogout,
  noticeMessage,
}: AuthModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('مدیر فروش');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Validation Error States
  const [nameError, setNameError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  // 3-second timer reference for auto-dismissing error messages
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state with current user
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setRole(currentUser.role);
      setAvatarUrl(currentUser.avatarUrl || '');
    } else {
      setName('');
      setRole('مدیر فروش');
      setAvatarUrl('');
    }
    // Clear any active errors when opening/closing
    setNameError(false);
    setRoleError(false);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
  }, [currentUser, isOpen]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  // Handle local image upload via FileReader
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Check required field: Name
    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    // Check required field: Role
    if (!role.trim()) {
      setRoleError(true);
      hasError = true;
    } else {
      setRoleError(false);
    }

    // If any required field is missing, trigger 3-second dismissal cycle
    if (hasError) {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      errorTimerRef.current = setTimeout(() => {
        setNameError(false);
        setRoleError(false);
      }, 3000);
      return;
    }

    // Success
    onSaveUser({
      id: currentUser ? currentUser.id : `user-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      avatarUrl: avatarUrl || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                {currentUser ? 'پروفایل و مشخصات کاربری' : 'ثبت‌نام و ورود کاربر به همیار'}
              </h3>
              <p className="text-xs text-slate-400">
                {currentUser 
                  ? 'مشخصات حساب کاربری خود را ویرایش کنید' 
                  : 'برای شروع به کار با سامانه، مشخصات خود را وارد کنید'}
              </p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice banner if redirected from an action */}
        {noticeMessage && !currentUser && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-amber-800 text-xs">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{noticeMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              تصویر پروفایل
            </label>

            <div className="flex items-center gap-4">
              {/* Current preview */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-[#71951E]/30 shrink-0 flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="پیش‌نمایش" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-9 h-9 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                )}
              </div>

              {/* Upload button or Presets */}
              <div className="flex-1 space-y-2">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>آپلود تصویر دلخواه</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-slate-400">یا انتخاب آماده:</span>
                  <div className="flex items-center gap-1.5">
                    {PRESET_AVATARS.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatarUrl(url)}
                        className={`w-6 h-6 rounded-full overflow-hidden border transition-all ${
                          avatarUrl === url ? 'ring-2 ring-[#71951E] scale-110' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt={`آواتار ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              نام و نام خانوادگی <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className={`w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                nameError ? 'text-rose-500' : 'text-slate-400'
              }`} />
              <input
                type="text"
                placeholder="مثلاً: علیرضا حیدری"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError && e.target.value.trim()) setNameError(false);
                }}
                className={`w-full rounded-xl pr-10 pl-3.5 py-2.5 text-xs text-slate-800 transition-all focus:outline-hidden ${
                  nameError 
                    ? 'border-2 border-rose-500 bg-rose-50/20 focus:border-rose-600' 
                    : 'bg-slate-50 border border-slate-200 focus:border-[#71951E] focus:bg-white'
                }`}
              />
            </div>

            {/* 3-Second Red Error Message */}
            {nameError && (
              <p className="text-rose-500 text-xs font-medium mt-1.5 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>پر کردن این بخش اجباری است.</span>
              </p>
            )}
          </div>

          {/* Role / Job Position */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              نقش / سمت سازمانی (Role) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className={`w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                roleError ? 'text-rose-500' : 'text-slate-400'
              }`} />
              <input
                type="text"
                placeholder="مثلاً: مدیر فروش، کارشناس بازرگانی..."
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (roleError && e.target.value.trim()) setRoleError(false);
                }}
                className={`w-full rounded-xl pr-10 pl-3.5 py-2.5 text-xs text-slate-800 transition-all focus:outline-hidden ${
                  roleError 
                    ? 'border-2 border-rose-500 bg-rose-50/20 focus:border-rose-600' 
                    : 'bg-slate-50 border border-slate-200 focus:border-[#71951E] focus:bg-white'
                }`}
              />
            </div>

            {/* 3-Second Red Error Message */}
            {roleError && (
              <p className="text-rose-500 text-xs font-medium mt-1.5 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>پر کردن این بخش اجباری است.</span>
              </p>
            )}

            {/* Quick role suggestions */}
            <div className="flex flex-wrap gap-1 mt-2">
              {ROLE_PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setRole(p);
                    if (roleError) setRoleError(false);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-colors ${
                    role === p
                      ? 'bg-[#71951E]/15 text-[#71951E] border border-[#71951E]/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Submit & Logout Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج از حساب</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
              >
                انصراف
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#71951E] hover:bg-[#5e7c17] text-white shadow-xs transition-colors"
              >
                {currentUser ? 'ذخیره تغییرات' : 'ثبت‌نام و ورود'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
