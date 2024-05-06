import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Statistic",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: [20, 100, 40, 50, 80, 10, 75],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Graph = () => {
  return (
    <div className="flex-[3] shadow-xl rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[22px] font-bold text-black">Video Funnel</h3>
        <select
          name=""
          id=""
          className="text-[#0A2A8D] bg-[#F6F6F6] py-3 px-8 rounded-lg shadow-lg outline-none font-bold text-[14px]"
        >
          <option value="">This week</option>
          <option value="">Last week</option>
          <option value="">This Month</option>
          <option value="">Last Month</option>
          <option value="">Last 3 Months</option>
          <option value="">Last 6 Months</option>
        </select>
      </div>
      <Line options={options} data={data} width={100} height={50} />
    </div>
  );
};

export default Graph;
