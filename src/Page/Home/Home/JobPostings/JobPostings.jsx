import { useState } from "react";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const JobPostings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const jobPostings = [
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      location: "Remote",
      description: "Join our team to develop cutting-edge software solutions.",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York",
      description: "Lead product development and strategy.",
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "San Francisco",
      description: "Create user-friendly designs for our applications.",
    },
    {
      id: 4,
      title: "Data Analyst",
      department: "Analytics",
      location: "Chicago",
      description: "Analyze data to drive business decisions.",
    },
    {
      id: 5,
      title: "HR Specialist",
      department: "Human Resources",
      location: "Remote",
      description: "Manage recruitment and employee relations.",
    },
  ];

  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      job.department === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mxw mx-auto px-4 dark:bg-gray-900">
      <div className="my-10">
        <SectionHeader title={"Job Postings"}></SectionHeader>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="border focus:outline-none border-gray-300 bg-transparent dark:border-gray-700 rounded p-2 mb-4 md:mb-0 w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded focus:outline-none bg-transparent dark:border-gray-700 p-2 w-full md:w-1/3 md:ml-4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Engineering</option>
          <option>Product</option>
          <option>Design</option>
          <option>Analytics</option>
          <option>Human Resources</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-400">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{job.department}</p>
            <p className="text-gray-500 dark:text-gray-200">{job.location}</p>
            <p className="text-gray-700 dark:text-gray-200 mt-2">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPostings;
