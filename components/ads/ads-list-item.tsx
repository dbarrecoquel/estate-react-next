import Link from "next/link";
import { Ad } from "@/models/ads/ads.model";
import styles from "./ads-list-item.module.css";

interface AdsListItemProps {
  ad: Ad;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);
}
const API_BASE = "http://localhost:8082";
const TYPE_COLORS: Record<string, string> = {
  Appartement: "#3B82F6",
  Maison: "#10B981",
  Studio: "#8B5CF6",
};

export default function AdsListItem({ ad }: AdsListItemProps) {
  const typeColor = TYPE_COLORS[ad.adsTypeDto.name] ?? "#64748B";
  const mainImage = ad.images && ad.images.length > 0 ? ad.images[0] : null;
 

  return (
    <Link href={`/ads/${ad.id}`} className={styles.card}>
      <div className={styles.imagePlaceholder}>
        <span className={styles.typeBadge} style={{ backgroundColor: typeColor }}>
          {ad.adsTypeDto.name}
        </span>
                {mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${API_BASE}${mainImage.url}`}
            alt={mainImage.alt ?? ad.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.imageIcon}>🏠</div>
        )}

      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{ad.name}</h3>
        <p className={styles.description}>{ad.description}</p>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📐</span>
            {ad.surface} m²
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>🛏</span>
            {ad.rooms} pièce{ad.rooms > 1 ? "s" : ""}
          </span>
        </div>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(ad.price)}</span>
          <span className={styles.pricePerM2}>{formatPrice(ad.price / ad.surface)}/m²</span>
        </div>
      </div>
    </Link>
  );
}