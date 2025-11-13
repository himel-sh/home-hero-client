import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://home-hero-server-zeta.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
