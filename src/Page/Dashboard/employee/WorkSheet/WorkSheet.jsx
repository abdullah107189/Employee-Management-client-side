import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPubilc";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { format } from "date-fns";

const WorkSheet = () => {
    const axiosPubilc = useAxiosPublic()
    const { user } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const { data: workSheetData = [], refetch } = useQuery({
        queryKey: ['work-sheet', user?.email],
        queryFn: async () => {
            const { data: getWorkSheet } = await axiosPubilc.get(`/work-sheet/${user?.email}`)
            return getWorkSheet;
        }
    })

    const handleSubmitSheet = async (e) => {
        e.preventDefault()
        const form = e.target;
        const workPosition = form.workPosition.value
        const hours = form.hours.value;
        if (workPosition === 'Your Position') {
            return toast.error('please select work position')
        }

        // send data to db
        const sheetData = {
            work: workPosition,
            hours: hours,
            date: startDate,
            email: user?.email
        }
        const { data } = await axiosPubilc.post('/work-sheet', sheetData)
        if (data.insertedId) {
            toast.success('Work sheet Added 👍')
        }
        e.target.reset()
        refetch()
    }

    return (
        <div>
            <h1 className="text-3xl text-center">Employee Work Sheet</h1>
            <form className="mt-2 flex" onSubmit={handleSubmitSheet}>
                {/* dropdown */}
                <select required className="p-2 px-4 mr-2 outline-none rounded-full cursor-pointer" name="workPosition" id="">
                    <option defaultValue={'Your Position'}>Your Position</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Fullstack Developer">Fullstack Developer</option>
                    <option value="Software Engineer">Software Engineer</option>
                </select>

                {/* hours */}
                <input required className="p-2 px-4 mr-2 outline-none rounded-full cursor-pointer" placeholder="enter hours number" type="number" name="hours" id="" />

                {/* date */}
                <DatePicker required className="p-2 px-4 outline-none rounded-full cursor-pointer" selected={startDate} onChange={(date) => setStartDate(date)} />

                <button className="actionBtn !p-2 !px-5">Submit Sheet</button>
            </form>
            <div className="overflow-x-auto mt-5">
                <table className="table border">
                    <thead className="">
                        <tr className="pBg text-white">
                            <th className="rounded-tl-lg"></th>
                            <th className="">Task</th>
                            <th className="">Hours Worked</th>
                            <th className="">Date</th>
                            <th className="">Delete</th>
                            <th className="rounded-tr-lg">Update</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            workSheetData?.map((sheet, idx) => <tr key={sheet._id} className="hover:bg-blue-100">
                                <th className="border">{idx + 1}</th>
                                <td className="border">{sheet?.work}</td>
                                <td className="border">{sheet?.hours}</td>
                                <td className="border">{format(sheet?.date, 'MMMM yyyy')}</td>
                                <td className="border">Delete</td>
                                <td className="border">Update</td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkSheet
