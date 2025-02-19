import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const News = () => {
  const newsUpdates = [
    {
      id: 1,
      title: "New Employee Onboarding Process",
      date: "March 15, 2023",
      description:
        "We have updated our onboarding process to enhance the experience for new hires. Check out the new resources available.",
      link: "/news/new-employee-onboarding",
    },
    {
      id: 2,
      title: "Quarterly Company Meeting",
      date: "April 10, 2023",
      description:
        "Join us for our quarterly company meeting to discuss our progress and future goals. All employees are encouraged to attend.",
      link: "/news/quarterly-meeting",
    },
    {
      id: 3,
      title: "Employee Wellness Program Launch",
      date: "April 20, 2023",
      description:
        "We are excited to announce the launch of our new employee wellness program aimed at promoting health and well-being.",
      link: "/news/wellness-program-launch",
    },
    {
      id: 4,
      title: "Diversity and Inclusion Initiatives",
      date: "May 5, 2023",
      description:
        "We are committed to fostering a diverse and inclusive workplace. Learn more about our new initiatives and how you can get involved.",
      link: "/news/diversity-inclusion",
    },
    {
      id: 5,
      title: "Annual Company Picnic",
      date: "June 15, 2023",
      description:
        "Save the date for our annual company picnic! Join us for a day of fun, food, and team-building activities.",
      link: "/news/company-picnic",
    },
  ];

  return (
    <section className="bg-gray-100 px-4">
      <div className="mxw mx-auto text-center">
        <div className="md:mb-10 mb-5">
          <SectionHeader title={"News and Updates"}></SectionHeader>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsUpdates.map((update) => (
            <div key={update.id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {update.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{update.date}</p>
              <p className="text-gray-600 mb-4">{update.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
