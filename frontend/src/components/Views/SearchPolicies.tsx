import React, { useState, useEffect } from 'react';
import Select from 'react-tailwindcss-select';
import { fetchTags, SearchPolicyOrderBy } from '../../api/policyService';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Option, Options } from 'react-tailwindcss-select/dist/components/type';

const PolicySearchForm = ({ onSearch }: { onSearch: (criteria: { title?: string, academicYear?: number, tags?: string[], orderBy?: SearchPolicyOrderBy }) => void }) => {
    const [formData, setFormData] = useState({
        title: '',
        academicYear: new Date().getFullYear(),
        tags: [] as string[], // Array of selected tag IDs
        orderBy: SearchPolicyOrderBy.UpvotesCount,
    });

    const [availableTags, setAvailableTags] = useState<Option[]>([]);
    const { addNotification } = useGlobalContext();

    useEffect(() => {
        (async () => {
            await fetchTags()
                .then((x) => setAvailableTags(x.map((x) => ({ label: x.name, value: x._id }))))
                .catch((error) => {
                    console.error(error);
                    addNotification('An error occurred when attempting to load tags! Please refresh the page and try again', 'error');
                });
        })();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTagsChange = (selected: any) => {
        const selectedTags = selected ? selected.map((tag: any) => tag.value) : [];
        setFormData({ ...formData, tags: selectedTags });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white shadow-lg rounded-md space-y-4">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Search Policies</h2>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4">
                {/* Title */}
                <div className="lg:col-span-3 md:col-span-2 sm:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Academic Year */}
                <div className="lg:col-span-2 md:col-span-1 sm:col-span-1">
                    <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">
                        Academic Year
                    </label>
                    <input
                        type="number"
                        id="academicYear"
                        name="academicYear"
                        placeholder="e.g. 2024"
                        value={formData.academicYear}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Tags Multi-Select */}
                <div className="lg:col-span-5 md:col-span-2 sm:col-span-2">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags
                    </label>
                    <Select
                        options={availableTags as Options}
                        value={availableTags!.filter((tag) => formData.tags.includes(tag.value))}
                        isMultiple={true}
                        primaryColor={'blue'}
                        onChange={(selected) => handleTagsChange(selected)}
                        placeholder="Select tags"
                        classNames={{
                            menu: 'z-10',
                            searchBox: 'border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                        }}
                    />
                </div>

                {/* Order By */}
                <div className="lg:col-span-2 md:col-span-1 sm:col-span-2">
                    <label htmlFor="orderBy" className="block text-sm font-medium text-gray-700">
                        Order By
                    </label>
                    <select
                        id="orderBy"
                        name="orderBy"
                        value={formData.orderBy}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="UpvotesCount">Upvotes</option>
                        <option value="DateAsc">Date (Ascending)</option>
                        <option value="DateDesc">Date (Descending)</option>
                    </select>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default PolicySearchForm;
