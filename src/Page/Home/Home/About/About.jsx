import aboutPage from "../../../../assets/about-page.png";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
const About = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 ">
      <div className="mb-5">
        <SectionHeader title={"About Us"}></SectionHeader>
      </div>
      <div className="mxw mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:mb-0">
            <p className="text-gray-600 dark:text-gray-200 mb-4">
              We are a leading company in employee management solutions,
              dedicated to helping organizations streamline their HR processes
              and enhance employee engagement. Our mission is to create a better
              workplace for everyone.
            </p>
            <p className="text-gray-600 dark:text-gray-200 mb-4">
              With a team of experienced professionals, we provide innovative
              tools and strategies that empower businesses to manage their
              workforce effectively. Our commitment to excellence drives us to
              continuously improve and adapt to the changing needs of the
              industry.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={aboutPage} // Replace with your image URL
              alt="About Us"
              className="w-full h-auto rounded-lg "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
