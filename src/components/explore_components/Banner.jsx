"use client"

import ButtonLink from "../reusable_components/ButtonLink"


const Banner = () => {
  return (
    <>
    <section className="grid mt-4 relative grid-cols-2 h-max items-end px-4 py-2 w-full rounded-md bg-no-repeat bg-fixed bg-cover bg-[url('/designs/explore-page-banner.png')]">
        <section className="flex z-1 flex-col gap-2 items-start justify-start">
            <h2 className="text-xl text-[var(--text-secondary-light)] font-medium">Discover Unique Collections</h2>
            <p className="text-base text-[var(--text-secondary)] font-normal">Explore unique handcrafted pieces from talented artisans.</p>
            <ButtonLink type="secondary" href="/explore">Explore</ButtonLink>
        </section>
        <img className="w-max max-h-[80%] absolute bottom-0 right-4 z-0" src="designs/explore-banner-side-image.png" alt="Home banner side image" />
    </section>
    </>
  )
}

export default Banner