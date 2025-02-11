"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderStyles() {
  return (
    <style jsx global>{`
      .featured-slider {
        margin: 0 auto;
        position: relative;
      }

      .featured-slider .slick-slide {
        padding: 0 1rem;
      }

      /* Custom Dots */
      .featured-slider .custom-dots {
        position: absolute;
        bottom: -30px;
        display: flex !important;
        justify-content: center;
        width: 100%;
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center;
      }

      .featured-slider .custom-dots li {
        position: relative;
        display: inline-block;
        margin: 0 5px;
        padding: 0;
        cursor: pointer;
      }

      .featured-slider .custom-dots li button {
        font-size: 0;
        line-height: 0;
        display: block;
        width: 12px;
        height: 12px;
        padding: 5px;
        cursor: pointer;
        color: transparent;
        border: 0;
        outline: none;
        background: #0091FF;
      }

      /* Navigation Arrows */
      .featured-slider .slick-prev,
      .featured-slider .slick-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        display: flex !important;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        padding: 0;
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .featured-slider .slick-prev {
        left: 10px;
      }

      .featured-slider .slick-next {
        right: 10px;
      }

      /* Slide Animations */
      .featured-slider .slick-slide {
        opacity: 0;
        transition: all 0.5s ease;
      }

      .featured-slider .slick-slide.slick-active {
        opacity: 1;
      }

      /* Responsive Styles */
      @media (max-width: 768px) {
        .featured-slider .slick-prev,
        .featured-slider .slick-next {
          width: 30px;
          height: 30px;
        }
      }
    `}</style>
  );
}
