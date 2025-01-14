import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import employee2 from '../../../../assets/employee2.svg'
import logo from '../../../../assets/usersLogo.png'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

const Register = () => {
    const [imageInfo, setImageInfo] = useState({
        url: '',
        name: ''
    })
    const [imageNotFound, setImageNotPound] = useState(true)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log('data');
        console.log(imageInfo?.url);
        if (imageInfo?.url === '') {
            console.log('object');
            return setImageNotPound(imageNotFound === false)
        }
        console.log('hello');
        // if (p.length < 8) {
        //     errors.push("Your password must be at least 8 characters");
        // }
        // if (p.search(/[a-z]/i) < 0) {
        //     errors.push("Your password must contain at least one letter.");
        // }
        // if (p.search(/[0-9]/) < 0) {
        //     errors.push("Your password must contain at least one digit.");
        // }
        console.log(data);
    }

    return (
        <div className="flex items-center justify-center mt-2 minH">
            {/* Left Side Image */}
            <div className="md:w-1/2 hidden md:flex m-auto bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600')" }}>
                <img className='md:w-full w-4/5 mx-auto' src={employee2} alt="" />
            </div>

            {/* Right Side Form */}
            <div className="md:w-2/3 w-full flex items-center justify-center sBg px-4">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white lg:p-8 p-2 rounded-lg shadow-lg lg:w-3/4 w-full overflow-hidden">
                    <h2 className="text-2xl font-bold text-center mb-4 pText">Create an Account</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">User Name</label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <FaUser className="ml-2 text-gray-500" />
                            <input
                                type="text"
                                id="username"
                                name="name"
                                {...register("name", { required: true })}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="Enter your username"
                            />
                        </div>
                        {errors.name?.type === 'required' && <p className='text-red-400'>User Name is required</p>}
                    </div>

                    <label className="block text-gray-700 mb-2" htmlFor="">Set Your Photo</label>
                    <div className=' border border-gray-300 relative rounded p-1'>
                        <div className=" flex items-center justify-between gap-5">
                            <div className="w-full">
                                <div className=" flex items-center w-full rounded">
                                    <input
                                        type="file"
                                        id="photoInput"
                                        name="photoUrl"
                                        className="hidden"
                                        accept='image/*'
                                        {...register('photoUrl',
                                            onchange = (e) => {
                                                setImageInfo({
                                                    url: URL.createObjectURL(e.target?.files[0]),
                                                    name: e.target.files[0].name
                                                });
                                                setImageNotPound(true)
                                            }
                                        )}
                                    />
                                    <label
                                        htmlFor='photoInput'
                                        type="button"
                                        className="actionBtn w-full flex-1 text-center flex items-center justify-center gap-3"
                                    >

                                        <FaFile className="ml-2 text-gray-500" /> Upload Photo
                                    </label>
                                </div>
                            </div>
                            {imageInfo?.url && <p onClick={() => setImageInfo({ url: '', name: '' })} className='sBg p-1 rounded-full hover:pBg hover:text-white transform duration-300 absolute -right-3 -top-3'><MdClose></MdClose></p>}
                            <div className="avatar">
                                <div className="w-24">
                                    <img className='rounded-full' src={imageInfo?.url || logo} alt="" />

                                </div>
                            </div>
                        </div>

                        <p className={`${imageNotFound === true ? 'hidden' : 'flex'} text-red-400`}>Your Photo is required</p>
                        {imageInfo?.name && <p className='text-blue-400 mb-2 '>{imageInfo.name}</p>}
                    </div>

                    <div className="my-4 ">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <FaEnvelope className="ml-2 text-gray-500" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                {...register('email', { required: true })}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email?.type === 'required' && <p className='text-red-400'>User Name is required</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <FaLock className="ml-2 text-gray-500" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                {...register('password', { required: true })}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>
                        {
                            errors.password?.type === 'required' && <p className='text-red-400'>Password is required</p>
                        }
                    </div>
                    <button type="submit" className="actionBtn w-full m-0 text-center">Register</button>
                    <p className="text-center mt-4">
                        Already have an account? <Link to={'/login'} className="pText font-semibold">Login</Link>
                    </p>
                    <div className='divider w-5/6 mx-auto'></div>
                    <button type="submit" className="actionBtn w-full text-center flex items-center justify-center gap-3"><FaGoogle className='w-6 h-6' />Google</button>
                </form>
            </div>
        </div >
    );
};

export default Register;