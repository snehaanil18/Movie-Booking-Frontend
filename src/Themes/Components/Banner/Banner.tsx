"use client";
import React, { useEffect, useState } from 'react';
import img1 from '../../Images/movie1.jpg';
import img2 from '../../Images/movie2.jpg';
import img3 from '../../Images/godz.jpg'
import { bannerData } from '@/Utils/Models/banner';
import Image from 'next/image';
import styles from './banner.module.css';

function Banner() {
    const [activeSlide, setActiveSlide] = useState(0);

    const banner: bannerData[] = [
        { id: "slide1", src: img1 },
        { id: "slide2", src: img2 },
        { id: "slide3", src: img3 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % banner.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [banner.length]);

    return (
        <div className={styles.bannerContainer}>
            {banner.map((item, index) => (
                <div
                    key={item.id}
                    className={`${styles.slide} ${index === activeSlide ? styles.active : ''}`}
                >
                    <Image src={item.src} alt='' fill className={styles.bannerImage} />
                </div>
            ))}
            <div className={styles.indicators}>
                {banner.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ''}`}
                        onClick={() => setActiveSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner;
