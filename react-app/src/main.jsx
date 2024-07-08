import "./index.css";
import "animate.css";
import App from "./App";
import axios from "axios";
import ReactDOM from "react-dom/client";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import {AuthContextProvider} from "./context/AuthContext";

let url = window.location.origin + "/api";
if (import.meta.env.DEV === "development") {
	url = "https://tsv.test/api/";
}

axios.defaults.baseURL = url;
axios.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthContextProvider>
		<App />
		<ToastContainer />
	</AuthContextProvider>
);
