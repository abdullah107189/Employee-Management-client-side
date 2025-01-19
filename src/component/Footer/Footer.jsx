import { CiUser } from "react-icons/ci";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4">
      <div className="mxw mx-auto ">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <a href="/" className="md:text-5xl text-2xl font-bold">
              <span className="pText">As</span>Tech
            </a>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#feedback" className="text-gray-400 hover:text-white">
                  Feedback
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="font-semibold">Overview</h4>
            <ul className="mt-2">
              <li>
                <a
                  href="#job_posting"
                  className="text-gray-400 hover:text-white"
                >
                  Job Posting
                </a>
              </li>
              <li>
                <a href="#our_team" className="text-gray-400 hover:text-white">
                  Our Team
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="grid grid-cols-2 gap-5 mt-2">
              <a
                href="https://www.facebook.com/abdullah.shamem.5"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah107189/"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/abdullah107189"
                className="text-gray-400 hover:text-white"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://abdullah-dev-107189.netlify.app/"
                className="text-gray-400 hover:text-white"
              >
                <CiUser className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} abdullah107189. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
