'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/auth';

export const MALE_AVATARS: string[] = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
];

export const FEMALE_AVATARS: string[] = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
];

export function detectGenderFromName(fullName: string): 'male' | 'female' {
  const clean = fullName.trim().toLowerCase();
  if (!clean) return 'male';

  const parts = clean.split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts[1] || '';

  const femaleNames = new Set([
    'aziza', 'madina', 'dilnoza', 'nigora', 'malika', 'zilola', 'feruza', 'barno', 'umida', 'munira',
    'guli', 'gulnoza', 'shahzoda', 'sevara', 'dildora', 'zarina', 'kamola', 'laylo', 'nodira', 'mohira',
    'rayhon', 'nozima', 'sabina', 'yulduz', 'shaxnoza', 'charos', 'shirin', 'dilorom', 'surayyo', 'hilola'
  ]);

  if (femaleNames.has(firstName)) return 'female';

  if (
    lastName.endsWith('yeva') ||
    lastName.endsWith('ova') ||
    firstName.endsWith('oy') ||
    firstName.endsWith('bonu') ||
    firstName.endsWith('begim') ||
    firstName.endsWith('niso') ||
    firstName.endsWith('xol') ||
    firstName.endsWith('gul')
  ) {
    return 'female';
  }

  return 'male';
}

export function getRandomAvatar(gender: 'male' | 'female' = 'male'): string {
  const list = gender === 'female' ? FEMALE_AVATARS : MALE_AVATARS;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    agencyName?: string;
    password?: string;
    gender?: 'male' | 'female';
    avatar?: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  registeredUsers: User[];
}

const DEFAULT_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Administrator',
    email: 'admin@uybozor.uz',
    phone: '+998 71 200 00 00',
    role: 'admin',
    avatar: MALE_AVATARS[4],
    gender: 'male',
    password: 'admin123',
    createdAt: '2025-01-01T00:00:00Z',
    isVerified: true,
  },
  {
    id: 'user-owner',
    name: 'Aziza Rahimova',
    email: 'aziza@home.uz',
    phone: '+998 97 765 43 21',
    role: 'owner',
    avatar: FEMALE_AVATARS[0],
    gender: 'female',
    password: 'aziza123',
    createdAt: '2025-02-10T12:00:00Z',
    isVerified: true,
  },
  {
    id: 'user-realtor',
    name: 'Sherzod Karimov',
    email: 'sherzod@realty.uz',
    phone: '+998 90 123 45 67',
    role: 'realtor',
    agencyName: 'Mirabad Premier Realty',
    avatar: MALE_AVATARS[0],
    gender: 'male',
    password: 'sherzod123',
    createdAt: '2025-02-15T15:30:00Z',
    isVerified: true,
  },
  {
    id: 'user-buyer',
    name: 'Jasurbek Mahmudov',
    email: 'jasur@gmail.com',
    phone: '+998 99 111 22 33',
    role: 'buyer',
    avatar: MALE_AVATARS[1],
    gender: 'male',
    password: 'jasur123',
    createdAt: '2025-03-01T09:00:00Z',
    isVerified: true,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(DEFAULT_USERS);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('uybozor_user_session');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      }

      const savedUsersList = localStorage.getItem('uybozor_registered_users');
      if (savedUsersList) {
        const parsed = JSON.parse(savedUsersList);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom registered users with default users
          const merged = [...DEFAULT_USERS];
          parsed.forEach((p: User) => {
            if (!merged.some((d) => d.email.toLowerCase() === p.email.toLowerCase())) {
              merged.push(p);
            }
          });
          setRegisteredUsers(merged);
        }
      }
    } catch (e) {
      console.error('Error loading auth from localStorage:', e);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; message: string }> => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      return { success: false, message: 'Iltimos, email manzilingizni kiriting.' };
    }
    if (!password) {
      return { success: false, message: 'Iltimos, parolingizni kiriting.' };
    }

    // Check in registered users
    const found = registeredUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!found) {
      return {
        success: false,
        message: "Bunday email bilan hisob topilmadi. Iltimos, avval ro'yxatdan o'ting yoki emailni tekshiring.",
      };
    }

    // Verify password strictly
    if (found.password && found.password !== password) {
      return {
        success: false,
        message: "Kiritilgan parol noto'g'ri! Iltimos, parolingizni tekshirib qaytadan urinib ko'ring.",
      };
    }

    // Success: save user session
    setUser(found);
    localStorage.setItem('uybozor_user_session', JSON.stringify(found));

    return { success: true, message: `Xush kelibsiz, ${found.name}!` };
  };

  const register = async (data: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    agencyName?: string;
    password?: string;
    gender?: 'male' | 'female';
    avatar?: string;
  }): Promise<{ success: boolean; message: string }> => {
    const trimmedEmail = data.email.trim().toLowerCase();

    const existing = registeredUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'Ushbu email bilan foydalanuvchi allaqachon ro\'yxatdan o\'tgan.' };
    }

    const determinedGender = data.gender || detectGenderFromName(data.name);
    const chosenAvatar = data.avatar || getRandomAvatar(determinedGender);

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: trimmedEmail,
      phone: data.phone.trim(),
      role: data.role,
      agencyName: data.role === 'realtor' ? data.agencyName?.trim() || 'Mustaqil rieltor' : undefined,
      gender: determinedGender,
      avatar: chosenAvatar,
      password: data.password || 'demo123',
      createdAt: new Date().toISOString(),
      isVerified: data.role === 'buyer',
    };

    setUser(newUser);
    setRegisteredUsers((prev) => {
      const updated = [newUser, ...prev];
      try {
        const customUsers = updated.filter((u) => !DEFAULT_USERS.some((d) => d.id === u.id));
        localStorage.setItem('uybozor_registered_users', JSON.stringify(customUsers));
      } catch (e) {
        console.error('Error saving user to localStorage:', e);
      }
      return updated;
    });

    localStorage.setItem('uybozor_user_session', JSON.stringify(newUser));

    return { success: true, message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uybozor_user_session');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        registeredUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
