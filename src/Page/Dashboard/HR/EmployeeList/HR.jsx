import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const HR = () => {
  return (
    <div className="bg-gray-100 md:py-10 py-5 dark:bg-gray-900 min-h-screen">
      <div className="text-center">
        <div className="md:mb-10">
          <SectionHeader title={"HR Dashboard"} />
        </div>
        <p className="text-lg dark:text-gray-200 text-gray-600 mb-8">
          Manage employee records, track attendance, and generate reports.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
              Employee Records
            </h2>
            <p className="dark:text-gray-200 text-gray-600">
              Maintain and update employee records with ease.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
              Attendance Tracking
            </h2>
            <p className="dark:text-gray-200 text-gray-600">
              Track employee attendance and manage leave requests efficiently.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
              Reporting Tools
            </h2>
            <p className="dark:text-gray-200 text-gray-600">
              Generate insightful reports to analyze employee performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HR;