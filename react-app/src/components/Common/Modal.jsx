import { IoClose } from "react-icons/io5";

const Modal = () => {
    return (
        <div className="fixed flex items-center justify-center z-20 left-0 top-0 bottom-0 right-0">
            <div className="bg-white w-1/2 md:mt-32 p-6 rounded-3xl border mx-4 border-gray-200 shadow-[0px_0px_100px_1px_rgba(0,0,0,1)]">
                <div className="flex flex-col text-center text-2xl mb-5">
                    <IoClose className="text-3xl ml-auto" />
                    <span className="font-medium mb-10">Choose Location</span>
                    <div className="flex flex-row text-base font-medium text-center justify-center gap-4">
                        <button className="bg-white border rounded-xl px-8 py-2">Close</button>
                        <button className="bg-primary text-white rounded-xl px-8 py-2">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
