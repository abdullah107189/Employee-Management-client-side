import { FaUsers, FaChartLine, FaClipboardList } from "react-icons/fa";
const Banner = () => {
  return (
    <section
      className="relative sBg w-full flex items-center justify-center  min-h-[30vh] md:min-h-[40vh] xl:min-h-[70vh] bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/work-anniversary-concept-illustration_114360-7791.jpg?t=st=1737214731~exp=1737218331~hmac=a489219c6a4e775751241a1ee87bbc603ac2a80b0b123a14409aff6fd7c90a4f&w=1060)",
      }}
    >
      <div className="absolute bg-black/60  inset-0"></div>
      <div className=" text-white z-20 flex flex-col justify-center items-center text-center md:p-8 p-2">
        <h1 className="text-2xl text-white md:text-5xl font-bold z-30 mb-4">
          Empowering Your Workforce for Success
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl z-20">
          Streamline your employee management processes and unlock your
          team&apos;s full potential with our innovative solutions designed for
          modern workplaces.
        </p>
        <div className="flex justify-center gap-2 mb-5 z-10">
          <a href="#get-started" className="activeActionBtn !bg-blue-400/60 !text-white">
            Get Started
          </a>

          <a href="#learn-more" className="activeActionBtn">
            Learn More
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="bg-blue-500/20 backdrop-blur-sm md:p-6 p-2 md:flex  hidden rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
            <FaUsers className="pText text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Employee Engagement</h3>
            <p className="text-gray-300 text-center">
              Foster a culture of engagement and collaboration with tools that
              empower your team.
            </p>
          </div>
          <div className="bg-blue-500/20 backdrop-blur-sm md:p-6 p-2 md:flex  hidden rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
            <FaChartLine className="pText text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Performance Tracking</h3>
            <p className="text-gray-300 text-center">
              Monitor and enhance employee performance with real-time analytics
              and feedback.
            </p>
          </div>
          <div className="bg-blue-500/20 backdrop-blur-sm md:p-6 p-2 md:flex  hidden rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
            <FaClipboardList className="pText text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Streamlined Processes</h3>
            <p className="text-gray-300 text-center">
              Simplify HR tasks with automated workflows and easy-to-use
              management tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
