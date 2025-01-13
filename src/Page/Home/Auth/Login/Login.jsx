import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import employee from '../../../../assets/employee1.svg'
const Login = () => {
    // State to hold input values
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // You can add your form submission logic here
    };

    return (
        <div className="flex h-screen">
            {/* Left Side Image */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600')" }}>
                {/* You can replace the URL with your own image */}
            </div>

            {/* Right Side Form */}
            <div className="w-1/2 flex items-center justify-center sBg">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-3/4">
                    <h2 className="text-2xl font-bold text-center mb-6 pText">Login to Your Account</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <FaUser className="p-2 text-gray-500" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <FaLock className="p-2 text-gray-500" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <button type="submit" className="actionBtn w-full text-center">Login</button>
                    <p className="text-center mt-4">
                        Don&apos;t have an account? <Link to={'/register'} className="pText font-semibold">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;