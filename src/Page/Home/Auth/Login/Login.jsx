import { FaUser, FaLock, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (d) => {
        console.log(d);
    };

    return (
        <div className="flex items-center justify-center mt-2 minH">
            {/* Login Form */}
            <div className="md:w-2/3 w-full flex items-center justify-center sBg px-4">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white lg:p-8 p-2 rounded-lg shadow-lg lg:w-3/4 w-full overflow-hidden">
                    <h2 className="text-2xl font-bold text-center mb-4 pText">Login to Your Account</h2>

                    {/* Email */}
                    <div className="my-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <FaUser className="ml-2 text-gray-500" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                {...register('email', { required: true })}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email?.type === 'required' && <p className='text-red-400'>Email is required</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <FaLock className="ml-2 text-gray-500" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                {...register('password', { required: true, minLength: 6 })}

                                onInput={() => { setRulesOpen(true); }}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>
                        {errors.password?.type === 'required' && <p className='text-red-400'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-400'>At least 6 characters</p>}
                    </div>

                    <button type="submit" className="actionBtn w-full m-0 text-center">Login</button>
                    <p className="text-center mt-4">
                        Don&lsquo;t have an account? <Link to={'/register'} className="pText font-semibold">Register</Link>
                    </p>
                    <div className='divider w-5/6 mx-auto'></div>
                    <button type="button" className="actionBtn w-full text-center flex items-center justify-center gap-3">
                        <FaGoogle className='w-6 h-6' /> Login with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
