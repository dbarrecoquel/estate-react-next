"use client";

import { useRouter } from "next/navigation";
import { useAds } from "@/context/ads.context";
import styles from "./pagination.module.css";

export default function Pagination() {
  const router = useRouter();
  const { adsPage, loadAds, searchParams } = useAds();

  if (!adsPage || adsPage.totalPages <= 1) return null;

  const currentPage = adsPage.page ?? 0;
  const totalPages = adsPage.totalPages;

  const goToPage = (p: number) => {
    const newParams = { ...searchParams, page: p };
    const q = new URLSearchParams();
    q.set("page", String(p));
    if (newParams.search) q.set("name", newParams.search);
    if (newParams.adsType !== undefined) q.set("adsTypeId", String(newParams.adsType));
    if (newParams.rooms !== undefined) q.set("rooms", String(newParams.rooms));
    if (newParams.minPrice !== undefined) q.set("minPrice", String(newParams.minPrice));
    if (newParams.maxPrice !== undefined) q.set("maxPrice", String(newParams.maxPrice));
    if (newParams.sortBy) q.set("sortBy", newParams.sortBy);
    router.push(`/?${q.toString()}`);
    loadAds(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        disabled={currentPage === 0}
        onClick={() => goToPage(currentPage - 1)}
      >
        ← Précédent
      </button>
      <div className={styles.pages}>
        {pages.map((p) => (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === currentPage ? styles.active : ""}`}
            onClick={() => goToPage(p)}
          >
            {p + 1}
          </button>
        ))}
      </div>
      <button
        className={styles.btn}
        disabled={adsPage.last}
        onClick={() => goToPage(currentPage + 1)}
      >
        Suivant →
      </button>
    </div>
  );
}