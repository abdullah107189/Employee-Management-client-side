import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const Slider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Arif Hossain",
      position: "Owner, Dhaka Traders",
      feedback:
        "Brother, their service is amazing. They deliver on time and maintain quality. You don’t need to worry about their work!",
      image:
        "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png",
    },
    {
      id: 2,
      name: "Sharmin Akter",
      position: "Manager, Chattogram Solutions",
      feedback:
        "Honestly speaking, I am very happy. They respond quickly and solve any problem without hassle.",
      image:
        "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png",
    },
    {
      id: 3,
      name: "Rafiq Rahman",
      position: "Developer, Rajshahi IT",
      feedback:
        "After working with this team, I realized they are truly professional. Their work is impressive, and you won’t regret trying them.",
      image:
        "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png",
    },
    {
      id: 4,
      name: "Mita Sultana",
      position: "HR Head, Sylhet Solutions",
      feedback:
        "We had a big project done by this team, and they performed excellently. I highly recommend them to everyone!",
      image:
        "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png",
    },
    {
      id: 5,
      name: "Kamrul Islam",
      position: "Entrepreneur, Barisal Ventures",
      feedback:
        "What can I say, brother? This team truly values their customers. They reduced all my stress with their smooth workflow.",
      image:
        "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png",
    },
    {
      id: 6,
      name: "Fatema Begum",
      position: "Founder, Rangpur Startups",
      feedback:
        "If you need hassle-free service, choose this team. They don’t give excuses; they just get the job done.",
      image:
        "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png",
    },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-6 text-center">
        <div className="my-10">
          <SectionHeader title="What Our Clients Say"></SectionHeader>
        </div>
        <p className="text-gray-600 mt-4">
          Hear from some of our satisfied clients about their experience with
          us.
        </p>

        <div className="mt-10">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-10"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 text-left max-w-xs mx-auto">
                  <FaQuoteLeft className="text-3xl text-blue-500 mb-4" />
                  <p className="text-gray-600 italic h-24 overflow-hidden">
                    {testimonial.feedback}
                  </p>
                  <div className="flex items-center mt-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 object-cover rounded-full mr-4 border border-gray-300"
                    />
                    <div>
                      <h3 className="text-gray-800 font-bold">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Slider;
