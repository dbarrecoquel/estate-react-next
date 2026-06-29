import { Ad, AdsPage, AdsSearchParams } from "@/models/ads/ads.model";
import { AdsType } from "@/models/ads/ads-type.model";

const API_BASE = "http://localhost:8082/api";

export async function fetchAds(params : AdsSearchParams = {}) : Promise<AdsPage> {

    const query = new URLSearchParams();

    if (params.page !== undefined) query.set("page", String(params.page));
    if (params.size !== undefined) query.set("size", String(params.size));
    if (params.search) query.set("search", params.search);
    if (params.minPrice !== undefined) query.set("minPrice", String(params.minPrice));
    if (params.maxPrice !== undefined) query.set("maxPrice", String(params.maxPrice));
    if (params.rooms !== undefined) query.set("rooms", String(params.rooms));
    if (params.adsType !== undefined) query.set("adsType", String(params.adsType));
    if (params.sortBy) query.set("sortBy", params.sortBy);
    
    const res = await fetch(`${API_BASE}/ads?${query.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Erreur lors du chargement des annonces");
    return res.json();

}

export async function fetchAdById(id : number) : Promise<Ad>{
    const res = await fetch(`${API_BASE}/ads/${id}`, {cache :"no-store"});
    if (!res.ok) throw new Error("Annonce introuvable");
    return res.json();
}

export async function fetchAdsTypes() : Promise<AdsType[]>{
       const res = await fetch(`${API_BASE}/adstypes`, {cache :"no-store"});
    if (!res.ok) throw new Error("Erreur lors du chargement des types");
    return res.json();
}
