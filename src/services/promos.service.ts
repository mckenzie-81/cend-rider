/**
 * Promos Service
 * Handles promotional content and offers across the app
 * Used by: HomeScreen, ServicesScreen, and other promotional displays
 */

// ==================== TYPES ====================

export type PromoStatus = 'active' | 'inactive' | 'expired' | 'scheduled';
export type PromoPage = 'home' | 'services' | 'activity' | 'account' | 'transport' | 'all';

export interface PromoItem {
  id: string;
  title: string;
  description?: string;
  buttonLabel: string;
  imageUrl?: string;
  backgroundColor?: string; // Background color for the promo card
  status: PromoStatus;
  priority: number; // Higher priority promos appear first
  pages: PromoPage[]; // Which pages this promo should appear on
  validFrom?: string; // ISO date string
  validUntil?: string; // ISO date string
  clickAction?: {
    type: 'navigate' | 'external' | 'modal';
    target: string;
    params?: any;
  };
  impressions?: number; // Track how many times shown
  clicks?: number; // Track how many times clicked
}

// ==================== MOCK DATA ====================

const MOCK_PROMOS: PromoItem[] = [
  {
    id: 'promo_ride_discount_1',
    title: 'Get 20% off your next ride',
    description: 'Use code RIDE20 at checkout',
    buttonLabel: 'Claim Now',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80', // Car ride image
    backgroundColor: '#FFE5B4', // Soft peach/beige - complements car interior tones
    status: 'active',
    priority: 10,
    pages: ['home', 'transport'],
    validFrom: new Date(Date.now() - 86400000).toISOString(), // Started yesterday
    validUntil: new Date(Date.now() + 604800000).toISOString(), // Expires in 7 days
    clickAction: {
      type: 'modal',
      target: 'promo_details',
      params: { promoCode: 'RIDE20', discount: 20 },
    },
  },
  {
    id: 'promo_free_delivery_1',
    title: 'Free delivery on orders above GH₵50',
    description: 'Limited time offer for dispatch services',
    buttonLabel: 'Order Now',
    imageUrl: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800&q=80', // Delivery package image
    backgroundColor: '#E8F4F8', // Light blue - fresh delivery vibe
    status: 'active',
    priority: 8,
    pages: ['home', 'services'],
    validFrom: new Date(Date.now() - 172800000).toISOString(), // Started 2 days ago
    validUntil: new Date(Date.now() + 1209600000).toISOString(), // Expires in 14 days
    clickAction: {
      type: 'navigate',
      target: 'services',
    },
  },
  {
    id: 'promo_referral_1',
    title: 'Invite friends and earn rewards',
    description: 'Get GH₵10 for each friend who signs up',
    buttonLabel: 'Share Now',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', // People/friends image
    backgroundColor: '#FFF0F5', // Soft pink - friendly and social
    status: 'active',
    priority: 5,
    pages: ['home', 'account'],
    validFrom: new Date(Date.now() - 259200000).toISOString(), // Started 3 days ago
    clickAction: {
      type: 'navigate',
      target: 'referral',
    },
  },
  {
    id: 'promo_okada_special_1',
    title: 'Beat traffic! Okada rides from GH₵5',
    description: 'Fast and affordable motorcycle rides',
    buttonLabel: 'Book Now',
    imageUrl: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&q=80', // Motorcycle image
    backgroundColor: '#FFE4CC', // Warm orange-cream - energetic and fast
    status: 'active',
    priority: 7,
    pages: ['home', 'transport'],
    validFrom: new Date(Date.now() - 86400000).toISOString(),
    validUntil: new Date(Date.now() + 432000000).toISOString(), // Expires in 5 days
    clickAction: {
      type: 'navigate',
      target: 'transport',
      params: { mode: 'okada' },
    },
  },
  {
    id: 'promo_weekend_rides_1',
    title: 'Weekend special: 15% off all rides',
    description: 'Valid on Saturdays and Sundays',
    buttonLabel: 'Get Discount',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', // Weekend/travel image
    backgroundColor: '#E6F3FF', // Light sky blue - weekend adventure feel
    status: 'active',
    priority: 9,
    pages: ['home'],
    validFrom: new Date(Date.now() - 43200000).toISOString(),
    validUntil: new Date(Date.now() + 259200000).toISOString(), // Expires in 3 days
    clickAction: {
      type: 'modal',
      target: 'promo_details',
      params: { promoCode: 'WEEKEND15', discount: 15 },
    },
  },
];

// ==================== SERVICE FUNCTIONS ====================

/**
 * Simulate network delay
 */
const simulateDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get all active promos for a specific page
 */
export const getPromosForPage = async (page: PromoPage, limit?: number): Promise<PromoItem[]> => {
  await simulateDelay(600);

  // Filter active promos for the specified page
  let promos = MOCK_PROMOS.filter(
    p => p.status === 'active' && (p.pages.includes(page) || p.pages.includes('all'))
  );

  // Check if promos are still valid
  const now = new Date().getTime();
  promos = promos.filter(p => {
    const validFrom = p.validFrom ? new Date(p.validFrom).getTime() : 0;
    const validUntil = p.validUntil ? new Date(p.validUntil).getTime() : Infinity;
    return now >= validFrom && now <= validUntil;
  });

  // Sort by priority (highest first)
  promos.sort((a, b) => b.priority - a.priority);

  // Limit results if specified
  if (limit && limit > 0) {
    promos = promos.slice(0, limit);
  }

  return promos;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/promos', {
    params: { page, limit, status: 'active' }
  });
  return response.data;
  */
};

/**
 * Get all promos (for admin/management purposes)
 */
export const getAllPromos = async (status?: PromoStatus): Promise<PromoItem[]> => {
  await simulateDelay(800);

  let promos = [...MOCK_PROMOS];

  if (status) {
    promos = promos.filter(p => p.status === status);
  }

  // Sort by priority
  promos.sort((a, b) => b.priority - a.priority);

  return promos;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/promos/all', {
    params: { status }
  });
  return response.data;
  */
};

/**
 * Get a specific promo by ID
 */
export const getPromoById = async (promoId: string): Promise<PromoItem> => {
  await simulateDelay(500);

  const promo = MOCK_PROMOS.find(p => p.id === promoId);

  if (!promo) {
    throw new Error('Promo not found');
  }

  return promo;

  // TODO: Replace with actual API call
  /*
  const response = await api.get(`/promos/${promoId}`);
  return response.data;
  */
};

/**
 * Track promo impression (when shown to user)
 */
export const trackPromoImpression = async (promoId: string, page: PromoPage): Promise<void> => {
  await simulateDelay(200);

  console.log(`Promo impression tracked: ${promoId} on ${page}`);

  // TODO: Replace with actual API call
  /*
  await api.post(`/promos/${promoId}/impression`, { page });
  */
};

/**
 * Track promo click (when user clicks on promo)
 */
export const trackPromoClick = async (promoId: string, page: PromoPage): Promise<void> => {
  await simulateDelay(200);

  console.log(`Promo click tracked: ${promoId} on ${page}`);

  // TODO: Replace with actual API call
  /*
  await api.post(`/promos/${promoId}/click`, { page });
  */
};

/**
 * Handle promo click action
 */
export const handlePromoAction = (
  promo: PromoItem,
  page: PromoPage,
  navigate: (screen: string, params?: any) => void
): void => {
  // Track the click
  trackPromoClick(promo.id, page);

  // Execute the action
  if (!promo.clickAction) {
    console.log('No action defined for promo:', promo.id);
    return;
  }

  const action = promo.clickAction;

  switch (action.type) {
    case 'navigate':
      navigate(action.target, action.params);
      break;
    case 'external':
      console.log('Open external link:', action.target);
      // TODO: Open external browser
      break;
    case 'modal':
      console.log('Show modal:', action.target, action.params);
      // TODO: Show modal/bottom sheet
      break;
    default:
      console.log('Unknown action type');
  }
};

/**
 * Check if promo is currently valid
 */
export const isPromoValid = (promo: PromoItem): boolean => {
  if (promo.status !== 'active') {
    return false;
  }

  const now = new Date().getTime();
  const validFrom = promo.validFrom ? new Date(promo.validFrom).getTime() : 0;
  const validUntil = promo.validUntil ? new Date(promo.validUntil).getTime() : Infinity;

  return now >= validFrom && now <= validUntil;
};

// ==================== EXPORT ====================

export const PromosService = {
  getPromosForPage,
  getAllPromos,
  getPromoById,
  trackPromoImpression,
  trackPromoClick,
  handlePromoAction,
  isPromoValid,
};
