"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useAdDetail } from "@/context/ads-detail.context";
import styles from "./page.module.css";
import ImageCarousel from "@/components/images/image.carousel";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

const TYPE_COLORS: Record<string, string> = {
  Appartement: "#3B82F6",
  Maison: "#10B981",
  Studio: "#8B5CF6",
};

export default function AdDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { ad, loading, error, loadAd } = useAdDetail();

  useEffect(() => {
    loadAd(Number(id));
  }, [id, loadAd]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSkeleton} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <span>⚠️</span>
        <p>{error}</p>
        <Link href="/" className={styles.backLink}>← Retour aux annonces</Link>
      </div>
    );
  }

  if (!ad) return null;

  const typeColor = TYPE_COLORS[ad.adsTypeDto.name] ?? "#64748B";

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>← Retour aux annonces</Link>

      <div className={styles.card}>
        <div className={styles.imageBanner}>
          <span className={styles.typeBadge} style={{ backgroundColor: typeColor }}>
            {ad.adsTypeDto.name}
          </span>
           <ImageCarousel images={ad.images ?? []} alt={ad.name} />
        </div>

        <div className={styles.content}>
          <div className={styles.topRow}>
            <div>
              <h1 className={styles.title}>{ad.name}</h1>
              <p className={styles.updatedAt}>Publié le {formatDate(ad.createdAt)}</p>
            </div>
            <div className={styles.priceBox}>
              <span className={styles.price}>{formatPrice(ad.price)}</span>
              <span className={styles.pricePerM2}>{formatPrice(ad.price / ad.surface)}/m²</span>
            </div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statIcon}>📐</span>
              <div>
                <span className={styles.statValue}>{ad.surface} m²</span>
                <span className={styles.statLabel}>Surface</span>
              </div>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>🛏</span>
              <div>
                <span className={styles.statValue}>{ad.rooms}</span>
                <span className={styles.statLabel}>Pièce{ad.rooms > 1 ? "s" : ""}</span>
              </div>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>🏷️</span>
              <div>
                <span className={styles.statValue}>{ad.adsTypeDto.name}</span>
                <span className={styles.statLabel}>Type</span>
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.descriptionText}>{ad.description}</p>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>Réf. #{ad.id}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaItem}>Mis à jour le {formatDate(ad.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}