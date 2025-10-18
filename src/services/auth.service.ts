/**
 * Authentication Service
 * Handles user authentication operations: login, signup, verification
 * Used by: LoginScreen, SignupScreen, VerificationScreen
 */

// ==================== TYPES ====================

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

export interface SignupData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface VerificationData {
  code: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// ==================== MOCK DATA ====================

const MOCK_USER: User = {
  id: 'user_123456',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  firstName: 'John',
  lastName: 'Doe',
  profileImage: undefined,
  createdAt: new Date().toISOString(),
};

const MOCK_TOKEN = 'mock_jwt_token_abc123xyz789';
const MOCK_REFRESH_TOKEN = 'mock_refresh_token_xyz789abc123';

// ==================== SERVICE FUNCTIONS ====================

/**
 * Simulate network delay for realistic UX
 */
const simulateDelay = (ms: number = 1500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Login user with email/phone and password
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await simulateDelay(1500);

  // Mock validation
  if (!credentials.password || credentials.password.length < 6) {
    throw new Error('Invalid password. Must be at least 6 characters.');
  }

  if (!credentials.email && !credentials.phone) {
    throw new Error('Email or phone number is required.');
  }

  // Return mock successful login
  return {
    user: MOCK_USER,
    token: MOCK_TOKEN,
    refreshToken: MOCK_REFRESH_TOKEN,
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/auth/login', credentials);
  return response.data;
  */
};

/**
 * Sign up new user
 */
export const signup = async (data: SignupData): Promise<AuthResponse> => {
  await simulateDelay(2000);

  // Mock validation
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email address.');
  }

  if (!data.phone || data.phone.length < 10) {
    throw new Error('Invalid phone number.');
  }

  if (!data.password || data.password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  // Return mock successful signup
  return {
    user: {
      ...MOCK_USER,
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
    },
    token: MOCK_TOKEN,
    refreshToken: MOCK_REFRESH_TOKEN,
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/auth/signup', data);
  return response.data;
  */
};

/**
 * Verify phone number with OTP code
 */
export const verifyPhone = async (data: VerificationData): Promise<{ verified: boolean; message: string }> => {
  await simulateDelay(1000);

  // Mock validation
  if (!data.code || data.code.length !== 6) {
    throw new Error('Invalid verification code. Must be 6 digits.');
  }

  // Mock success (accept any 6-digit code for now)
  return {
    verified: true,
    message: 'Phone number verified successfully!',
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/auth/verify-phone', data);
  return response.data;
  */
};

/**
 * Resend verification code
 */
export const resendVerificationCode = async (phone: string): Promise<{ sent: boolean; message: string }> => {
  await simulateDelay(1000);

  if (!phone) {
    throw new Error('Phone number is required.');
  }

  return {
    sent: true,
    message: 'Verification code sent successfully!',
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/auth/resend-code', { phone });
  return response.data;
  */
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (email: string): Promise<{ sent: boolean; message: string }> => {
  await simulateDelay(1500);

  if (!email || !email.includes('@')) {
    throw new Error('Invalid email address.');
  }

  return {
    sent: true,
    message: 'Password reset link sent to your email.',
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
  */
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  await simulateDelay(500);

  // Clear local storage/secure storage
  // TODO: Implement token clearing

  // TODO: Replace with actual API call if needed
  /*
  await api.post('/auth/logout');
  */
};

/**
 * Refresh authentication token
 */
export const refreshAuthToken = async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
  await simulateDelay(800);

  if (!refreshToken) {
    throw new Error('Refresh token is required.');
  }

  return {
    token: MOCK_TOKEN,
    refreshToken: MOCK_REFRESH_TOKEN,
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/auth/refresh', { refreshToken });
  return response.data;
  */
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<User> => {
  await simulateDelay(500);

  return MOCK_USER;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/auth/me');
  return response.data;
  */
};

// ==================== EXPORT ====================

export const AuthService = {
  login,
  signup,
  verifyPhone,
  resendVerificationCode,
  requestPasswordReset,
  logout,
  refreshAuthToken,
  getCurrentUser,
};
