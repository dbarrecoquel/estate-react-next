"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AdsType } from "@/models/ads/ads-type.model";
import { fetchAdsTypes } from "@/lib/api";

interface SearchContextValue {
  adsTypes: AdsType[];
  adsTypesLoading: boolean;
  loadAdsTypes: () => Promise<void>;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [adsTypes, setAdsTypes] = useState<AdsType[]>([]);
  const [adsTypesLoading, setAdsTypesLoading] = useState(false);

  const loadAdsTypes = useCallback(async () => {
    if (adsTypes.length > 0) return;
    setAdsTypesLoading(true);
    try {
      const data = await fetchAdsTypes();
      setAdsTypes(data);
    } finally {
      setAdsTypesLoading(false);
    }
  }, [adsTypes.length]);

  return (
    <SearchContext.Provider value={{ adsTypes, adsTypesLoading, loadAdsTypes }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}