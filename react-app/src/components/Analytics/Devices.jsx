import React from "react";

const Devices = () => {
    return (
        <div className="border rounded-2xl p-6">
            <h2 className="text-[22px] font-bold mb-12">Device Category</h2>
            <div className="flex justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-[#F2F1FF] w-[44px] h-[44px] rounded-lg flex items-center justify-center">
                        <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.198 7.50342V19.5034C20.198 24.3034 18.998 25.5034 14.198 25.5034H6.99805C2.19805 25.5034 0.998047 24.3034 0.998047 19.5034V7.50342C0.998047 2.70342 2.19805 1.50342 6.99805 1.50342H14.198C18.998 1.50342 20.198 2.70342 20.198 7.50342Z" stroke="#C60C0D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.9973 5.70337H8.19727" stroke="#C60C0D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.5963 22.0235C11.6236 22.0235 12.4563 21.1907 12.4563 20.1635C12.4563 19.1362 11.6236 18.3035 10.5963 18.3035C9.56908 18.3035 8.73633 19.1362 8.73633 20.1635C8.73633 21.1907 9.56908 22.0235 10.5963 22.0235Z" stroke="#C60C0D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <span className="text-[16px] text-[#000000] font-[400]">Mobile</span>
                </div>
                <span className="text-[18px] font-extrabold text-[#0A2A8D]">96.42%</span>
            </div>
            <div className="flex justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-[#F2F1FF] w-[44px] h-[44px] rounded-lg flex items-center justify-center">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.44 2.50354H17.55C21.11 2.50354 22 3.39354 22 6.94354V13.2735C22 16.8335 21.11 17.7135 17.56 17.7135H6.44C2.89 17.7235 2 16.8335 2 13.2835V6.94354C2 3.39354 2.89 2.50354 6.44 2.50354Z" stroke="#C60C0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 17.723V22.503" stroke="#C60C0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 13.5033H22" stroke="#C60C0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.5 22.5033H16.5" stroke="#C60C0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <span className="text-[16px] text-[#000000] font-[400]">Desktop</span>
                </div>
                <span className="text-[18px] font-extrabold text-[#0A2A8D]">2.76%</span>
            </div>
            <div className="flex justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-[#F2F1FF] w-[44px] h-[44px] rounded-lg flex items-center justify-center">
                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 6.50342V16.5034C21 20.5034 19.75 21.5034 14.75 21.5034H7.25C2.25 21.5034 1 20.5034 1 16.5034V6.50342C1 2.50342 2.25 1.50342 7.25 1.50342H14.75C19.75 1.50342 21 2.50342 21 6.50342Z" stroke="#C60C0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M13.5 17.5034H8.5" stroke="#C60C0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <span className="text-[16px] text-[#000000] font-[400]">Tablet</span>
                </div>
                <span className="text-[18px] font-extrabold text-[#0A2A8D]">0.82%</span>
            </div>
        </div>
    );
};

export default Devices;
