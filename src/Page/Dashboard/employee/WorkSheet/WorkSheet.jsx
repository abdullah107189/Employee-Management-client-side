import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import Swal from "sweetalert2";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const WorkSheet = () => {
  const [showModal, setShowModal] = useState({ isOpen: false, sheet: "" });
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const axiosSecure = useAxiosSecure();
  const {
    data: matchWorkSheetData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["workSheet"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/work-sheet/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleSubmitSheet = async (e) => {
    e.preventDefault();
    const form = e.target;
    const workPosition = form.workPosition.value;
    const hours = form.hours.value;
    if (workPosition === "Your Position") {
      return toast.error("please select work position");
    }
    // send data to db
    const sheetData = {
      work: workPosition,
      hours: hours,
      date: startDate,
      monthAndYear: format(startDate, "MMMM yyyy"),
      email: user?.email,
      name: user?.displayName,
    };
    const { data } = await axiosSecure.post("/work-sheet", sheetData);
    if (data.insertedId) {
      toast.success("Work sheet Added 👍");
    }
    e.target.reset();
    setStartDate(new Date());
    refetch();
  };

  // sheet delete
  const handleDeletSheet = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data: sheetDeleteInfo } = await axiosSecure.delete(
          `/work-sheet/${id}`
        );
        if (sheetDeleteInfo.deletedCount) {
          toast.success("sheet delete successful ");
          refetch();
        }
      }
    });
  };

  // sheet update
  const handleUpdateSheet = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const workPosition = form.workPosition.value;
    const hours = form.hours.value;
    if (workPosition === "Your Position") {
      return toast.error("please select work position");
    }
    // send data to db
    const sheetData = {
      work: workPosition,
      hours: hours,
      date: startDate,
    };
    const { data } = await axiosSecure.patch(`/work-sheet/update/${id}`, {
      updateSheet: sheetData,
    });
    if (data.matchedCount) {
      toast.success("Work sheet Updated ✔");
      refetch();
      setShowModal({ isOpen: false });
    }
  };

  return (
    <div>
      <div className="md:mb-10 mb-5">
        <SectionHeader title={" Employee Work Sheet"}></SectionHeader>
      </div>
      <form
        className="mt-2 lg:flex grid grid-cols-2 gap-2 md:text-base text-xs"
        onSubmit={handleSubmitSheet}
      >
        {/* dropdown */}
        <select
          required
          className="p-2 md:px-4 md:mr-2 outline-none rounded-full cursor-pointer dark:border-gray-700 border"
          name="workPosition"
          id=""
        >
          <option defaultValue={"Your Position"}>Your Position</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Fullstack Developer">Fullstack Developer</option>
          <option value="Software Engineer">Software Engineer</option>
        </select>

        {/* hours */}
        <input
          required
          className="p-2 md:px-4 md:mr-2 outline-none rounded-full cursor-pointer dark:border-gray-700 border"
          placeholder="enter hours number"
          type="number"
          name="hours"
          id=""
        />

        {/* date */}
        <DatePicker
          required
          className="p-2 md:px-4 md:mr-2 outline-none rounded-full w-full cursor-pointer dark:border-gray-700 border"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />

        <button className="actionBtn md:!p-2 md:!px-5 bg-white">
          Submit Sheet
        </button>
      </form>
      {/* table data  */}
      <div className="overflow-x-auto mt-5">
        <table className="table dark:border-gray-700 border">
          <thead className="">
            <tr className="p-2 pBg text-white">
              <th className="p-2 rounded-tl-lg"></th>
              <th className="p-2 ">Designation</th>
              <th className="p-2 ">Hours Worked</th>
              <th className="p-2 ">Date</th>
              <th className="p-2 ">Delete</th>
              <th className="p-2 rounded-tr-lg">Update</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              {Array.from({ length: 5 }).map((_, idx) => {
                return (
                  <tr key={idx} className="hover:bg-blue-100 dark:hover:bg-gray-800">
                    <th className="dark:border-gray-700 border p-2">
                      <p className="h-3 w-10 skeleton"></p>
                    </th>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="h-3 w-20 skeleton"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="h-3 w-20 skeleton"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="h-3 w-20 skeleton"></p>
                    </td>

                    <td className="dark:border-gray-700 border p-2 animate-pulse">
                      <div className="flex items-center justify-center ">
                        <MdDelete className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                      </div>
                    </td>
                    <td className="dark:border-gray-700 border p-2 animate-pulse">
                      <FaFilePen className="w-10 h-10 rounded-full transform duration-300 hover:bg-green-200 p-2 bg-green-100 text-green-400" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              {matchWorkSheetData?.map((sheet, idx) => (
                <tr key={sheet._id} className="hover:bg-blue-100 dark:bg-gray-800">
                  <th className="dark:border-gray-700 border p-2">{idx + 1}</th>
                  <td className="dark:border-gray-700 border p-2">
                    {sheet?.work}
                  </td>
                  <td className="dark:border-gray-700 border p-2">
                    {sheet?.hours}
                  </td>
                  <td className="dark:border-gray-700 border p-2">
                    {format(sheet?.date, "dd MMMM yyyy")}
                  </td>

                  <td className="dark:border-gray-700 border p-2 ">
                    <div className="flex items-center justify-center ">
                      <button onClick={() => handleDeletSheet(sheet?._id)}>
                        <MdDelete className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                      </button>
                    </div>
                  </td>
                  <td className="dark:border-gray-700 border p-2 ">
                    <div className="flex items-center justify-center">
                      <button
                        className=""
                        onClick={() =>
                          setShowModal(
                            { isOpen: true, sheet: sheet },
                            setStartDate(sheet.date)
                          )
                        }
                      >
                        <FaFilePen className="w-10 h-10 rounded-full transform duration-300 hover:bg-green-200 p-2 bg-green-100 text-green-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* show modal when update button click */}
      {showModal.isOpen && (
        <dialog id="my_modal_2" className="modal bg-black/40 " open>
          <div className="modal-box text-center">
            <a href="/" className="text-5xl font-bold">
              <span className="pText">As</span>Tech
            </a>
            <div className="min-h-[50vh] flex items-center  justify-center">
              <form
                className="mt-2 p-5 grid grid-cols-1 w-full gap-5 "
                onSubmit={(e) => handleUpdateSheet(e, showModal.sheet._id)}
              >
                {/* dropdown */}
                <select
                  required
                  className="p-2 px-4 mr-2 outline-none rounded-full cursor-pointer dark:border-gray-700 border dark:border-gray-700 border"
                  name="workPosition"
                  defaultValue={showModal.sheet.work}
                  id=""
                >
                  <option defaultValue={"Your Position"}>Your Position</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Fullstack Developer">
                    Fullstack Developer
                  </option>
                  <option value="Software Engineer">Software Engineer</option>
                </select>

                {/* hours */}
                <input
                  required
                  defaultValue={showModal.sheet.hours}
                  className="p-2 dark:border-gray-700 border px-4 mr-2 outline-none rounded-full cursor-pointer"
                  placeholder="enter hours number"
                  type="number"
                  name="hours"
                  id=""
                />

                {/* date */}
                <DatePicker
                  required
                  className="p-2 w-full dark:border-gray-700 border px-4 outline-none rounded-full cursor-pointer"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />

                <button className="actionBtn !p-2 !px-5">Submit Sheet</button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default WorkSheet;
