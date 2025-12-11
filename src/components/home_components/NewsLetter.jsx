"use client";

import { FaArrowRight } from "react-icons/fa";
import { homeSectionPadding } from "./AboutUs";

const NewsLetter = () => {
  return (
    <>
      <section
        className={`bg-[url("/designs/newsletter-bg.png")] ${homeSectionPadding} bg-center bg-no-repeat w-full min-w-screen`}
      >
        <div
          className={`w-full max-w-[640px] mx-auto flex flex-col gap-4 items-center`}
        >
          <h2 className="md:text-2xl text-xl text-[var(--text-secondary-light)] font-normal">
            Subscribe to our{" "}
            <span className="text-[var(--main-primary)]">Newsletter</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-normal">
            Be the first to know about fresh drops, exclusive offers and
            artisans highlights
          </p>
          <div className="w-full h-max relative">
            <input
              className="w-full bg-[var(--text-secondary-light)] rounded-md text-base text-[var(--text-primary)] px-3 py-2 placeholder:text-[var(--main-secondary)]"
              placeholder="Enter your email address"
              id="newsletter_email"
              type="text"
            />
            <button className="absolute top-[5px] right-2.5 px-3 py-[5px] inline-flex items-center justify-center rounded-md text-lg text-[var(--text-secondary-light)] font-medium bg-[var(--main-primary)]">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
