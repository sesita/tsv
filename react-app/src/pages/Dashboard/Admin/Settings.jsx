import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import {
    FaCog, FaGlobe, FaPalette, FaImage, FaSave, FaPhone,
    FaMapMarkerAlt, FaEnvelope, FaUpload, FaTrash, FaCheck,
    FaDesktop, FaMobile, FaTabletAlt
} from "react-icons/fa";

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [isDirty, setIsDirty] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#DC2626');
    const [logo, setLogo] = useState(null);
    const [favicon, setFavicon] = useState(null);
    const [previewDevice, setPreviewDevice] = useState('desktop');

    const tabs = [
        { id: 'general', icon: FaGlobe, label: 'General' },
        { id: 'appearance', icon: FaPalette, label: 'Appearance' },
        { id: 'media', icon: FaImage, label: 'Media' }
    ];

    const handleLogoUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'logo') {
                    setLogo(e.target.result);
                } else {
                    setFavicon(e.target.result);
                }
                setIsDirty(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleColorChange = (color) => {
        setPrimaryColor(color);
        setIsDirty(true);
    };

    const presetColors = [
        '#DC2626', // Red
        '#2563EB', // Blue
        '#059669', // Green
        '#7C3AED', // Purple
        '#EA580C', // Orange
        '#0891B2', // Cyan
    ];

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-4xl font-medium flex items-center gap-3 text-gray-800">
                    <FaCog style={{ color: primaryColor }} />
                    Settings
                </h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            className="w-full rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all bg-white shadow-sm"
                            placeholder="Search settings..."
                        />
                    </div>
                    {isDirty && (
                        <button
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl transition-all shadow-sm hover:shadow text-white"
                            style={{ backgroundColor: primaryColor }}
                        >
                            <FaSave />
                            Save Changes
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {/* Tabs */}
                <div className="flex gap-2 p-2 border-b">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === tab.id
                                ? 'font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            style={{
                                backgroundColor: activeTab === tab.id ? `${primaryColor}15` : '',
                                color: activeTab === tab.id ? primaryColor : ''
                            }}
                        >
                            <tab.icon className="text-sm" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="p-6">
                    {/* Media Tab */}
                    {activeTab === 'media' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Logo Upload */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-medium text-gray-800 mb-6">Logo</h2>
                                <div className="border-2 border-dashed rounded-xl p-8 text-center space-y-4">
                                    {logo ? (
                                        <div className="relative">
                                            <img
                                                src={logo}
                                                alt="Logo preview"
                                                className="max-h-48 mx-auto"
                                            />
                                            <button
                                                onClick={() => setLogo(null)}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <FaImage className="text-4xl text-gray-400 mx-auto" />
                                            <div className="space-y-2">
                                                <p className="text-gray-600">Upload your website logo</p>
                                                <p className="text-sm text-gray-500">Recommended size: 200x60px</p>
                                            </div>
                                        </>
                                    )}
                                    <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer transition-all text-white"
                                        style={{ backgroundColor: primaryColor }}>
                                        <FaUpload />
                                        Choose Logo
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleLogoUpload(e, 'logo')}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Favicon Upload */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-medium text-gray-800 mb-6">Favicon</h2>
                                <div className="border-2 border-dashed rounded-xl p-8 text-center space-y-4">
                                    {favicon ? (
                                        <div className="relative">
                                            <img
                                                src={favicon}
                                                alt="Favicon preview"
                                                className="max-h-32 mx-auto"
                                            />
                                            <button
                                                onClick={() => setFavicon(null)}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <FaImage className="text-4xl text-gray-400 mx-auto" />
                                            <div className="space-y-2">
                                                <p className="text-gray-600">Upload your favicon</p>
                                                <p className="text-sm text-gray-500">Recommended size: 32x32px</p>
                                            </div>
                                        </>
                                    )}
                                    <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer transition-all text-white"
                                        style={{ backgroundColor: primaryColor }}>
                                        <FaUpload />
                                        Choose Favicon
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleLogoUpload(e, 'favicon')}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Color Scheme */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-medium text-gray-800 mb-6">Color Scheme</h2>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <label className="font-medium text-gray-700">Primary Color</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="color"
                                                value={primaryColor}
                                                onChange={(e) => handleColorChange(e.target.value)}
                                                className="w-16 h-16 rounded-lg cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={primaryColor}
                                                onChange={(e) => handleColorChange(e.target.value)}
                                                className="w-32 rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="font-medium text-gray-700">Preset Colors</label>
                                        <div className="flex flex-wrap gap-3">
                                            {presetColors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => handleColorChange(color)}
                                                    className="w-12 h-12 rounded-xl relative flex items-center justify-center"
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {color === primaryColor && (
                                                        <FaCheck className="text-white" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 mt-8">
                                    <label className="font-medium text-gray-700">Preview</label>
                                    <div className="flex gap-4">
                                        {[
                                            { id: 'desktop', icon: FaDesktop },
                                            { id: 'tablet', icon: FaTabletAlt },
                                            { id: 'mobile', icon: FaMobile }
                                        ].map((device) => (
                                            <button
                                                key={device.id}
                                                onClick={() => setPreviewDevice(device.id)}
                                                className={`p-3 rounded-xl transition-all ${previewDevice === device.id
                                                    ? 'text-white'
                                                    : 'text-gray-400 hover:text-gray-600'
                                                    }`}
                                                style={{
                                                    backgroundColor: previewDevice === device.id ? primaryColor : 'transparent'
                                                }}
                                            >
                                                <device.icon className="text-xl" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-medium text-gray-800 mb-6">Live Preview</h2>
                                <div className="border-2 rounded-xl p-4 aspect-video bg-gray-50">
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        Preview window will be implemented here
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Basic Information */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-medium text-gray-800 mb-6">Basic Information</h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="font-medium text-gray-700 flex items-center gap-2">
                                            <FaGlobe className="text-gray-400" />
                                            Website Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                            placeholder="MYTSV.com"
                                            onChange={() => setIsDirty(true)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-medium text-gray-700">Business Slogan</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                            placeholder="Your business directory slogan"
                                            onChange={() => setIsDirty(true)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-medium text-gray-700 flex items-center gap-2">
                                            <FaEnvelope className="text-gray-400" />
                                            Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                            placeholder="contact@mytsv.com"
                                            onChange={() => setIsDirty(true)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-medium text-gray-700 flex items-center gap-2">
                                            <FaPhone className="text-gray-400" />
                                            Support Phone
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                            placeholder="+1 (555) 000-0000"
                                            onChange={() => setIsDirty(true)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-medium text-gray-700 flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                            Default Location
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                            placeholder="Chicago, IL"
                                            onChange={() => setIsDirty(true)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SEO Settings */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-medium text-gray-800 mb-6">SEO Settings</h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="font-medium text-gray-700">Meta Title</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                            placeholder="MYTSV - Business Directory"
                                            onChange={() => setIsDirty(true)}
                                        />
                                        <p className="text-sm text-gray-500">Recommended length: 50-60 characters</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-medium text-gray-700">Meta Description</label>
                                        <textarea
                                            className="w-full rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all min-h-[120px] resize-none"
                                            placeholder="Discover local businesses in your area..."
                                            onChange={() => setIsDirty(true)}
                                        />
                                        <p className="text-sm text-gray-500">Recommended length: 150-160 characters</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-medium text-gray-700">Keywords</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl py-3 px-4 border border-gray-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                            placeholder="business, directory, local businesses"
                                            onChange={() => setIsDirty(true)}
                                        />
                                        <p className="text-sm text-gray-500">Separate keywords with commas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Settings;