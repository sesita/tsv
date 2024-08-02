import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BsArrowLeft, BsGoogle } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const { setUser, currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        const channelName = e.target.channelName.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const checkbox = e.target.checkbox.checked;

        if (!channelName || !name || !email || !password || !confirmPassword || channelName === "" || name === "" || email === "" || password === "" || confirmPassword === "") {
            toast.error("All field are required!");
        } else {
            if (checkbox) {
                try {
                    const res = await axios.post("Auth/Register", {
                        name: channelName,
                        full_name: name,
                        email: email,
                        password: password,
                        password_confirmation: confirmPassword,
                    });

                    if (res.data?.status === "success") {
                        localStorage.setItem("accessToken", res.data?.token);
                        await setUser(res.data?.token);
                        toast.success("Successfully registered");
                        navigate("/");
                    }
                } catch (e) {
                    toast.error(e.response?.data?.message);
                }
            } else {
                toast.error("Please agree to Terms and Privacy.");
            }
        }
    };

    return (
        <>
            <section className="w-full bg-[#E3EAFF]">
                <div className="container mx-auto px-12 pt-5 pb-20 flex flex-col min-h-screen gap-5">
                    <div className="flex justify-between items-center gap-5 mb-3">
                        <BsArrowLeft className="text-5xl text-[#C60C0D] cursor-pointer" onClick={() => navigate(-1)} />
                        <Link to="/">
                            <img src="/assets/logo.png" alt="" className="w-54 h-24 object-contain" />
                        </Link>
                        <span></span>
                    </div>
                    <div className="bg-white rounded-xl flex flex-col-reverse md:flex-row justify-between">
                        <div className="mx-auto my-auto md:px-7 px-2 md:py-20 py-6">
                            <div className="flex flex-col gap-6">
                                <h2 className="text-center text-5xl font-bold text-[#C60C0D]">Create a account</h2>
                                <div className="flex gap-3 justify-center">
                                    <a href="https://mytsv.com/api/Auth/Social/Google/Redirect" className="border-[1px] border-red-700 rounded-full md:w-auto w-full md:h-auto h-full flex items-center justify-center px-4 py-2">
                                        <BsGoogle className="text-[#C60C0D] md:text-2xl text-md mr-2" />
                                        <span className="text-[#C60C0D] md:text-lg text-sm font-medium">Sign in with Google</span>
                                    </a>
                                </div>
                                <p className="text-center capitalize">or use your email for registration:</p>
                                <form className="flex flex-col gap-3 md:w-[400px] w-full" method="post" onSubmit={(e) => handleSignup(e)}>
                                    <input type="text" className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-3 md:px-4 px-2 md:text-md text-xs w-full" placeholder="Channel Name" name="channelName" />
                                    <input type="text" className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-3 md:px-4 px-2 md:text-md text-xs w-full" placeholder="Full Name" name="name" />
                                    <input type="email" className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-3 md:px-4 px-2 md:text-md text-xs w-full" placeholder="Email" name="email" />
                                    <div className="flex gap-3 md:flex-row flex-col">
                                        <input type="password" className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-3 md:px-4 px-2 md:text-md text-xs w-full" placeholder="Password" name="password" />
                                        <input type="password" className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-3 md:px-4 px-2 md:text-md text-xs w-full" placeholder="Confirm Password" name="confirmPassword" />
                                    </div>
                                    <div className="flex gap-1">
                                        <input type="checkbox" name="checkbox" id="checkbox" />
                                        <label htmlFor="checkbox" className="md:text-md text-xs">
                                            I agree to{" "}
                                            <Link to="#" className="text-[#C60C0D]">
                                                {" "}
                                                Terms and Privacy.
                                            </Link>
                                        </label>
                                    </div>
                                    <button type="submit" className="w-full md:py-3 py-2 md:px-4 px-2 md:text-md text-sm rounded-full bg-[#C60C0D] text-white font-semibold">
                                        Sign Up
                                    </button>
                                    <span className="md:text-md text-xs">
                                        Already have an account?{" "}
                                        <Link to="/Auth/Login" className="text-[#C60C0D] font-semibold">
                                            Login here.
                                        </Link>
                                    </span>
                                </form>
                            </div>
                        </div>
                        <div className="md:w-5/12 w-full pattern bg-red-900 flex flex-col justify-center items-center md:rounded-r-3xl rounded-r-xl p-6 text-white">
                            <div className="mb-10 text-center">
                                <h3 className="text-3xl font-bold mb-4">MyTSV.com</h3>
                                <p className="text-xl text-center mb-6">Meet your Town Specialists Videos</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Discover local experts</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Watch informative videos</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Connect with your community</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
