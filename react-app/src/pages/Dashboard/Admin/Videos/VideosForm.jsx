import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import VideoUploadForm from '../../../../components/Dashboard/VideoUploadForm';

const VideosForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState({});

    useEffect(() => {
        fetchVideoAndFormData();
    }, [id]);

    const fetchVideoAndFormData = async () => {
        try {
            const [videoRes, categoriesRes, locationsRes, statsRes] = await Promise.all([
                axios.get(`Admin/Videos/${id}`),
                axios.get("Main/getCategories"),
                axios.get("Main/getLocations"),
                axios.get(`Admin/Videos/${id}/stats`)
            ]);

            setVideo(videoRes.data);
            setAdditionalInfo(statsRes.data);
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
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">Edit Video (Admin)</h1>

                {/* Additional admin stats/info */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Views</h3>
                        <p className="text-xl">{additionalInfo.views}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">User</h3>
                        <p className="text-xl">{additionalInfo.userName}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Upload Date</h3>
                        <p className="text-xl">{new Date(additionalInfo.uploadDate).toLocaleDateString()}</p>
                    </div>
                </div>

                <VideoUploadForm
                    initialData={video}
                    onSubmit={handleSubmit}
                    categories={categories}
                    locations={locations}
                    mode="admin"
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default VideosForm;