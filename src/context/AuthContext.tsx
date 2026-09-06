'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/auth';

export const AVATAR_PRESETS: string[] = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80',
];

export function getRandomAvatar(): string {
  const index = Math.floor(Math.random() * AVATAR_PRESETS.length);
  return AVATAR_PRESETS[index];
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
    avatar: AVATAR_PRESETS[5],
    createdAt: '2025-01-01T00:00:00Z',
    isVerified: true,
  },
  {
    id: 'user-owner',
    name: 'Aziza Rahimova',
    email: 'aziza@home.uz',
    phone: '+998 97 765 43 21',
    role: 'owner',
    avatar: AVATAR_PRESETS[2],
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
    avatar: AVATAR_PRESETS[1],
    createdAt: '2025-02-15T15:30:00Z',
    isVerified: true,
  },
  {
    id: 'user-buyer',
    name: 'Jasurbek Mahmudov',
    email: 'jasur@gmail.com',
    phone: '+998 99 111 22 33',
    role: 'buyer',
    avatar: AVATAR_PRESETS[3],
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
        if (parsed && !parsed.avatar) {
          parsed.avatar = getRandomAvatar();
        }
        setUser(parsed);
      }

      const savedUsersList = localStorage.getItem('uybozor_registered_users');
      if (savedUsersList) {
        const parsed = JSON.parse(savedUsersList);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const withAvatars = parsed.map((u: User, idx: number) => ({
            ...u,
            avatar: u.avatar || AVATAR_PRESETS[idx % AVATAR_PRESETS.length],
          }));
          setRegisteredUsers([...DEFAULT_USERS, ...withAvatars.filter((p: User) => !DEFAULT_USERS.some(d => d.email === p.email))]);
        }
      }
    } catch (e) {
      console.error('Error loading auth from localStorage:', e);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; message: string }> => {
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail === 'admin@uybozor.uz' || trimmedEmail === 'admin') {
      const adminUser = DEFAULT_USERS[0];
      setUser(adminUser);
      localStorage.setItem('uybozor_user_session', JSON.stringify(adminUser));
      return { success: true, message: 'Xush kelibsiz, Administrator!' };
    }

    const found = registeredUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (found) {
      const userWithAvatar = {
        ...found,
        avatar: found.avatar || getRandomAvatar(),
      };
      setUser(userWithAvatar);
      localStorage.setItem('uybozor_user_session', JSON.stringify(userWithAvatar));
      return { success: true, message: `Xush kelibsiz, ${found.name}!` };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: trimmedEmail,
      phone: '+998 90 000 00 00',
      role: 'buyer',
      avatar: getRandomAvatar(),
      createdAt: new Date().toISOString(),
      isVerified: true,
    };

    setUser(newUser);
    setRegisteredUsers((prev) => {
      const updated = [newUser, ...prev];
      localStorage.setItem('uybozor_registered_users', JSON.stringify(updated.filter(u => !DEFAULT_USERS.some(d => d.id === u.id))));
      return updated;
    });
    localStorage.setItem('uybozor_user_session', JSON.stringify(newUser));

    return { success: true, message: 'Tizimga muvaffaqiyatli kirdingiz!' };
  };

  const register = async (data: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    agencyName?: string;
    password?: string;
  }): Promise<{ success: boolean; message: string }> => {
    const trimmedEmail = data.email.trim().toLowerCase();

    const existing = registeredUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'Ushbu email bilan foydalanuvchi allaqachon mavjud.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: trimmedEmail,
      phone: data.phone.trim(),
      role: data.role,
      agencyName: data.role === 'realtor' ? data.agencyName?.trim() || 'Mustaqil rieltor' : undefined,
      avatar: getRandomAvatar(),
      createdAt: new Date().toISOString(),
      isVerified: data.role === 'buyer',
    };

    setUser(newUser);
    setRegisteredUsers((prev) => {
      const updated = [newUser, ...prev];
      localStorage.setItem('uybozor_registered_users', JSON.stringify(updated.filter(u => !DEFAULT_USERS.some(d => d.id === u.id))));
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
