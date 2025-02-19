import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const WorkLife = () => {
  const initiatives = [
    {
      id: 1,
      title: "Flexible Work Hours",
      description:
        "We offer flexible work hours to help employees manage their personal and professional commitments effectively.",
      icon: "🕒", // You can replace this with an actual icon or image
    },
    {
      id: 2,
      title: "Remote Work Options",
      description:
        "Employees have the option to work remotely, allowing them to create a comfortable and productive work environment.",
      icon: "🏡", // You can replace this with an actual icon or image
    },
    {
      id: 3,
      title: "Wellness Programs",
      description:
        "We provide wellness programs that include fitness classes, mental health resources, and health screenings.",
      icon: "💪", // You can replace this with an actual icon or image
    },
    {
      id: 4,
      title: "Paid Time Off",
      description:
        "Our generous paid time off policy encourages employees to take breaks and recharge.",
      icon: "🌴", // You can replace this with an actual icon or image
    },
    {
      id: 5,
      title: "Employee Assistance Program",
      description:
        "We offer an Employee Assistance Program (EAP) that provides confidential support for personal and work-related issues.",
      icon: "🆘", // You can replace this with an actual icon or image
    },
    {
      id: 6,
      title: "Team Building Activities",
      description:
        "Regular team-building activities help strengthen relationships and promote a positive work environment.",
      icon: "🤝", // You can replace this with an actual icon or image
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 px-4">
      <div className="mxw mx-auto text-center">
        <div className="md:mb-10 mb-5">
          <SectionHeader
            title={"Work-Life Balance Initiatives"}
          ></SectionHeader>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
            >
              <div className="text-4xl mb-4">{initiative.icon}</div>
              <h3 className="text-xl dark:text-gray-200 font-semibold text-gray-800 mb-2">
                {initiative.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{initiative.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkLife;
