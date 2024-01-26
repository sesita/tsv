import React from "react";

const TotalInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 rounded-2xl shadow-xl p-8 mb-12">
      <div>
        <h5 className="text-black font-medium text-[16px]">
          Total Video Views
        </h5>
        <h2 className="text-[#0A2A8D] font-bold text-[28px]">15,00 000</h2>
        <p className="text-[#071148] text-[14px] font-[400]">
          Wed, Jul 20 - Wed, Aug 20
        </p>
      </div>
      <div>
        <h5 className="text-black font-medium text-[16px]">Total Comments</h5>
        <h2 className="text-[#0A2A8D] font-bold text-[28px]">15,000</h2>
        <p className="text-[#071148] text-[14px] font-[400]">
          Wed, Jul 20 - Wed, Aug 20
        </p>
      </div>
      <div>
        <h5 className="text-black font-medium text-[16px]">Total Like</h5>
        <h2 className="text-[#0A2A8D] font-bold text-[28px]">156k</h2>
        <p className="text-[#071148] text-[14px] font-[400]">
          Wed, Jul 20 - Wed, Aug 20
        </p>
      </div>
      <div>
        <h5 className="text-black font-medium text-[16px]">Total Share</h5>
        <h2 className="text-[#0A2A8D] font-bold text-[28px]">3,422</h2>
        <p className="text-[#071148] text-[14px] font-[400]">
          Wed, Jul 20 - Wed, Aug 20
        </p>
      </div>
    </div>
  );
};

export default TotalInfo;
