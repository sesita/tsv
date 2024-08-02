import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [formState, setFormState] = useState({ id: null, title: "" });
    const [isEditMode, setIsEditMode] = useState(false);

    const fetchCategories = () => {
        axios
            .get("/Main/getCategories")
            .then((response) => {
                setCategories(response.data);
                setFilteredCategories(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the categories!", error);
            });
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setFilteredCategories(categories.filter((category) => category.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, categories]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/Dashboard/Admin/updateCategory", formState)
            .then((response) => {
                if (isEditMode) {
                    setCategories((prevCategories) => prevCategories.map((category) => (category.id === formState.id ? response.data : category)));
                    toast.success("Category updated successfully!");
                } else {
                    setCategories((prevCategories) => [...prevCategories, response.data]);
                    toast.success("Category created successfully!");
                }
            })
            .catch((error) => {
                toast.error("There was an error saving the category.");
                console.error(error);
            });

        setFormState({ id: null, title: "" });
        setIsEditMode(false);
    };

    const handleEdit = (category) => {
        setFormState(category);
        setIsEditMode(true);
    };

    const handleDelete = (category) => {
        axios
            .post("/Dashboard/Admin/deleteCategory", { id: category?.id })
            .then(() => {
                fetchCategories();
                toast.success("Category Deleted!");
            })
            .catch((error) => {
                toast.error("There was an error deleting the category.");
                console.error(error);
            });
    };

    return (
        <>
            <div className="flex justify-between items-center gap-10 rounded-xl mb-5 border-b border-gray-100 pb-4 cursor-pointer">
                <h1 className="text-3xl font-medium">Manage Categories</h1>
                <input type="text" className="rounded-2xl border py-3 px-4 outline-none font-medium w-1/2" placeholder="Search Category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <form onSubmit={handleSubmit} className="mb-5 flex gap-2">
                <input type="text" name="title" value={formState.title} onChange={handleInputChange} placeholder="Category Name" className="rounded-2xl border py-3 px-4 outline-none font-medium w-full flex-1" required />
                <button type="submit" className="ml-4 py-3 px-6 bg-primary text-white rounded-2xl">
                    {isEditMode ? "Update Category" : "Add Category"}
                </button>
            </form>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="p-4 border">Name</th>
                        <th className="p-4 border">Videos</th>
                        <th className="p-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category.id} draggable className="bg-white hover:bg-gray-100">
                            <td className="p-4 border">{category.title}</td>
                            <td className="p-4 border">{category.videos_count}</td>
                            <td className="p-4 border w-60">
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(category)} className="mr-2 py-1 px-3 flex items-center gap-2 bg-yellow-500 text-white rounded-2xl">
                                        <CiEdit className="text-xl" />
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(category)} className="mr-2 py-1 px-3 flex items-center gap-2 bg-primary text-white rounded-2xl">
                                        <MdOutlineDelete className="text-xl" />
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Categories;
