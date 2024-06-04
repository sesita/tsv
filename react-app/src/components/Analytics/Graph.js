import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
    responsive: true,
};

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July"];

// Function to generate an array of days for the current month
const getDaysInCurrentMonth = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const Graph = () => {
    const [labels, setLabels] = useState(weekDays);

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: "Views",
                data: new Array(labels.length).fill(0).map(() => Math.floor(Math.random() * 100)),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        switch (value) {
            case "thisWeek":
                setLabels(weekDays);
                break;
            case "lastWeek":
                setLabels(weekDays); // Assuming the same labels for simplicity
                break;
            case "thisMonth":
                setLabels(getDaysInCurrentMonth());
                break;
            case "lastMonth":
                setLabels(getDaysInCurrentMonth()); // Simplified assumption
                break;
            case "last3Months":
                setLabels(["April", "May", "June"]); // Example labels for the last 3 months
                break;
            case "last6Months":
                setLabels(["January", "February", "March", "April", "May", "June"]); // Example labels for the last 6 months
                break;
            default:
                setLabels(weekDays);
        }
    };

    return (
        <div className="border rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-black">Video Views</h3>
                <select onChange={handleSelectChange} className="text-[#0A2A8D] bg-[#F6F6F6] py-3 px-4 rounded-lg border outline-none font-bold text-[14px]">
                    <option value="thisWeek">This week</option>
                    <option value="lastWeek">Last week</option>
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="last3Months">Last 3 Months</option>
                    <option value="last6Months">Last 6 Months</option>
                </select>
            </div>
            <Line options={options} data={data} width={100} height={50} />
        </div>
    );
};

export default Graph;
