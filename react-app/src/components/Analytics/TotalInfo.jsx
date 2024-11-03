import NumberFormatter from "../Common/FormatNumber";

const TotalInfo = ({ info }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 rounded-2xl p-8 mb-6 border-b">
            <div>
                <h5 className="text-black font-medium text-[16px]">
                    Total Video Views
                </h5>
                <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                    <NumberFormatter value={info?.views} />
                </h2>
                <p className="text-[#071148] text-[14px] font-[400]">
                    {new Date(info?.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    <span className="mx-2">-</span>
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
            </div>
            <div>
                <h5 className="text-black font-medium text-[16px]">Total Comments</h5>
                <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                    <NumberFormatter value={info?.comments_count} />
                </h2>
                <p className="text-[#071148] text-[14px] font-[400]">
                    {new Date(info?.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    <span className="mx-2">-</span>
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
            </div>
            <div>
                <h5 className="text-black font-medium text-[16px]">Total Like</h5>
                <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                    <NumberFormatter value={info?.likes} />
                </h2>
                <p className="text-[#071148] text-[14px] font-[400]">
                    {new Date(info?.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    <span className="mx-2">-</span>
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
            </div>
            <div>
                <h5 className="text-black font-medium text-[16px]">Total Share</h5>
                <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                    <NumberFormatter value={info?.shares} />
                </h2>
                <p className="text-[#071148] text-[14px] font-[400]">
                    {new Date(info?.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    <span className="mx-2">-</span>
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
            </div>
        </div>
    );
};

export default TotalInfo;
