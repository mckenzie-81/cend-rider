/**
 * Notifications Service
 * Handles push notifications, in-app alerts, and notification preferences
 * Used by: HomeScreen, AccountScreen, RideTrackingScreen, ActivitiesScreen
 */

// ==================== TYPES ====================

export type NotificationType = 
  | 'ride_request'
  | 'driver_assigned'
  | 'driver_arrived'
  | 'ride_started'
  | 'ride_completed'
  | 'payment_successful'
  | 'payment_failed'
  | 'promotion'
  | 'system'
  | 'support';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  priority: NotificationPriority;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  actionUrl?: string; // Deep link or screen to navigate to
  imageUrl?: string;
}

export interface NotificationPreferences {
  push: {
    enabled: boolean;
    rideUpdates: boolean;
    promotions: boolean;
    system: boolean;
    support: boolean;
  };
  email: {
    enabled: boolean;
    rideReceipts: boolean;
    promotions: boolean;
    newsletters: boolean;
  };
  sms: {
    enabled: boolean;
    rideUpdates: boolean;
    securityAlerts: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // Format: "HH:mm" (24-hour)
    endTime: string; // Format: "HH:mm" (24-hour)
  };
}

export interface NotificationSettings {
  deviceToken?: string;
  preferences: NotificationPreferences;
  lastUpdated: string;
}

export interface PushNotificationData {
  title: string;
  body: string;
  data?: Record<string, any>;
  priority?: NotificationPriority;
  sound?: string;
  badge?: number;
}

// ==================== MOCK DATA ====================

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    type: 'ride_completed',
    title: 'Ride Completed',
    body: 'Your ride to Accra Mall has been completed. Thank you for riding with Cend!',
    data: { rideId: 'ride_123', fare: 45 },
    priority: 'normal',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    actionUrl: '/activities/ride_123',
  },
  {
    id: 'notif_2',
    type: 'promotion',
    title: '🎉 Special Offer!',
    body: 'Get 20% off your next 5 rides. Valid until Sunday!',
    data: { promoCode: 'SAVE20', expiresAt: '2025-10-20T23:59:59Z' },
    priority: 'normal',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    actionUrl: '/promotions/save20',
    imageUrl: 'https://example.com/promo-banner.jpg',
  },
  {
    id: 'notif_3',
    type: 'payment_successful',
    title: 'Payment Successful',
    body: 'GH₵45 has been charged to your Visa card ending in 4242.',
    data: { amount: 45, paymentMethodId: 'pm_1' },
    priority: 'normal',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    readAt: new Date(Date.now() - 82800000).toISOString(), // Read 23 hours ago
  },
  {
    id: 'notif_4',
    type: 'system',
    title: 'App Update Available',
    body: 'A new version of Cend is available with bug fixes and improvements.',
    priority: 'low',
    isRead: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    readAt: new Date(Date.now() - 170000000).toISOString(),
    actionUrl: 'market://details?id=com.cend.rider',
  },
];

const MOCK_PREFERENCES: NotificationPreferences = {
  push: {
    enabled: true,
    rideUpdates: true,
    promotions: true,
    system: true,
    support: true,
  },
  email: {
    enabled: true,
    rideReceipts: true,
    promotions: false,
    newsletters: false,
  },
  sms: {
    enabled: false,
    rideUpdates: false,
    securityAlerts: true,
  },
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '07:00',
  },
};

// ==================== SERVICE FUNCTIONS ====================

/**
 * Simulate network delay
 */
const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get all notifications for the current user
 */
export const getNotifications = async (
  limit: number = 50,
  offset: number = 0,
  unreadOnly: boolean = false
): Promise<Notification[]> => {
  await simulateDelay(800);

  let notifications = [...MOCK_NOTIFICATIONS];

  if (unreadOnly) {
    notifications = notifications.filter(n => !n.isRead);
  }

  return notifications.slice(offset, offset + limit);

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/notifications', {
    params: { limit, offset, unreadOnly }
  });
  return response.data;
  */
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async (): Promise<number> => {
  await simulateDelay(300);

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;
  return unreadCount;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/notifications/unread-count');
  return response.data.count;
  */
};

/**
 * Mark notification as read
 */
export const markAsRead = async (notificationId: string): Promise<void> => {
  await simulateDelay(500);

  console.log(`Notification ${notificationId} marked as read`);

  // TODO: Replace with actual API call
  /*
  await api.patch(`/notifications/${notificationId}/read`);
  */
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async (): Promise<void> => {
  await simulateDelay(800);

  console.log('All notifications marked as read');

  // TODO: Replace with actual API call
  /*
  await api.post('/notifications/mark-all-read');
  */
};

/**
 * Delete a notification
 */
export const deleteNotification = async (notificationId: string): Promise<void> => {
  await simulateDelay(500);

  console.log(`Notification ${notificationId} deleted`);

  // TODO: Replace with actual API call
  /*
  await api.delete(`/notifications/${notificationId}`);
  */
};

/**
 * Clear all notifications
 */
export const clearAllNotifications = async (): Promise<void> => {
  await simulateDelay(1000);

  console.log('All notifications cleared');

  // TODO: Replace with actual API call
  /*
  await api.delete('/notifications');
  */
};

/**
 * Get notification preferences
 */
export const getNotificationPreferences = async (): Promise<NotificationPreferences> => {
  await simulateDelay(500);

  return MOCK_PREFERENCES;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/notifications/preferences');
  return response.data;
  */
};

/**
 * Update notification preferences
 */
export const updateNotificationPreferences = async (
  preferences: Partial<NotificationPreferences>
): Promise<NotificationPreferences> => {
  await simulateDelay(800);

  const updatedPreferences: NotificationPreferences = {
    ...MOCK_PREFERENCES,
    ...preferences,
  };

  return updatedPreferences;

  // TODO: Replace with actual API call
  /*
  const response = await api.patch('/notifications/preferences', preferences);
  return response.data;
  */
};

/**
 * Register device for push notifications
 * Call this when user grants notification permissions
 */
export const registerDevice = async (deviceToken: string, platform: 'ios' | 'android'): Promise<void> => {
  await simulateDelay(1000);

  console.log(`Device registered: ${platform} - ${deviceToken.substring(0, 20)}...`);

  // TODO: Replace with actual API call
  /*
  await api.post('/notifications/register-device', {
    deviceToken,
    platform,
    deviceInfo: {
      // Additional device info if needed
    }
  });
  */
};

/**
 * Unregister device from push notifications
 * Call this on logout or when user revokes permissions
 */
export const unregisterDevice = async (deviceToken: string): Promise<void> => {
  await simulateDelay(500);

  console.log(`Device unregistered: ${deviceToken.substring(0, 20)}...`);

  // TODO: Replace with actual API call
  /*
  await api.post('/notifications/unregister-device', { deviceToken });
  */
};

/**
 * Send a test notification (for development/testing)
 */
export const sendTestNotification = async (): Promise<void> => {
  await simulateDelay(500);

  const testNotification: PushNotificationData = {
    title: 'Test Notification',
    body: 'This is a test notification from Cend',
    priority: 'normal',
  };

  console.log('Test notification sent:', testNotification);

  // TODO: Replace with actual API call
  /*
  await api.post('/notifications/test', testNotification);
  */
};

/**
 * Subscribe to real-time notification updates
 * Returns unsubscribe function
 */
export const subscribeToNotifications = (
  callback: (notification: Notification) => void
): (() => void) => {
  console.log('Subscribed to notification updates');

  // Mock: Simulate random notifications every 30 seconds
  const interval = setInterval(() => {
    const mockNotification: Notification = {
      id: `notif_${Date.now()}`,
      type: 'system',
      title: 'New Notification',
      body: 'This is a real-time notification update',
      priority: 'normal',
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    callback(mockNotification);
  }, 30000);

  // Return cleanup function
  return () => {
    clearInterval(interval);
    console.log('Unsubscribed from notification updates');
  };

  // TODO: Replace with WebSocket or Server-Sent Events
  /*
  const ws = new WebSocket(`${WS_URL}/notifications`);
  
  ws.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    callback(notification);
  };

  return () => {
    ws.close();
  };
  */
};

/**
 * Request notification permission (iOS/Android)
 * Returns whether permission was granted
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  await simulateDelay(500);

  // Mock: Always grant permission in development
  const granted = true;

  console.log(`Notification permission: ${granted ? 'granted' : 'denied'}`);
  return granted;

  // TODO: Replace with actual permission request
  /*
  import * as Notifications from 'expo-notifications';
  
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  return finalStatus === 'granted';
  */
};

// ==================== EXPORT ====================

export const NotificationService = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  getNotificationPreferences,
  updateNotificationPreferences,
  registerDevice,
  unregisterDevice,
  sendTestNotification,
  subscribeToNotifications,
  requestNotificationPermission,
};
