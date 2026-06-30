import { AdsType } from "./ads-type.model";
import { Image } from "./image.model";

export interface Ad {
    id : number;
    name : string;
    description : string;
    rooms : number;
    surface : number;
    price : number;
    adsTypeDto : AdsType;
    createdAt : string;
    updatedAt : string;
    images? : Image[];
}

export interface AdsPage{
    content : Ad[];
    page : number;
    size : number;
    totalPages : number;
    totalElements : number;
    last : boolean;
}

export interface AdsSearchParams{
    page?: number;
    size?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    rooms?: number;
    adsType?: number;
    sortBy?: "price" | "rooms";
    direction?: "ASC" | "DESC";
}