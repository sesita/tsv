import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Doughnut } from "react-chartjs-2";
import { FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import NumberFormatter from "../../../components/Common/FormatNumber";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const Dashboard = () => {
    const labels = ["January", "February", "March", "April", "May", "June", "July"];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: "Likes",
                data: [20, 100, 40, 50, 80, 10, 75],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
                fill: true,
                label: "Dislikes",
                data: [4, 5, 7, 10, 8, 27, 18],
                borderColor: "red",
                backgroundColor: "red",
            },
        ],
    };
    const [stats, setStats] = useState([]);

    const fetchStats = async () => {
        try {
            const response = await axios.post("Dashboard/Admin/getStats");
            setStats(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 gap-x-8 rounded-2xl mb-12">
                <div className="border rounded-xl px-6 py-4">
                    <div className="flex justify-between font-medium ">
                        <h5 className="text-black text-[16px]">Total Videos</h5>
                        {stats.videos?.new > 0 && (
                            <div className="flex items-center gap-2 text-green-500" data-tooltip-id="new-videos">
                                <span>+{stats.videos.new} New</span>
                                <FaInfoCircle className="mt-1" />
                                <ReactTooltip id="new-videos" content="Videos of last 7 days" />
                            </div>
                        )}
                    </div>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={stats.videos?.total} />
                    </h2>
                    <Link to={"/"} className="text-red-500 text-sm font-medium">
                        Manage Videos
                    </Link>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Users</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={stats.users} />
                    </h2>
                    <Link to={"/"} className="text-red-500 text-sm font-medium">
                        Manage Users
                    </Link>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Comments</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={stats.comments} />
                    </h2>
                    <Link to={"/"} className="text-red-500 text-sm font-medium">
                        Manage Comments
                    </Link>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Views</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={stats.views} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        From the start
                        <span className="mx-2">-</span>
                        {moment().format("MMM D, YYYY")}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="col-span-1">
                    <Line data={data} width={100} height={50} />
                </div>
                <div className="col-span-1 max-h-96 flex justify-center items-center">
                    <Doughnut
                        data={{
                            labels: ["Red", "Green"],
                            datasets: [
                                {
                                    label: "# of Votes",
                                    data: [3, 19],
                                    borderColor: ["white", "white"],
                                    backgroundColor: ["red", "green"],
                                },
                            ],
                        }}
                        width={100}
                        height={20}
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
