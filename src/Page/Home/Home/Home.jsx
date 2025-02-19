import Banner from "./Banner/Banner";
import Services from "./Services/Services";
import Slider from "./Slider/Slider";
import JobPostings from "./JobPostings/JobPostings";
import FAQSection from "./FAQSection/FAQSection";
import TeamSection from "./TeamSection/TeamSection";
import About from "./About/About";
import Promotion from "./Promotion/Promotion";
import News from "./News/News";
import WorkLife from "./WorkLife/WorkLife";

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <div className="md:pt-20 pt-10" id="feedback">
        <About></About>
      </div>
      <div className="md:pt-20 pt-10" id="services">
        <Services></Services>
      </div>

      <div className="md:pt-20 pt-10" id="feedback">
        <Slider></Slider>
      </div>
      <div className="md:pt-20 pt-10" id="feedback">
        <News></News>
      </div>

      <div className="md:pt-20 pt-10" id="job_posting">
        <JobPostings></JobPostings>
      </div>

      <div className="md:pt-20 pt-10" id="job_posting">
        <Promotion></Promotion>
      </div>
      <div className="md:pt-20 pt-10" id="faq">
        <FAQSection></FAQSection>
      </div>
      <div className="md:pt-20 pt-10" id="faq">
        <WorkLife></WorkLife>
      </div>
      <div className="md:pt-20 pt-10" id="our_team">
        <TeamSection></TeamSection>
      </div>
    </div>
  );
};

export default Home;
