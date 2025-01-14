import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const WorkSheet = () => {
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmitSheet = (e) => {
        e.preventDefault()
        const form = e.target;
        const workPosition = form.workPosition.value
        const hours = form.hours.value;
        if (workPosition === 'Your Position') {
            return toast.error('please select work position')
        }
        console.log(workPosition, hours, startDate);

    }
    return (
        <div>
            <h1 className="text-3xl text-center">Employee Work Sheet</h1>
            <form className="mt-2 flex" onSubmit={handleSubmitSheet}>
                {/* dropdown */}
                <select required className="p-2 px-4 mr-2 outline-none rounded-full cursor-pointer" name="workPosition" id="">
                    <option defaultValue={'Your Position'}>Your Position</option>
                    <option value="frontend_dev">Frontend Developer</option>
                    <option value="backend_dev">Backend Developer</option>
                    <option value="fullstack_dev">Fullstack Developer</option>
                    <option value="software_engineer">Software Engineer</option>
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
                            <th className="rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr className="hover:bg-blue-100">
                            <th className="border">1</th>
                            <td className="border">Brice Swyre</td>
                            <td className="border">Tax Accountant</td>
                            <td className="border">Red</td>
                            <td className="border">Red</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkSheet
