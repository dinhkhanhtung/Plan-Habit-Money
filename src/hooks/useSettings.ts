import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export interface UserSettings {
  id: string;
  theme: string;
  notifications: boolean;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSettingsData {
  theme?: string;
  notifications?: boolean;
  currency?: string;
}

export function useSettings() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch settings');

      const data = await response.json();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const updateSettings = useCallback(async (settingsData: UpdateSettingsData): Promise<boolean> => {
    if (!session?.user?.id) return false;

    setLoading(true);
    setError(null);

    // Optimistic update
    setSettings(prev => prev ? { ...prev, ...settingsData } : null);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        fetchSettings();
        throw new Error('Failed to update settings');
      }

      const updatedSettings = await response.json();
      setSettings(updatedSettings);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, fetchSettings]);

  const updateTheme = useCallback(async (theme: string): Promise<boolean> => {
    return updateSettings({ theme });
  }, [updateSettings]);

  const updateNotifications = useCallback(async (notifications: boolean): Promise<boolean> => {
    return updateSettings({ notifications });
  }, [updateSettings]);

  const updateCurrency = useCallback(async (currency: string): Promise<boolean> => {
    return updateSettings({ currency });
  }, [updateSettings]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchSettings();
    }
  }, [session?.user?.id, fetchSettings]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    updateTheme,
    updateNotifications,
    updateCurrency,
  };
}