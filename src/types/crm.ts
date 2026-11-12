export interface UserProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatItem {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: 'users' | 'phone' | 'trophy' | 'loss' | 'task' | 'calendar';
  accentColor?: string;
  badgeBg?: string;
}

export interface Company {
  id: string;
  name: string;
  tag: string;
  turnover: string;
  rank: number;
  rankColor: string; // Colored bullet point
}

export interface SalesCycleBucket {
  period: string;
  newCustomers: number;
  existingCustomers: number;
  newPercent: string;
  existingPercent: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'contract' | 'reminder' | 'message' | 'system';
  linkId?: string;
}

export interface SubMenuItem {
  id: string;
  title: string;
  badge?: string;
}

export interface NavItem {
  id: string;
  title: string;
  iconName: string;
  subItems?: SubMenuItem[];
  badge?: number | string;
}
