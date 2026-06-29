"use client";

import { useAds } from "@/context/ads.context";
import AdsListItem from "./ads-list-item";
import styles from "./ads-list.module.css";

export default function AdsList(){

    const {adsPage, loading, error} = useAds();

    if (loading){
        
        return (
            <div className={styles.stateContainer}>
                <div className={styles.skeletonGrid}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={styles.skeleton} />
                    ))}

                </div>
            </div>
        )
    }
    if (error){
        
        return (
            <div className={styles.stateContainer}>
                <div className={styles.errorBox}>
                <span className={styles.errorIcon}></span>
                <p>{error}</p>
                </div>
            </div>
        );

    }

      
    if (!adsPage || adsPage.content.length === 0) {
    
        return (
            <div className={styles.stateContainer}>
                <div className={styles.emptyBox}>
                <span className={styles.emptyIcon}>🔍</span>
                <p>Aucune annonce ne correspond à vos critères.</p>
                </div>
            </div>
         );
    }

    return (
        <div>
        <p className={styles.resultsCount}>
            {adsPage.totalElements} annonce{adsPage.totalElements > 1 ? "s" : ""} trouvée{adsPage.totalElements > 1 ? "s" : ""}
        </p>
        <div className={styles.grid}>
            {adsPage.content.map((ad) => (
            <AdsListItem key={ad.id} ad={ad} />
            ))}
        </div>
        </div>
    );
}