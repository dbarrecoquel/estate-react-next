"use client";

import { useState, useCallback } from "react";
import styles from "./image.carousel.module.css";
import { Image } from "@/models/ads/image.model";

const API_BASE = "http://localhost:8082";

interface ImageCarouselProps {
  images: Image[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className={styles.placeholder}>
        <span className={styles.placeholderIcon}>🏠</span>
      </div>
    );
  }

  const current = images[activeIndex];

  return (
    <div className={styles.carousel}>
      <div className={styles.mainImageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${API_BASE}${current.url}`}
          alt={current.alt ?? alt}
          className={styles.mainImage}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className={`${styles.navBtn} ${styles.navBtnLeft}`}
              aria-label="Image précédente"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              className={`${styles.navBtn} ${styles.navBtnRight}`}
              aria-label="Image suivante"
            >
              →
            </button>
            <div className={styles.counter}>
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <button
              type="button"
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${API_BASE}${img.url}`} alt={img.alt ?? alt} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}