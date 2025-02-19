import {
  FaUserTie,
  FaTasks,
  FaFileInvoiceDollar,
  FaChartLine,
} from "react-icons/fa";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaUserTie className="text-4xl text-blue-500" />,
      title: "Employee Onboarding",
      description:
        "Streamline the onboarding process with automated workflows and employee self-service.",
    },
    {
      id: 2,
      icon: <FaTasks className="text-4xl text-green-500" />,
      title: "Task Management",
      description:
        "Assign, track, and manage tasks effectively across departments.",
    },
    {
      id: 3,
      icon: <FaFileInvoiceDollar className="text-4xl text-yellow-500" />,
      title: "Payroll Management",
      description:
        "Manage payroll with accurate calculations, payment processing, and compliance handling.",
    },
    {
      id: 4,
      icon: <FaChartLine className="text-4xl text-red-500" />,
      title: "Performance Monitoring",
      description:
        "Evaluate and monitor employee performance with real-time insights and reporting.",
    },
  ];

  return (
    <section className="bg-gray-100">
      <div className="mxw px-4 mx-auto  text-center">
        <div>
          <SectionHeader title="Services"></SectionHeader>
        </div>
        <p className="text-gray-600 mt-4">
          Simplify your HR processes with our comprehensive employee management
          solutions.
        </p>
        <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">
                {service.title}
              </h3>
              <p className="text-gray-500 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
