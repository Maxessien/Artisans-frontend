import ButtonLink from "../reusable_components/ButtonLink";

const Hero = () => {
  return (
    <>
      <section className={`flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between px-10 pb-20 lg:px-20 max-w-[${1600/16}rem] mx-auto h-max max-h-[${820/16}rem]`}>
        <section className="w-full md:w-[45%] lg:w-[45%] xl:w-[40%]">
          <h2 className="text-2xl font-medium text-[var(--text-primary-light)] md:w-[80%] lg:w-[70%] xl:w-[60%] leading-10">
            Discover Unique, Handcrafted Pieces from Real <span className="text-[var(--main-primary)]">Artisans</span> Near You.
          </h2>
          <p className="text-lg font-[400] text-[var(--main-secondary)] py-8 leading-8">
            For shoppers who value authenticity, connect with trusted artisans
            and explore quality handmade products you'll love.
          </p>
          <div className="grid grid-cols-2 gap-2 w-full">
            <ButtonLink href="/shop" width="full">Shop Now</ButtonLink>
            <ButtonLink href="/sell" width="full" type="secondary">Become a seller</ButtonLink>
          </div>
        </section>

        <div className="md:w-[50%] sm:w-[90%] w-[95%] mx-auto md:mx-0 h-full flex gap-2 justify-center items-start">
          <div className="flex flex-col gap-2 w-[50%]">
            <img className="w-full" src="designs/white-shoe-standing.png" alt="White shoe image" />
            <img className="w-full" src="designs/talking-drum-trim.png" alt="Talking drum image" />
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <img className="w-full" src="designs/ankara-group.png" alt="White shoe image" />
            <div className="w-full min-w-max md:min-w-full flex gap-2 py-4 px-3 bg-[var(--text-secondary-light)]">
              <img className="h-10" src="designs/faces_different.png" alt="Sponsors images" />
              <p className="flex flex-col gap-1 items-start">
                <span className="text-base font-semibold text-[var(--text-primary-light)]">1000+</span>
                <span className="text-sm font-normal text-[var(--main-secondary)]">Items sold out</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
