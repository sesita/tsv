import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import VideoUploadForm from '../../../../components/Dashboard/VideoUploadForm';
import TotalInfo from '../../../../components/Analytics/TotalInfo';
import { MdOutlineVideoSettings } from 'react-icons/md';
import Graph from '../../../../components/Analytics/Graph';

const VideosForm = () => {
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
                axios.get("Main/getLocations"),
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
            navigate('/Admin/Videos');
        }
    };

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const form = new FormData();
            // Append changed fields
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== undefined &&
                    formData[key] !== video[key]) {
                    form.append(key, formData[key]);
                }
            });

            // Add admin-specific fields if needed
            form.append('adminNotes', formData.adminNotes);
            form.append('status', formData.status);

            await axios.put(`Admin/Videos/${id}`, form, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Video updated successfully!");
            navigate('/Admin/Videos');
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
                onSubmit={handleSubmit}
                categories={categories}
                locations={locations}
                mode="admin"
                isLoading={isLoading}
            />

            <Graph videoId={video.id} />
        </>
    );
};

export default VideosForm;