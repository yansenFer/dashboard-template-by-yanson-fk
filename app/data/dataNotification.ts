export type NotificationType = 'message' | 'alert' | 'system' | 'mention';

export interface NotificationItem {
  id: number;
  title: string;
  content: string;
  time: string;
  type: NotificationType;
  isUnread: boolean;
  avatar?: string;
}

export const notifications: NotificationItem[] = [
  {
    id: 1,
    title: 'New message from Admin',
    content: 'Your account has been approved. Welcome aboard!',
    time: '2 mins ago',
    type: 'message',
    isUnread: true,
    avatar: 'https://i.pravatar.cc/150?u=admin',
  },
  {
    id: 2,
    title: 'Project deadline reminder',
    content: 'The deadline for Project Alpha is approaching. Please review tasks.',
    time: '1 hour ago',
    type: 'alert',
    isUnread: true,
  },
  {
    id: 3,
    title: 'New comment on your post',
    content: "John Doe commented: 'This looks great! Keep it up!'",
    time: '2 hours ago',
    type: 'mention',
    isUnread: false,
    avatar: 'https://i.pravatar.cc/150?u=johndoe',
  },
  {
    id: 4,
    title: 'System maintenance scheduled',
    content: 'We will perform maintenance on October 25th from 1 AM to 3 AM.',
    time: 'Yesterday',
    type: 'system',
    isUnread: false,
  },
  {
    id: 5,
    title: 'Password changed successfully',
    content: 'You have recently changed your password. Contact support if this wasn’t you.',
    time: 'Oct 17',
    type: 'alert',
    isUnread: false,
  },
];

