const WorkSheet = () => {
    const handleSubmitSheet = () => {

    }
    return (
        <div>
            <h1 className="text-3xl text-center">Employee Work Sheet</h1>
            <form className="" onSubmit={handleSubmitSheet}>
                dr
                <select className="p-2 outline-none rounded-full cursor-pointer" name="" id="">
                    <option value="none">None</option>
                    <option value="frontend_dev">Frontend Developer</option>
                    <option value="backend_dev">Backend Developer</option>
                    <option value="fullstack_dev">Fullstack Developer</option>
                    <option value="software_engineer">Software Engineer</option>
                </select>
            </form>
        </div>
    );
};

export default WorkSheet
