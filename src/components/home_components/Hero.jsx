import Button from "../reusable_components/Buttons";

const Hero = () => {
  return (
    <>
      <section>
        <section>
          <h2>
            Discover Unique, Handcrafted Pieces from Real Artisans Near You.
          </h2>
          <p>
            For shoppers who value authenticity, connect with trusted artisans
            and explore quality handmade products you'll love.
          </p>
          <div>
            <Button>Shop Now</Button>
            <Button>Become a seller</Button>
          </div>
        </section>

        <div>
          <div>
            <img src="white-shoe-standing.png" alt="White shoe image" />
            <img src="talking-drum-trim.png" alt="Talking drum image" />
          </div>
          <div>
            <img src="ankara-group.png" alt="White shoe image" />
            <div>
              <img src="faces_different.png" alt="Sponsors images" />
              <p>
                <span>1000+</span>
                <span>Items sold out</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
