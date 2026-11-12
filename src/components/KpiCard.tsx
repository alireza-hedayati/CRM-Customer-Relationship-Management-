'use client';

import React from 'react';
import { StatItem } from '@/types/crm';
import { 
  Users, 
  PhoneCall, 
  Trophy, 
  TrendingDown, 
  CheckSquare, 
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface KpiCardProps {
  stat: StatItem;
}

export default function KpiCard({ stat }: KpiCardProps) {
  const getIcon = () => {
    switch (stat.icon) {
      case 'users':
        return <Users className="w-5 h-5 text-[#71951E]" />;
      case 'phone':
        return <PhoneCall className="w-5 h-5 text-blue-600" />;
      case 'trophy':
        return <Trophy className="w-5 h-5 text-[#71951E]" />;
      case 'loss':
        return <TrendingDown className="w-5 h-5 text-rose-500" />;
      case 'task':
        return <CheckSquare className="w-5 h-5 text-amber-500" />;
      case 'calendar':
        return <CalendarDays className="w-5 h-5 text-indigo-500" />;
      default:
        return <Users className="w-5 h-5 text-[#71951E]" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200/80 transition-all duration-200 flex flex-col justify-between group">
      {/* Top Header of Card */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          {stat.title}
        </span>
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200"
          style={{ backgroundColor: stat.badgeBg || '#F3F8EC' }}
        >
          {getIcon()}
        </div>
      </div>

      {/* Main Stat & Value */}
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          {stat.value}
        </h3>

        {stat.trend && (
          <span 
            className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
              stat.trend.isPositive 
                ? 'bg-[#B7D894]/30 text-[#71951E]' 
                : 'bg-rose-50 text-rose-600'
            }`}
          >
            {stat.trend.isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            <span>{stat.trend.value}</span>
          </span>
        )}
      </div>

      {/* Subtitle / Context */}
      <p className="mt-2 text-[11px] text-slate-400 font-medium">
        {stat.subtitle}
      </p>
    </div>
  );
}
