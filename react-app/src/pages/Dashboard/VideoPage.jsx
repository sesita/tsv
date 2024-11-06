import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import VideoUploadForm from '../../components/Dashboard/VideoUploadForm';
import { MdOutlineVideoSettings } from 'react-icons/md';
import TotalInfo from '../../components/Analytics/TotalInfo';
import Graph from '../../components/Analytics/Graph';

const EditUserVideo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchVideoAndFormData();
    }, [id]);

    const fetchVideoAndFormData = async () => {
        try {
            const [videoRes, categoriesRes, locationsRes] = await Promise.all([
                axios.get(`Dashboard/Videos/${id}`),
                axios.get("Main/getCategories"),
                axios.get("Main/getLocations")
            ]);

            setVideo(videoRes.data);
            setCategories(categoriesRes.data.map(val => ({
                label: val.title,
                value: val.id
            })));
            setLocations(Object.keys(locationsRes.data).map(key => ({
                value: key,
                label: locationsRes.data[key],
            })));
        } catch (error) {
            toast.error("Failed to load video data");
            navigate('/User/Videos');
        }
    };

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const form = new FormData();
            // Append only changed fields
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== undefined &&
                    formData[key] !== video[key]) {
                    form.append(key, formData[key]);
                }
            });


            toast.success("Video updated successfully!");
            navigate('/User/Videos');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update video");
        } finally {
            setIsLoading(false);
        }
    };

    if (!video) return <div className="text-center p-8">Loading...</div>;

    return (
        <>
            <h1 className="text-4xl font-medium flex items-center gap-3 mb-4 text-gray-700">
                <MdOutlineVideoSettings />
                {video.title}
            </h1>
            <TotalInfo info={video} />

            <VideoUploadForm
                initialData={video}
                categories={categories}
                locations={locations}
                mode="user"
                isLoading={isLoading}
            />

            <Graph videoId={video.id} />
        </>
    );
};

export default EditUserVideo;