import { useContext } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsArrowLeft, BsGoogle, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (
      !name ||
      !email ||
      !password ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      toast.error("All field are required!");
    } else {
      toast.success("Login successfully");
      await login({ _id: 1234, name, email, password });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <>
      <section className="min-h-screen h-full w-full bg-[#E3EAFF]">
        <div className="container mx-auto px-2 md:px-0 py-5 flex flex-col min-h-screen gap-5">
          <div className="flex justify-between items-center gap-5">
            <BsArrowLeft
              className="text-5xl text-[#C60C0D] cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <Link to="/">
              <img src={require("../../assets/img/logo.jpg")} alt="" />
            </Link>
            <span></span>
          </div>
          <div className="flex-1 bg-white md:rounded-3xl rounded-xl flex">
            <div className="flex-1 flex items-center justify-center md:py-5 py-1 md:px-7 px-2">
              <div className="flex flex-col gap-3">
                <h2 className="text-center md:text-4xl text-2xl font-bold text-[#C60C0D]">
                  Account Login
                </h2>
                <div className="flex gap-3 justify-center">
                  <button className="border-[1px] border-[#0A2A8D] rounded-full md:w-10 w-7 md:h-10 h-7 flex items-center justify-center">
                    <BsGoogle className="text-[#C60C0D] md:text-2xl text-md" />
                  </button>
                  <button className="border-[1px] border-[#0A2A8D] rounded-full md:w-10 w-7 md:h-10 h-7 flex items-center justify-center">
                    <FaFacebookF className="text-[#C60C0D] md:text-2xl text-md" />
                  </button>
                  <button className="border-[1px] border-[#0A2A8D] rounded-full md:w-10 w-7 md:h-10 h-7 flex items-center justify-center">
                    <BsTwitter className="text-[#C60C0D] md:text-2xl text-md" />
                  </button>
                  <button className="border-[1px] border-[#0A2A8D] rounded-full md:w-10 w-7 md:h-10 h-7 flex items-center justify-center">
                    <AiFillInstagram className="text-[#C60C0D] md:text-2xl text-md" />
                  </button>
                </div>
                <p className="text-center md:text-md text-xs">
                  or use your email for login:
                </p>
                <form
                  method="post"
                  className="flex flex-col gap-3 md:w-[400px] w-full"
                  onSubmit={(e) => handleLogin(e)}
                >
                  <input
                    type="text"
                    className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-2 md:px-4 px-2 md:text-md text-xs w-full"
                    placeholder="Name"
                    name="name"
                  />
                  <input
                    type="email"
                    className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-2 md:px-4 px-2 md:text-md text-xs w-full"
                    placeholder="Email"
                    name="email"
                  />
                  <div className="flex gap-3 md:flex-row flex-col">
                    <input
                      type="password"
                      className="rounded-full border-[1px] border-[#0A2A8D52] bg-[#E3EAFF52] outline-none py-2 md:px-4 px-2 md:text-md text-xs w-full"
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <button
                    className="w-full md:py-3 py-2 md:px-4 px-2 md:text-md text-sm rounded-full bg-[#C60C0D] text-white font-semibold"
                    type="submit"
                  >
                    Login
                  </button>
                  <span className="md:text-md text-xs">
                    Need an account?{" "}
                    <Link to="/signup" className="text-[#C60C0D] font-semibold">
                      Register here.
                    </Link>
                  </span>
                </form>
              </div>
            </div>
            <div className="md:w-5/12 w-3/12">
              <img
                src={require("../../assets/img/SignupBg.png")}
                alt=""
                className="w-full h-full max-h-[665px] max-w-full object-cover md:rounded-r-3xl rounded-r-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
