'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Bell,
  MessageSquare, 
  DollarSign,
  Users,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';
import Link from 'next/link';

type NotificationType = 'message' | 'payment' | 'milestone' | 'alert' | 'system';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
};

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'payment',
    title: 'Payment Received',
    message: 'Sari Melati purchased Aesthetic Split Program - Rp 400,000',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    isRead: false,
    actionUrl: '/personal_trainer/revenue',
    actionText: 'View Revenue'
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New Client Message',
    message: 'Budi Santoso: "Thanks for the form correction on my squats!"',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    isRead: false,
    actionUrl: '/personal_trainer/clients/client-1/messages',
    actionText: 'Reply'
  },
  {
    id: 'notif-3',
    type: 'milestone',
    title: 'Client Milestone',
    message: 'Ahmad Rahman completed Week 8 of Power Building Program',
    timestamp: Date.now() - 8 * 60 * 60 * 1000,
    isRead: true,
    actionUrl: '/personal_trainer/clients/client-3',
    actionText: 'View Progress'
  },
  {
    id: 'notif-4',
    type: 'alert',
    title: 'Client Attention Needed',
    message: 'Lisa Wijaya hasn\'t completed a workout in 5 days',
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    isRead: false,
    actionUrl: '/personal_trainer/clients/client-4/messages',
    actionText: 'Send Message'
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'Monthly Payout',
    message: 'August payout of Rp 4,340,000 has been processed',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    isRead: true,
    actionUrl: '/personal_trainer/revenue',
    actionText: 'View Details'
  },
];

const notificationStyles = {
  message: { bg: 'bg-blue-50', border: 'border-blue-200', icon: MessageSquare, iconColor: 'text-blue-500' },
  payment: { bg: 'bg-green-50', border: 'border-green-200', icon: DollarSign, iconColor: 'text-green-500' },
  milestone: { bg: 'bg-purple-50', border: 'border-purple-200', icon: TrendingUp, iconColor: 'text-purple-500' },
  alert: { bg: 'bg-orange-50', border: 'border-orange-200', icon: AlertTriangle, iconColor: 'text-orange-500' },
  system: { bg: 'bg-gray-50', border: 'border-gray-200', icon: Info, iconColor: 'text-gray-500' }
};

function NotificationCard({ notification, onMarkRead }: { 
  notification: Notification; 
  onMarkRead: (id: string) => void;
}) {
  const style = notificationStyles[notification.type];
  const Icon = style.icon;

  return (
    <Card className={`${notification.isRead ? '' : style.bg + ' ' + style.border + ' border'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Icon className={`h-5 w-5 mt-0.5 ${style.iconColor}`} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{notification.title}</h3>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
              <Badge variant="outline" className="text-xs ml-auto">
                {notification.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {new Date(notification.timestamp).toLocaleString('id-ID')}
              </span>
              <div className="flex gap-2">
                {!notification.isRead && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onMarkRead(notification.id)}
                  >
                    Mark Read
                  </Button>
                )}
                {notification.actionUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={notification.actionUrl}>
                      {notification.actionText}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | NotificationType>('all');

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.isRead;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/personal_trainer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with client activity and business updates
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark All Read ({unreadCount})
              </Button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Bell className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-xl font-bold">{unreadCount}</p>
                  <p className="text-sm text-muted-foreground">Unread</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-xl font-bold">{notifications.filter(n => n.type === 'message').length}</p>
                  <p className="text-sm text-muted-foreground">Messages</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-xl font-bold">{notifications.filter(n => n.type === 'payment').length}</p>
                  <p className="text-sm text-muted-foreground">Payments</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-xl font-bold">{notifications.filter(n => n.type === 'milestone').length}</p>
                  <p className="text-sm text-muted-foreground">Milestones</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'unread' | NotificationType)} className="mb-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="milestone">Milestones</TabsTrigger>
              <TabsTrigger value="alert">Alerts</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationCard 
                key={notification.id} 
                notification={notification} 
                onMarkRead={markAsRead}
              />
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === 'unread' ? 'All caught up! No unread notifications.' : 'No notifications to show.'}
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}