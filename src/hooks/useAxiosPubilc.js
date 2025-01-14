import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://some-domain.com/api/',
});
const useAxiosPubilc = () => {
    return axiosPublic;
};

export default useAxiosPubilc;