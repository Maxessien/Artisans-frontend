import ButtonLink from './../reusable_components/ButtonLink';


const AboutUs = () => {
  return (
    <>
      <section className='bg-[var(--text-secondary-light)] w-full min-w-screen flex flex-col-reverse p-10 lg:p-20 md:flex-row gap-10'>
        <img className='w-full md:w-1/2' src="designs/about-side-img.png" alt="About us side image" />
        <section className='w-full md:w-1/2'>
          <h2 className='text-2xl text-[--text-primary] w-full text-center md:text-left font-normal mb-2'>About <span className='text-[var(--main-primary)]'>Us</span></h2>
          <p className='text-lg text-[var(--main-secondary)] font-normal mb-2'>
            We are the marketplace for people who value authenticity, culture,
            and premium handmade creations. We understand how hard it is to find
            genuine African crafts with real cultural value, made by skilled
            artisans. That's why we connect you directly to talented creators
            who craft every piece with heritage, heart, and care, ensuring
            quality and fair pricing. Every purchase empowers artisans, supports
            communities, and helps preserve African craftsmanship. Join us,
            explore unique pieces, and shop with purpose.
          </p>
          <div className='flex w-full justify-center md:justify-start'>
          <ButtonLink>Explore</ButtonLink>
          </div>
        </section>
      </section>
    </>
  );
};

export default AboutUs;
