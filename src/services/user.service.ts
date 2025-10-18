/**
 * User Service
 * Handles user profile, settings, and account management
 * Used by: AccountScreen, HomeScreen
 */

// ==================== TYPES ====================

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    rideUpdates: boolean;
    promotions: boolean;
  };
  privacy: {
    shareLocation: boolean;
    shareRideHistory: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    theme: 'light' | 'dark' | 'auto';
  };
}

export interface UserStats {
  totalRides: number;
  totalSpent: number;
  currency: string;
  favoriteVehicle?: string;
  memberSince: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  name: string;
  last4?: string; // Last 4 digits for cards
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
}

// ==================== MOCK DATA ====================

const MOCK_USER: UserProfile = {
  id: 'user_123456',
  email: 'kwame.mensah@example.com',
  phone: '+233244567890',
  firstName: 'Kwame',
  lastName: 'Mensah',
  profileImage: undefined,
  dateOfBirth: '1990-01-15',
  gender: 'male',
  address: {
    street: 'Ring Road Central',
    city: 'Accra',
    state: 'Greater Accra',
    country: 'Ghana',
    postalCode: 'GA-039-5028',
  },
  createdAt: new Date(Date.now() - 31536000000).toISOString(), // 1 year ago
  updatedAt: new Date().toISOString(),
};

const MOCK_SETTINGS: UserSettings = {
  notifications: {
    push: true,
    email: true,
    sms: false,
    rideUpdates: true,
    promotions: false,
  },
  privacy: {
    shareLocation: true,
    shareRideHistory: false,
  },
  preferences: {
    language: 'en',
    currency: 'GH¢',
    theme: 'auto',
  },
};

const MOCK_STATS: UserStats = {
  totalRides: 45,
  totalSpent: 850,
  currency: 'GH¢',
  favoriteVehicle: 'car',
  memberSince: MOCK_USER.createdAt,
};

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'card',
    name: 'Visa ending in 4242',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    createdAt: new Date(Date.now() - 15552000000).toISOString(), // 6 months ago
  },
  {
    id: 'pm_2',
    type: 'wallet',
    name: 'Cend Wallet',
    isDefault: false,
    createdAt: MOCK_USER.createdAt,
  },
];

// ==================== SERVICE FUNCTIONS ====================

/**
 * Simulate network delay
 */
const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get user profile
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  await simulateDelay(500);

  return MOCK_USER;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/user/profile');
  return response.data;
  */
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  updates: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<UserProfile> => {
  await simulateDelay(1000);

  const updatedUser: UserProfile = {
    ...MOCK_USER,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  return updatedUser;

  // TODO: Replace with actual API call
  /*
  const response = await api.patch('/user/profile', updates);
  return response.data;
  */
};

/**
 * Upload profile image
 */
export const uploadProfileImage = async (imageUri: string): Promise<{ url: string }> => {
  await simulateDelay(2000);

  // Mock upload
  const mockUrl = `https://example.com/profiles/${MOCK_USER.id}.jpg`;

  return { url: mockUrl };

  // TODO: Replace with actual API call
  /*
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'profile.jpg',
  });

  const response = await api.post('/user/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
  */
};

/**
 * Get user settings
 */
export const getUserSettings = async (): Promise<UserSettings> => {
  await simulateDelay(500);

  return MOCK_SETTINGS;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/user/settings');
  return response.data;
  */
};

/**
 * Update user settings
 */
export const updateUserSettings = async (settings: Partial<UserSettings>): Promise<UserSettings> => {
  await simulateDelay(800);

  const updatedSettings: UserSettings = {
    ...MOCK_SETTINGS,
    ...settings,
  };

  return updatedSettings;

  // TODO: Replace with actual API call
  /*
  const response = await api.patch('/user/settings', settings);
  return response.data;
  */
};

/**
 * Get user statistics
 */
export const getUserStats = async (): Promise<UserStats> => {
  await simulateDelay(500);

  return MOCK_STATS;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/user/stats');
  return response.data;
  */
};

/**
 * Get user payment methods
 */
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  await simulateDelay(500);

  return MOCK_PAYMENT_METHODS;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/user/payment-methods');
  return response.data;
  */
};

/**
 * Add new payment method
 */
export const addPaymentMethod = async (
  paymentData: Omit<PaymentMethod, 'id' | 'createdAt'>
): Promise<PaymentMethod> => {
  await simulateDelay(1500);

  const newPaymentMethod: PaymentMethod = {
    ...paymentData,
    id: `pm_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  return newPaymentMethod;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/user/payment-methods', paymentData);
  return response.data;
  */
};

/**
 * Remove payment method
 */
export const removePaymentMethod = async (paymentMethodId: string): Promise<void> => {
  await simulateDelay(800);

  console.log(`Payment method ${paymentMethodId} removed`);

  // TODO: Replace with actual API call
  /*
  await api.delete(`/user/payment-methods/${paymentMethodId}`);
  */
};

/**
 * Set default payment method
 */
export const setDefaultPaymentMethod = async (paymentMethodId: string): Promise<void> => {
  await simulateDelay(500);

  console.log(`Payment method ${paymentMethodId} set as default`);

  // TODO: Replace with actual API call
  /*
  await api.patch(`/user/payment-methods/${paymentMethodId}/set-default`);
  */
};

/**
 * Delete user account
 */
export const deleteAccount = async (password: string): Promise<void> => {
  await simulateDelay(2000);

  if (!password) {
    throw new Error('Password is required to delete account.');
  }

  console.log('Account deletion requested');

  // TODO: Replace with actual API call
  /*
  await api.post('/user/delete-account', { password });
  */
};

/**
 * Change password
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  await simulateDelay(1500);

  if (!currentPassword || !newPassword) {
    throw new Error('Both current and new passwords are required.');
  }

  if (newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters.');
  }

  console.log('Password changed successfully');

  // TODO: Replace with actual API call
  /*
  await api.post('/user/change-password', {
    currentPassword,
    newPassword,
  });
  */
};

// ==================== EXPORT ====================

export const UserService = {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  getUserSettings,
  updateUserSettings,
  getUserStats,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
  deleteAccount,
  changePassword,
};
