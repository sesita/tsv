import { useEffect } from "react";
import { BsArrowLeft, BsGoogle, BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Signin = () => {
    const navigate = useNavigate();
    const params = useParams();
    const router = useLocation();

    const { login, currentUser, setUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
        if (params?.social) {
            axios.post(`/Auth/Social/${params.social}/Callback${router?.search}`).then((response) => {
                if (response.data?.access_token) {
                    localStorage.setItem("accessToken", response.data.access_token);
                    setUser(response.data.access_token);
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }
            });
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password || email === "" || password === "") {
            toast.error("All field are required!");
        } else {
            const res = await login({ email, password });
            if (res.data.status !== "error") {
                toast.success("Login successfully");
                navigate("/");
            } else {
                toast.error(res?.data?.message);
            }
        }
    };

    return (
        <>
            <section className="min-h-screen h-full w-full bg-[#E3EAFF]">
                <div className="container mx-auto px-2 pt-5 pb-20 flex flex-col min-h-screen gap-5">
                    <div className="flex justify-between items-center gap-5 mb-3">
                        <BsArrowLeft
                            className="text-5xl text-[#C60C0D] cursor-pointer"
                            onClick={() => navigate(-1)}
                        />
                        <Link to="/">
                            <img
                                src="/logo.png"
                                alt=""
                                className="w-54 h-24 object-contain"
                            />
                        </Link>
                        <span></span>
                    </div>
                    <div className="bg-white md:rounded-3xl rounded-xl flex justify-between max-h-[700px]">
                        <div className="mx-auto my-auto py-5 md:px-7 px-2">
                            <div className="flex flex-col gap-6">
                                <h2 className="text-center md:text-5xl text-2xl font-bold text-[#C60C0D]">
                                    Account Login
                                </h2>
                                <div className="flex gap-3 justify-center">
                                    <a
                                        href="https://mytsv.com/api/Auth/Social/Google/Redirect"
                                        className="border-[1px] border-red-700 rounded-full md:w-11 w-8 md:h-11 h-8 flex items-center justify-center"
                                    >
                                        <BsGoogle className="text-[#C60C0D] md:text-2xl text-md" />
                                    </a>
                                    <a
                                        href="https://mytsv.com/api/Auth/Social/Facebook/Redirect"
                                        className="border-[1px] border-red-700 rounded-full md:w-11 w-8 md:h-11 h-8 flex items-center justify-center"
                                    >
                                        <FaFacebookF className="text-[#C60C0D] md:text-2xl text-md" />
                                    </a>
                                    <a
                                        href="https://mytsv.com/api/Auth/Social/twitter/Redirect"
                                        className="border-[1px] border-red-700 rounded-full md:w-11 w-8 md:h-11 h-8 flex items-center justify-center"
                                    >
                                        <BsTwitterX className="text-[#C60C0D] md:text-2xl text-md" />
                                    </a>
                                </div>
                                <p className="text-center capitalize">
                                    or use your email for login:
                                </p>
                                <form
                                    method="post"
                                    className="flex flex-col gap-3 md:w-[400px] w-full"
                                    onSubmit={(e) => handleLogin(e)}
                                >
                                    <input
                                        type="email"
                                        className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-3 md:px-4 px-2 md:text-md text-xs w-full"
                                        placeholder="Email"
                                        name="email"
                                    />
                                    <input
                                        type="password"
                                        className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-3 md:px-4 px-2 md:text-md text-xs w-full"
                                        placeholder="Password"
                                        name="password"
                                    />
                                    <button
                                        className="w-full md:py-3 py-2 md:px-4 px-2 md:text-md text-sm rounded-full bg-[#C60C0D] text-white font-semibold"
                                        type="submit"
                                    >
                                        Sign In
                                    </button>
                                    <span className="md:text-md text-xs">
                                        Need an account?{" "}
                                        <Link
                                            to="/Auth/Register"
                                            className="text-[#C60C0D] font-semibold"
                                        >
                                            Register here.
                                        </Link>
                                    </span>
                                </form>
                            </div>
                        </div>
                        <div className="md:w-5/12 w-3/12">
                            <img
                                src={require("../../assets/img/Login.png")}
                                alt=""
                                className="w-full h-full object-cover md:rounded-r-3xl rounded-r-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signin;
