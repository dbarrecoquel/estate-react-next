"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AdsPage, AdsSearchParams } from "@/models/ads/ads.model";
import { fetchAds } from "@/lib/api";

interface AdsContextValue {
  adsPage: AdsPage | null;
  loading: boolean;
  error: string | null;
  searchParams: AdsSearchParams;
  loadAds: (params?: AdsSearchParams) => Promise<void>;
  setSearchParams: (params: AdsSearchParams) => void;
}

const AdsContext = createContext<AdsContextValue | undefined>(undefined);

export function AdsProvider({ children }: { children: ReactNode }) {
  const [adsPage, setAdsPage] = useState<AdsPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<AdsSearchParams>({ page: 0, size: 10 });

  const loadAds = useCallback(async (params?: AdsSearchParams) => {
    const effectiveParams = params ?? searchParams;
    // Mémoriser les params courants pour que Pagination puisse les réutiliser
    setSearchParams(effectiveParams);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAds(effectiveParams);
      setAdsPage(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdsContext.Provider value={{ adsPage, loading, error, searchParams, loadAds, setSearchParams }}>
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  const ctx = useContext(AdsContext);
  if (!ctx) throw new Error("useAds must be used within AdsProvider");
  return ctx;
}