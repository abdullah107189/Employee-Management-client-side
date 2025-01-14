import { FaUser, FaLock, FaEnvelope, FaFile, FaFan } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import employee2 from '../../../../assets/employee2.svg'
import logo from '../../../../assets/usersLogo.png'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, } from 'react-icons/fa';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPublic from '../../../../hooks/useAxiosPubilc';
import GoogleLogin from '../../../../component/GoogleLogin/GoogleLogin';

const Register = () => {
    const { createUser, updateImgAndName, setUser } = useAuth()
    const [firebaseLoading, setfirebaseLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [rulesOpen, setRulesOpen] = useState(false)
    const [pLength, setPLength] = useState(false)
    const [pLower, setPLower] = useState(false)
    const [pUpper, setPUpper] = useState(false)
    const [imageNotFound, setImageNotPound] = useState(true)
    const imgApiKey = import.meta.env.VITE_IMG_API_KEY;
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const [imageInfo, setImageInfo] = useState({
        url: '',
        name: '',
        file: '',
    })

    // register validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (d) => {
        if (imageInfo?.url === '') {
            return setImageNotPound(imageNotFound === false)
        }
        if (pLength === false || pLower === false || pUpper === false) {
            return toast.error('full fill password validation!')
        }

        try {
            setfirebaseLoading(true)
            const formData = new FormData();
            formData.append('image', imageInfo.file);

            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${imgApiKey}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            const liveUrl = data.data.url

            if (liveUrl) {
                createUser(d?.email, d?.password)
                    .then(() => {
                        updateImgAndName(d?.name, liveUrl)
                            .then(async () => {
                                toast.success('Account Create Success Fully Done')
                                setUser(prev => {
                                    return { ...prev, photoURL: liveUrl }
                                })
                                const userInfo = {
                                    userInfo: {
                                        name: d?.name,
                                        email: d?.email,
                                        photoUrl: liveUrl,
                                    },
                                    bankAccountNo: '',
                                    designation: '',
                                    salary: 0,
                                    isVerified: false,
                                    role: 'employee'
                                }
                                navigate('/')
                                const { data: serverError } = await axiosPublic.post('/setUser', userInfo)
                                console.log(serverError);
                                setfirebaseLoading(false)
                            })
                            .catch(error => {
                                toast.error(error.message)
                                setfirebaseLoading(false)
                            })
                    })
                    .catch(error => {
                        toast.error(error.message);
                        setfirebaseLoading(false)
                    })
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center mt-2 minH">
            {/* Left Side Image */}
            <div className="md:w-1/2 hidden md:flex m-auto bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600')" }}>
                <img className='md:w-full w-4/5 mx-auto' src={employee2} alt="" />
            </div>

            {/* Right Side Form */}
            <div className="md:w-2/3 w-full flex items-center justify-center sBg px-4">
                <div className='bg-white lg:p-8 p-2 rounded-lg shadow-lg lg:w-3/4 w-full overflow-hidden'>

                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <h2 className="text-2xl font-bold text-center  pText">Create an Account</h2>
                        <div className="mb-2">
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

                        {/* image get */}
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
                                            {...register('photoUrl')}
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    setImageInfo({
                                                        url: URL.createObjectURL(e.target?.files[0]),
                                                        name: e.target.files[0].name,
                                                        file: e.target.files[0]
                                                    });
                                                    setImageNotPound(true)
                                                }
                                            }}
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

                        {/* email part */}
                        <div className="my-2 ">
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
                            {errors.email?.type === 'required' && <p className='text-red-400'>Email is required</p>}
                        </div>

                        {/* password part */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <div className="flex items-center border border-gray-300 rounded">
                                <FaLock className="ml-2 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    {...register('password', { required: true })}
                                    onKeyUp={(e) => {
                                        const value = e.target.value;
                                        setPLength(value.length > 5)
                                        setPLower(/[a-z]/.test(value))
                                        setPUpper(/[A-Z]/.test(value))
                                    }}

                                    onInput={() => { setRulesOpen(true) }}
                                    className="flex-1 p-2 focus:outline-none"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
                                    className="mx-2 text-gray-500 focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon changes based on state */}
                                </button>
                            </div>
                            <div className={`${rulesOpen === false ? 'hidden' : 'flex flex-col'}`}>
                                <p className={`${pLength === true && 'text-green-400'} flex items-center gap-2 pt-2`} > {pLength ? <IoCheckmarkDone /> : <IoCheckmark />} at least 6 characters</p>
                                <p className={`${pLower === true && 'text-green-400'} flex items-center gap-2 pt-2`} > {pLower ? <IoCheckmarkDone /> : <IoCheckmark />} at least one lower letter</p>
                                <p className={`${pUpper === true && 'text-green-400'} flex items-center gap-2 pt-2`} > {pUpper ? <IoCheckmarkDone /> : <IoCheckmark />} at least one upper letter</p>
                            </div>
                            {
                                errors.password?.type === 'required' && <p className='text-red-400'>Password is required</p>
                            }
                        </div>
                        <button type="submit" className="actionBtn w-full m-0 text-center">
                            {
                                firebaseLoading ?
                                    <span className='animate-spin inline-block'><FaFan></FaFan></span>
                                    :
                                    <span>Register</span>

                            }
                        </button>
                        <p className="text-center mt-2">
                            Already have an account? <Link to={'/login'} className="pText font-semibold">Login</Link>
                        </p>
                        <div className='divider my-2 w-5/6 mx-auto'></div>
                    </form>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div >
        </div >
    );
};

export default Register;