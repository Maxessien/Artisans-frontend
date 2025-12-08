import { FaStar } from "react-icons/fa";
import { homeSectionPadding } from "./AboutUs";

const Testimonials = ()=> {
  const testimonials = [
    {
      name: "Sarah Michelle",
      location: "Lagos, Nigeria",
      review:
        "I love how unique the pieces are! The quality is way better than what I see in regular stores. Delivery was fast too.",
    },
    {
      name: "Grace Oluwakemi",
      location: "Abuja, Nigeria",
      review:
        "I bought a handmade leather bag and it was worth every naira. The craftsmanship is insane. I’ll definitely shop again.",
    },
    {
      name: "Damola Ogundiran",
      location: "Portharcourt, Nigeria",
      review:
        "Customer support responded immediately when I had questions. Smooth experience from start to finish.",
    },
  ];

  return (
    <section className={`w-full ${homeSectionPadding} bg-[var(--text-secondary-light)]`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-2xl font-normal mb-5">
          What Our <span className="text-[var(--main-primary)]">Client Says</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              {/* Profile */}
              <div className="flex items-center justify-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>

                <div>
                  <h3 className="text-lg text-[var(--text-primary)] font-semibold">{item.name}</h3>
                  <p className="text-sm text-[var(--main-secondary)]">{item.location}</p>
                </div>
              </div>

              {/* Review */}
              <p className="text-[var(--text-primary)] leading-relaxed mb-4">
                {item.review}
              </p>

              {/* Rating */}
              <div className="flex gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} size={18} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials