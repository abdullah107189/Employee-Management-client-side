/* eslint-disable react/prop-types */
const SectionHeader = ({ title }) => {
  return (
    <div className=" my-2 text-center relative z-10">
      <p className="md:text-4xl text-2xl text-center  font-bold text-blue-400">
        {title}
      </p>
      <p className="md:text-6xl text-4xl inset-0 font-extrabold -z-10 text-blue-400/10 absolute">
        {title}
      </p>
    </div>
  );
};

export default SectionHeader;
