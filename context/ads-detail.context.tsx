"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Ad } from "@/models/ads/ads.model";
import { fetchAdById } from "@/lib/api";

interface AdDetailContextValue {
    ad : Ad | null;
    loading : boolean;
    error : string | null;
    loadAd : (id : number) => Promise<void>;
}

const AdDetailContext = createContext<AdDetailContextValue | undefined>(undefined);

export function AdDetailProvider({children} : {children : ReactNode}){
    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadAd = useCallback(async (id : number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAdById(id);
            setAd(data);
        }
        catch(err){
            setError(err instanceof Error ? err.message : "Erreur inconnu");
        }
        finally {
            setLoading(false);
        }
    },[]);

    return (
        <AdDetailContext.Provider value ={{ ad, loading, error, loadAd}}>
            {children}
        </AdDetailContext.Provider>
    )
}

export function useAdDetail(){
    const ctx = useContext(AdDetailContext);
    if (!ctx) throw new Error("useDetail must be used within AdDetailProvider")
    return ctx;
}