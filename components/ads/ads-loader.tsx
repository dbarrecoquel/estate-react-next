"use client";

import { useEffect } from "react";
import { useAds } from "@/context/ads.context";
import { AdsSearchParams } from "@/models/ads/ads.model";

interface AdsLoaderProps {
  params: AdsSearchParams;
}

/**
 * Composant "invisible" : son seul rôle est de déclencher loadAds()
 * dans le contexte avec les params reçus du Server Component.
 * Remplace useSearchParams() côté client.
 */
export default function AdsLoader({ params }: AdsLoaderProps) {
  const { loadAds } = useAds();

  useEffect(() => {
    loadAds(params);
    // On compare via JSON pour éviter les boucles infinies sur les objets
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return null;
}