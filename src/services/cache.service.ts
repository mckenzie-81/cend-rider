/**
 * Cache Service
 * Handles data preloading and caching for the app
 * Used by: App.tsx, all screens
 */

import { ServicesCatalogService, ServiceItem } from './catalog.service';
import { PromosService, PromoItem } from './promos.service';
import { RideService, Ride } from './ride.service';
import { UserService } from './user.service';

// ==================== TYPES ====================

interface AppCache {
  services: ServiceItem[];
  promos: PromoItem[];
  recentRides: Ride[];
  userProfile: any | null;
  lastUpdated: number;
}

// ==================== CACHE STATE ====================

let appCache: AppCache = {
  services: [],
  promos: [],
  recentRides: [],
  userProfile: null,
  lastUpdated: 0,
};

let cacheInitialized = false;
let cachePromise: Promise<void> | null = null;

// Cache expiry time (5 minutes)
const CACHE_EXPIRY_MS = 5 * 60 * 1000;

// ==================== SERVICE FUNCTIONS ====================

/**
 * Check if cache is still valid
 */
const isCacheValid = (): boolean => {
  if (!cacheInitialized) return false;
  const now = Date.now();
  return now - appCache.lastUpdated < CACHE_EXPIRY_MS;
};

/**
 * Preload all essential data before showing the app
 * This runs once at app startup
 */
export const preloadAppData = async (): Promise<void> => {
  // If already loading, return the existing promise
  if (cachePromise) {
    return cachePromise;
  }

  // If cache is still valid, no need to reload
  if (isCacheValid()) {
    return Promise.resolve();
  }

  console.log('🚀 Preloading app data...');

  cachePromise = (async () => {
    try {
      const startTime = Date.now();

      // Load all data in parallel for faster loading
      const [services, promos, recentRides, userProfile] = await Promise.all([
        ServicesCatalogService.getAllServices().catch((error: Error) => {
          console.error('Failed to load services:', error);
          return [];
        }),
        PromosService.getAllPromos('active').catch((error: Error) => {
          console.error('Failed to load promos:', error);
          return [];
        }),
        RideService.getRideHistory(5).catch((error: Error) => {
          console.error('Failed to load ride history:', error);
          return [];
        }),
        UserService.getUserProfile().catch((error: Error) => {
          console.error('Failed to load user profile:', error);
          return null;
        }),
      ]);

      // Update cache
      appCache = {
        services,
        promos,
        recentRides,
        userProfile,
        lastUpdated: Date.now(),
      };

      cacheInitialized = true;

      const loadTime = Date.now() - startTime;
      console.log(`✅ App data preloaded in ${loadTime}ms`);
      console.log(`   - ${services.length} services`);
      console.log(`   - ${promos.length} promos`);
      console.log(`   - ${recentRides.length} recent rides`);
      console.log(`   - User profile: ${userProfile ? 'loaded' : 'not available'}`);
    } catch (error) {
      console.error('❌ Failed to preload app data:', error);
      // Even if preload fails, we set initialized to true so the app can still load
      cacheInitialized = true;
    } finally {
      cachePromise = null;
    }
  })();

  return cachePromise;
};

/**
 * Get services from cache (instant)
 */
export const getCachedServices = (): ServiceItem[] => {
  return appCache.services;
};

/**
 * Get promos from cache (instant)
 */
export const getCachedPromos = (page?: string, limit?: number): PromoItem[] => {
  let promos = appCache.promos;

  // Filter by page if specified
  if (page && page !== 'all') {
    promos = promos.filter((p) => p.pages.includes(page as any) || p.pages.includes('all'));
  }

  // Limit results if specified
  if (limit) {
    promos = promos.slice(0, limit);
  }

  return promos;
};

/**
 * Get recent rides from cache (instant)
 */
export const getCachedRecentRides = (limit?: number): Ride[] => {
  return limit ? appCache.recentRides.slice(0, limit) : appCache.recentRides;
};

/**
 * Get user profile from cache (instant)
 */
export const getCachedUserProfile = (): any | null => {
  return appCache.userProfile;
};

/**
 * Refresh cache in the background
 * Call this when user pulls to refresh or after certain actions
 */
export const refreshCache = async (): Promise<void> => {
  console.log('🔄 Refreshing cache...');
  cacheInitialized = false;
  await preloadAppData();
};

/**
 * Clear cache
 * Call this on logout
 */
export const clearCache = (): void => {
  console.log('🗑️  Clearing cache...');
  appCache = {
    services: [],
    promos: [],
    recentRides: [],
    userProfile: null,
    lastUpdated: 0,
  };
  cacheInitialized = false;
  cachePromise = null;
};

/**
 * Check if cache has been initialized
 */
export const isCacheReady = (): boolean => {
  return cacheInitialized;
};

/**
 * Get cache statistics (for debugging)
 */
export const getCacheStats = () => {
  return {
    initialized: cacheInitialized,
    lastUpdated: appCache.lastUpdated,
    age: Date.now() - appCache.lastUpdated,
    isValid: isCacheValid(),
    itemCounts: {
      services: appCache.services.length,
      promos: appCache.promos.length,
      recentRides: appCache.recentRides.length,
      userProfile: appCache.userProfile ? 'loaded' : 'not loaded',
    },
  };
};

// ==================== EXPORT ====================

export const CacheService = {
  preloadAppData,
  getCachedServices,
  getCachedPromos,
  getCachedRecentRides,
  getCachedUserProfile,
  refreshCache,
  clearCache,
  isCacheReady,
  getCacheStats,
};
