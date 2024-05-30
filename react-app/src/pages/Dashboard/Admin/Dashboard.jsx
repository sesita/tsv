import React from "react";
import NumberFormatter from "../../../components/Common/FormatNumber";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
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

const Dashboard = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 gap-x-8 rounded-2xl mb-12">
                <div className="border rounded-xl px-6 py-4">
                    <div className="flex justify-between font-medium ">
                        <h5 className="text-black text-[16px]">Total Videos</h5>
                        <span className="text-green-500">+1 New</span>
                    </div>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={45} />
                    </h2>
                    <a href="#" className="text-red-500 text-sm font-medium">
                        Manage Videos
                    </a>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Users</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={425645} />
                    </h2>
                    <a href="#" className="text-red-500 text-sm font-medium">
                        Manage Users
                    </a>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Views</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={3245} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        From the start
                        <span className="mx-2">-</span>
                        {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Comments</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={4356} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        From the start
                        <span className="mx-2">-</span>
                        {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
