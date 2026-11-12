'use client';

import React from 'react';
import { NotificationItem } from '@/types/crm';
import { X, CheckCircle2, Clock, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface NotificationDetailModalProps {
  notification: NotificationItem | null;
  onClose: () => void;
  onNavigateToRecord?: (id: string) => void;
}

export default function NotificationDetailModal({
  notification,
  onClose,
  onNavigateToRecord,
}: NotificationDetailModalProps) {
  if (!notification) return null;

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
        className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#71951E]/10 text-[#71951E] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#71951E] uppercase tracking-wider">
                اعلان سیستم همیار
              </span>
              <h3 className="text-sm font-bold text-slate-800">
                {notification.title}
              </h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>زمان دریافت: {notification.time}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {notification.message}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          >
            بستن
          </button>

          <button
            onClick={() => {
              if (notification.linkId && onNavigateToRecord) {
                onNavigateToRecord(notification.linkId);
              }
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#71951E] hover:bg-[#5e7c17] text-white shadow-xs transition-colors"
          >
            <span>مشاهده رکورد مرتبط</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
