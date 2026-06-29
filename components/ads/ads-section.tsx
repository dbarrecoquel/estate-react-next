"use client";

import { useEffect, useRef } from "react";
import AdsList from "./ads-list";
import Pagination from "@/components/pagination/pagination";
import { useAds } from "@/context/ads.context";
import { AdsSearchParams } from "@/models/ads/ads.model";

interface AdsSectionProps {
  params: AdsSearchParams;
}

export default function AdsSection({ params }: AdsSectionProps) {
  const { loadAds } = useAds();
  const initialLoadDone = useRef(false);

  useEffect(() => {
    // Charge une seule fois au montage avec les params de l'URL.
    // Les recherches suivantes sont déclenchées par SearchBar directement.
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;
    loadAds(params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AdsList />
      <Pagination />
    </>
  );
}