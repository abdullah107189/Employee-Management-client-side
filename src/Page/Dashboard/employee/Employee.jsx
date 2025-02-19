import SectionHeader from "../../../component/SectionHeader/SectionHeader";


const Employee = () => {
  return (
    <div className="bg-gray-100 md:py-10 py-5 dark:bg-gray-900 min-h-screen">
      <div className="text-center">
        <div className="md:mb-10">
          <SectionHeader title={"Employee Dashboard"} />
        </div>
        <p className="text-lg dark:text-gray-200 text-gray-600 mb-8">
          Access your profile, track your performance, and manage your tasks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
              Profile Management
            </h2>
            <p className="dark:text-gray-200 text-gray-600">
              Update your personal information and view your employment details.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
              Performance Tracking
            </h2>
            <p className="dark:text-gray-200 text-gray-600">
              Monitor your performance metrics and receive feedback from your
              manager.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
              Task Management
            </h2>
            <p className="dark:text-gray-200 text-gray-600">
              Manage your tasks and deadlines effectively to stay on top of your
              work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
