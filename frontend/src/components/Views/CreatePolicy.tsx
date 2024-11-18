import React, { useState } from "react";

export default function PolicyCreationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([
    "Privacy",
    "Terms",
    "Refunds",
    "Cookies",
    "Shipping",
  ]);
  const [newTag, setNewTag] = useState("");

  const handleTagChange = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddNewTag = () => {
    if (newTag && !availableTags.includes(newTag)) {
      setAvailableTags([...availableTags, newTag]);
      setTags([...tags, newTag]); // Optionally select the tag after creation
      setNewTag(""); // Clear the input field
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      description,
      tags,
    });
    setTitle("");
    setDescription("");
    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter the policy title"
        />
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Provide a brief description of the policy"
        />
      </div>

      {/* Tags Field */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Tags</label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {availableTags.map((tag) => (
            <label key={tag} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              {tag}
            </label>
          ))}
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Select one or more tags that best describe the policy.
        </p>

        {/* Add New Tag */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Create a new tag"
          />
          <button
            type="button"
            onClick={handleAddNewTag}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
          >
            Add Tag
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => {
            setTitle("");
            setDescription("");
            setTags([]);
            setNewTag("");
          }}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
