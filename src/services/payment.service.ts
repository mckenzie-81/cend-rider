/**
 * Payment Service
 * Handles payment processing, wallet management, and transaction history
 * Used by: AccountScreen, RideTrackingScreen, TransportScreen
 */

// ==================== TYPES ====================

export type PaymentMethodType = 'card' | 'bank' | 'wallet' | 'cash';

export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export type TransactionType = 'ride' | 'topup' | 'refund' | 'withdrawal';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  details: {
    last4?: string; // For cards
    expiryMonth?: number; // For cards
    expiryYear?: number; // For cards
    bankName?: string; // For bank accounts
    accountNumber?: string; // For bank accounts
    brand?: string; // Card brand (Visa, Mastercard, etc.)
  };
  isDefault: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface Wallet {
  id: string;
  balance: number;
  currency: string;
  userId: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description: string;
  paymentMethodId?: string;
  paymentMethod?: string; // Display name
  rideId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  completedAt?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  clientSecret?: string; // For card payments
  paymentMethodId?: string;
}

export interface TopUpRequest {
  amount: number;
  paymentMethodId: string;
}

export interface WithdrawalRequest {
  amount: number;
  bankAccountId: string;
}

// ==================== MOCK DATA ====================

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm_card_1',
    type: 'card',
    name: 'Visa ending in 4242',
    details: {
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      brand: 'Visa',
    },
    isDefault: true,
    isVerified: true,
    createdAt: new Date(Date.now() - 15552000000).toISOString(), // 6 months ago
  },
  {
    id: 'pm_card_2',
    type: 'card',
    name: 'Mastercard ending in 5555',
    details: {
      last4: '5555',
      expiryMonth: 8,
      expiryYear: 2026,
      brand: 'Mastercard',
    },
    isDefault: false,
    isVerified: true,
    createdAt: new Date(Date.now() - 7776000000).toISOString(), // 3 months ago
  },
  {
    id: 'pm_bank_1',
    type: 'bank',
    name: 'GTBank Account',
    details: {
      bankName: 'Guaranty Trust Bank',
      accountNumber: '0123456789',
      last4: '6789',
    },
    isDefault: false,
    isVerified: true,
    createdAt: new Date(Date.now() - 31536000000).toISOString(), // 1 year ago
  },
  {
    id: 'pm_wallet_1',
    type: 'wallet',
    name: 'Cend Wallet',
    details: {},
    isDefault: false,
    isVerified: true,
    createdAt: new Date(Date.now() - 31536000000).toISOString(), // 1 year ago
  },
];

const MOCK_WALLET: Wallet = {
  id: 'wallet_123',
  balance: 15000,
  currency: 'NGN',
  userId: 'user_123456',
  lastUpdated: new Date().toISOString(),
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn_1',
    type: 'ride',
    amount: -2500,
    currency: 'NGN',
    status: 'completed',
    description: 'Ride to Lekki Phase 1',
    paymentMethodId: 'pm_card_1',
    paymentMethod: 'Visa •••• 4242',
    rideId: 'ride_123',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    completedAt: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: 'txn_2',
    type: 'topup',
    amount: 10000,
    currency: 'NGN',
    status: 'completed',
    description: 'Wallet top-up',
    paymentMethodId: 'pm_card_1',
    paymentMethod: 'Visa •••• 4242',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    completedAt: new Date(Date.now() - 86300000).toISOString(),
  },
  {
    id: 'txn_3',
    type: 'ride',
    amount: -1800,
    currency: 'NGN',
    status: 'completed',
    description: 'Ride to Victoria Island',
    paymentMethodId: 'pm_wallet_1',
    paymentMethod: 'Cend Wallet',
    rideId: 'ride_122',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    completedAt: new Date(Date.now() - 172700000).toISOString(),
  },
  {
    id: 'txn_4',
    type: 'refund',
    amount: 2500,
    currency: 'NGN',
    status: 'completed',
    description: 'Refund for cancelled ride',
    rideId: 'ride_121',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    completedAt: new Date(Date.now() - 259100000).toISOString(),
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
 * Get all payment methods
 */
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  await simulateDelay(500);

  return MOCK_PAYMENT_METHODS;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/payments/methods');
  return response.data;
  */
};

/**
 * Add new payment method
 */
export const addPaymentMethod = async (
  type: PaymentMethodType,
  details: any
): Promise<PaymentMethod> => {
  await simulateDelay(2000);

  const newMethod: PaymentMethod = {
    id: `pm_${type}_${Date.now()}`,
    type,
    name: details.name || `${type} payment method`,
    details,
    isDefault: false,
    isVerified: false,
    createdAt: new Date().toISOString(),
  };

  return newMethod;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/payments/methods', { type, details });
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
  await api.delete(`/payments/methods/${paymentMethodId}`);
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
  await api.patch(`/payments/methods/${paymentMethodId}/set-default`);
  */
};

/**
 * Get wallet balance
 */
export const getWalletBalance = async (): Promise<Wallet> => {
  await simulateDelay(500);

  return MOCK_WALLET;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/payments/wallet');
  return response.data;
  */
};

/**
 * Top up wallet
 */
export const topUpWallet = async (request: TopUpRequest): Promise<Transaction> => {
  await simulateDelay(2000);

  if (request.amount < 100) {
    throw new Error('Minimum top-up amount is ₦100');
  }

  if (request.amount > 500000) {
    throw new Error('Maximum top-up amount is ₦500,000');
  }

  const transaction: Transaction = {
    id: `txn_${Date.now()}`,
    type: 'topup',
    amount: request.amount,
    currency: 'NGN',
    status: 'completed',
    description: 'Wallet top-up',
    paymentMethodId: request.paymentMethodId,
    paymentMethod: 'Card payment',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };

  return transaction;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/payments/wallet/topup', request);
  return response.data;
  */
};

/**
 * Withdraw from wallet to bank account
 */
export const withdrawFromWallet = async (request: WithdrawalRequest): Promise<Transaction> => {
  await simulateDelay(2000);

  if (request.amount < 1000) {
    throw new Error('Minimum withdrawal amount is ₦1,000');
  }

  if (request.amount > MOCK_WALLET.balance) {
    throw new Error('Insufficient wallet balance');
  }

  const transaction: Transaction = {
    id: `txn_${Date.now()}`,
    type: 'withdrawal',
    amount: -request.amount,
    currency: 'NGN',
    status: 'processing',
    description: 'Wallet withdrawal',
    createdAt: new Date().toISOString(),
  };

  return transaction;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/payments/wallet/withdraw', request);
  return response.data;
  */
};

/**
 * Get transaction history
 */
export const getTransactionHistory = async (
  limit: number = 50,
  offset: number = 0,
  type?: TransactionType
): Promise<Transaction[]> => {
  await simulateDelay(800);

  let transactions = [...MOCK_TRANSACTIONS];

  if (type) {
    transactions = transactions.filter(t => t.type === type);
  }

  return transactions.slice(offset, offset + limit);

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/payments/transactions', {
    params: { limit, offset, type }
  });
  return response.data;
  */
};

/**
 * Get transaction details
 */
export const getTransactionDetails = async (transactionId: string): Promise<Transaction> => {
  await simulateDelay(500);

  const transaction = MOCK_TRANSACTIONS.find(t => t.id === transactionId);

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  return transaction;

  // TODO: Replace with actual API call
  /*
  const response = await api.get(`/payments/transactions/${transactionId}`);
  return response.data;
  */
};

/**
 * Process ride payment
 */
export const processRidePayment = async (
  rideId: string,
  amount: number,
  paymentMethodId?: string
): Promise<Transaction> => {
  await simulateDelay(1500);

  // Simulate payment processing
  const success = Math.random() > 0.1; // 90% success rate

  if (!success) {
    throw new Error('Payment failed. Please try again or use a different payment method.');
  }

  const transaction: Transaction = {
    id: `txn_${Date.now()}`,
    type: 'ride',
    amount: -amount,
    currency: 'NGN',
    status: 'completed',
    description: 'Ride payment',
    paymentMethodId,
    rideId,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };

  return transaction;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/payments/process-ride', {
    rideId,
    amount,
    paymentMethodId
  });
  return response.data;
  */
};

/**
 * Create payment intent (for card payments)
 */
export const createPaymentIntent = async (
  amount: number,
  currency: string = 'NGN'
): Promise<PaymentIntent> => {
  await simulateDelay(1000);

  const intent: PaymentIntent = {
    id: `pi_${Date.now()}`,
    amount,
    currency,
    status: 'pending',
    clientSecret: `secret_${Date.now()}`,
  };

  return intent;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/payments/create-intent', {
    amount,
    currency
  });
  return response.data;
  */
};

/**
 * Verify payment method (for cards, trigger 3D Secure, etc.)
 */
export const verifyPaymentMethod = async (paymentMethodId: string): Promise<boolean> => {
  await simulateDelay(2000);

  // Mock verification - always succeeds
  console.log(`Payment method ${paymentMethodId} verified`);
  return true;

  // TODO: Replace with actual API call
  /*
  const response = await api.post(`/payments/methods/${paymentMethodId}/verify`);
  return response.data.verified;
  */
};

/**
 * Request refund for a transaction
 */
export const requestRefund = async (
  transactionId: string,
  reason: string
): Promise<Transaction> => {
  await simulateDelay(1500);

  const refund: Transaction = {
    id: `txn_refund_${Date.now()}`,
    type: 'refund',
    amount: 2500, // Mock amount
    currency: 'NGN',
    status: 'processing',
    description: `Refund for transaction ${transactionId}`,
    metadata: { originalTransactionId: transactionId, reason },
    createdAt: new Date().toISOString(),
  };

  return refund;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/payments/refund', {
    transactionId,
    reason
  });
  return response.data;
  */
};

// ==================== EXPORT ====================

export const PaymentService = {
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
  getWalletBalance,
  topUpWallet,
  withdrawFromWallet,
  getTransactionHistory,
  getTransactionDetails,
  processRidePayment,
  createPaymentIntent,
  verifyPaymentMethod,
  requestRefund,
};
