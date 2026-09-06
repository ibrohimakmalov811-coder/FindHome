'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, FilterState, Currency, DealType, ThemeMode } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';

interface PropertyContextType {
  properties: Property[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  comparison: string[];
  toggleCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceUSD: number, dealType?: DealType, period?: 'month' | 'day') => string;
  addProperty: (newProp: Omit<Property, 'id' | 'createdAt' | 'viewsCount'>) => Property;
  verifyProperty: (id: string, isVerified: boolean) => void;
  toggleFeaturedProperty: (id: string) => void;
  deleteProperty: (id: string) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  dealType: 'all',
  city: 'all',
  district: 'all',
  propertyType: 'all',
  minPrice: '',
  maxPrice: '',
  minArea: '',
  maxArea: '',
  rooms: 'all',
  renovation: 'all',
  isFurnished: null,
  amenities: [],
  sortBy: 'newest',
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const USD_TO_UZS_RATE = 12850;

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparison, setComparison] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      // 1. Theme initialization
      const savedTheme = localStorage.getItem('theme') as ThemeMode;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }

      // 2. Properties initialization
      const savedProps = localStorage.getItem('custom_properties');
      if (savedProps) {
        const parsed = JSON.parse(savedProps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (parsed.length >= mockProperties.length) {
            setProperties(parsed);
          } else {
            const existingIds = new Set(parsed.map((p) => p.id));
            const remainingMocks = mockProperties.filter((p) => !existingIds.has(p.id));
            setProperties([...parsed, ...remainingMocks]);
          }
        }
      }

      // 3. Favorites
      const savedFavs = localStorage.getItem('property_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      // 4. Comparison
      const savedComp = localStorage.getItem('property_compare');
      if (savedComp) {
        setComparison(JSON.parse(savedComp));
      }

      // 5. Currency
      const savedCurrency = localStorage.getItem('property_currency') as Currency;
      if (savedCurrency === 'USD' || savedCurrency === 'UZS') {
        setCurrency(savedCurrency);
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setTheme((prev) => {
      const next: ThemeMode = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', next);
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  };

  // Save favorites to localStorage
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('property_favorites', JSON.stringify(next));
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // Comparison logic (maximum 4 items)
  const toggleCompare = (id: string) => {
    setComparison((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 4) {
          alert("Solishtirish uchun bir vaqtning o'zida ko'pi bilan 4 ta uy tanlash mumkin.");
          return prev;
        }
        next = [...prev, id];
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('property_compare', JSON.stringify(next));
      }
      return next;
    });
  };

  const isInCompare = (id: string) => comparison.includes(id);

  const clearCompare = () => {
    setComparison([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('property_compare');
    }
  };

  const handleSetCurrency = (c: Currency) => {
    setCurrency(c);
    if (typeof window !== 'undefined') {
      localStorage.setItem('property_currency', c);
    }
  };

  const formatPrice = (priceUSD: number, dealType?: DealType, period?: 'month' | 'day'): string => {
    let formatted = '';
    if (currency === 'UZS') {
      const priceUZS = priceUSD * USD_TO_UZS_RATE;
      formatted = priceUZS.toLocaleString('uz-UZ') + " so'm";
    } else {
      formatted = '$' + priceUSD.toLocaleString('en-US');
    }

    if (dealType === 'rent') {
      const perStr = period === 'day' ? '/kun' : '/oy';
      return `${formatted} ${perStr}`;
    }

    return formatted;
  };

  const addProperty = (newProp: Omit<Property, 'id' | 'createdAt' | 'viewsCount'>): Property => {
    const created: Property = {
      ...newProp,
      id: `custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
      viewsCount: 1,
    };

    setProperties((prev) => {
      const updated = [created, ...prev];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('custom_properties', JSON.stringify(updated));
        } catch (e) {
          console.error('Error saving new property:', e);
        }
      }
      return updated;
    });

    return created;
  };

  const verifyProperty = (id: string, isVerified: boolean) => {
    setProperties((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, isVerified } : p));
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('custom_properties', JSON.stringify(updated));
        } catch (e) {
          console.error('Error updating property verification:', e);
        }
      }
      return updated;
    });
  };

  const toggleFeaturedProperty = (id: string) => {
    setProperties((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('custom_properties', JSON.stringify(updated));
        } catch (e) {
          console.error('Error toggling featured property:', e);
        }
      }
      return updated;
    });
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('custom_properties', JSON.stringify(updated));
        } catch (e) {
          console.error('Error deleting property:', e);
        }
      }
      return updated;
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        favorites,
        toggleFavorite,
        isFavorite,
        comparison,
        toggleCompare,
        isInCompare,
        clearCompare,
        currency,
        setCurrency: handleSetCurrency,
        formatPrice,
        addProperty,
        verifyProperty,
        toggleFeaturedProperty,
        deleteProperty,
        theme,
        toggleTheme,
        filters,
        setFilters,
        resetFilters,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
