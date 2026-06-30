import SearchBar from "@/components/searchbar/searchbar";
import AdsSection from "@/components/ads/ads-section";
import { AdsSearchParams } from "@/models/ads/ads.model";
import styles from "./page.module.css";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams;

  const params: AdsSearchParams = {
    page: sp.page ? Number(sp.page) : 0,
    size: 10,
    search: typeof sp.search === "string" ? sp.search : undefined,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    rooms: sp.rooms ? Number(sp.rooms) : undefined,
    adsType: sp.adsType ? Number(sp.adsType) : undefined,
    sortBy: (sp.sortBy as "price" | "rooms") ?? undefined,
    direction: (sp.direction as "ASC" | "DESC") ?? undefined
  };

  return (
    <>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Trouvez votre <span className={styles.accent}>bien idéal</span>
        </h1>
        <p className={styles.heroSub}>
          Des milliers d'annonces immobilières au meilleur prix
        </p>
      </div>

      <div className={styles.searchSection}>
        <SearchBar initialParams={params} />
      </div>

      <div className={styles.listSection}>
        <AdsSection params={params} />
      </div>
    </>
  );
}