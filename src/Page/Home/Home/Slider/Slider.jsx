import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
import { useRef, useState } from "react";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Slider = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };
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
    <section className="bg-gray-100 py-10 dark:bg-gray-900">
      <div className="mxw mx-auto px-4 text-center">
        <div className="my-10">
          <SectionHeader title="What Our Clients Say"></SectionHeader>
        </div>
        <p className="text-gray-600 dark:text-gray-200 md:text-2xl mt-4">
          Hear from some of our satisfied clients about their experience with
          us.
        </p>

        <div className="mt-10">
          <Swiper
            ref={swiperRef}
            onSlideChange={handleSlideChange}
            pagination={false}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1000: { slidesPerView: 3 },
              1303: { slidesPerView: 4 },
            }}
            className="py-10"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="p-4 bg-white dark:bg-gray-800  rounded-lg shadow-md hover:shadow-lg transition duration-300 text-left max-w-xs mx-auto">
                  <FaQuoteLeft className="text-3xl text-blue-500 mb-4" />
                  <p className="text-gray-600 dark:text-gray-200 italic h-24 overflow-hidden">
                    {testimonial.feedback}
                  </p>
                  <div className="flex items-center mt-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 object-cover rounded-full dark:bg-white p-1 mr-4 border border-gray-300"
                    />
                    <div>
                      <h3 className="text-gray-800 dark:text-gray-200 font-bold">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-200 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  swiperRef.current.swiper.slideTo(index);
                  setActiveIndex(index);
                }}
                className={`mx-1 w-3 h-3 rounded-full ${
                  activeIndex === index ? "bg-blue-500 " : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-end items-center mt-3 mr-3 gap-5">
            <button onClick={() => swiperRef.current.swiper.slidePrev()}>
              <IoIosArrowDropleft className="w-10 h-10 rounded-full text-blue-400" />
            </button>
            <button onClick={() => swiperRef.current.swiper.slideNext()}>
              <IoIosArrowDropright className="w-10 h-10 rounded-full text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
