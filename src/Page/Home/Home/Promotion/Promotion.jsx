import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const Promotion = () => {
  const promotions = [
    {
      id: 1,
      name: "BambooHR",
      logo: "https://play-lh.googleusercontent.com/c4BW9wr_QAiIeVBYHhP7rs06w99xJzxgLvmL5I1mkucC3_ATMyL1t7Doz0_LQ0X-qS0",
      link: "https://www.bamboohr.com/",
    },
    {
      id: 2,
      name: "Gusto",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Gusto%2C_Inc._logo.svg",
      link: "https://gusto.com/",
    },
    {
      id: 3,
      name: "Workday",
      logo: "https://etimg.etb2bimg.com/photo/94364429.cms",
      link: "https://www.workday.com/",
    },
    {
      id: 4,
      name: "ADP",
      logo: "https://wfsaustralia.com/wp-content/uploads/2024/09/ADP_600x600.png",
      link: "https://www.adp.com/",
    },
    {
      id: 5,
      name: "Zenefits",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjlmbl6haAovPR12HxzoKB1JPv85_wBDGUg&s",
      link: "https://www.zenefits.com/",
    },
    {
      id: 6,
      name: "Paychex",
      logo: "https://i.pcmag.com/imagery/reviews/06GBw0rZbfZuFQWrQKzg0GB-3..v1569480022.jpg",
      link: "https://www.paychex.com/",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="mxw mx-auto px-4 text-center">
        <div className="md:mb-10 mb-5">
          <SectionHeader title={"Our Promotions"}></SectionHeader>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <a
                href={promotion.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={promotion.logo}
                  alt={promotion.name}
                  className="w-full h-32 object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
                    {promotion.name}
                  </h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotion;
