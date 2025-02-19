import SectionHeader from "../../../component/SectionHeader/SectionHeader";

const Admin = () => {
  return (
    <div className="bg-gray-100 md:py-10 py-5 dark:bg-gray-900 min-h-screen">
      <div className=" text-center">
       <div className="md:mb-10">
        <SectionHeader title={" Admin Dashboard"}></SectionHeader>
       </div>
        <p className="text-lg dark:text-gray-200 text-gray-600 mb-8">
          Oversee the entire system, manage users, and configure settings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
              {" "}
              User Management
            </h2>
            <p className="dark:text-gray-200 text-gray-600">
              Add, remove, and manage user accounts with ease.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              System Configuration
            </h2>
            <p className="text-gray-600 dark:text-gray-200">
              Adjust system settings to meet organizational needs.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Analytics Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-200">
              View comprehensive analytics to make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
