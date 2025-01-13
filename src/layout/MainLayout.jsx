import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar/Navbar';
const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='mxw'>
                <Outlet></Outlet>
            </div>
            footer
        </div>
    );
};

export default MainLayout;