import Banner from "./Banner/Banner";
import Services from "./Services/Services";
import Slider from "./Slider/Slider";
import JobPostings from "./JobPostings/JobPostings";
import FAQSection from "./FAQSection/FAQSection";
import TeamSection from "./TeamSection/TeamSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="md:pt-20 pt-10" id="services">
        <Services></Services>
      </div>
      <div className="md:pt-20 pt-10" id="feedback">
        <Slider></Slider>
      </div>
      <div className="md:pt-20 pt-10" id="job_posting">
        <JobPostings></JobPostings>
      </div>
      <div className="md:pt-20 pt-10" id="faq">
        <FAQSection></FAQSection>
      </div>
      <div className="md:pt-20 pt-10" id="our_team">
        <TeamSection></TeamSection>
      </div>
    </div>
  );
};

export default Home;
