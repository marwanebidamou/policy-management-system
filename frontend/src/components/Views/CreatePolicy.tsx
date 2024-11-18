import React, { useEffect, useState } from "react";
import { fetchTags, TagDTO, createTag, createPolicy } from "../../api/policyService";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function PolicyCreationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]); //ids tags
  const [availableTags, setAvailableTags] = useState<TagDTO[]>([]);

  const { addNotification, setUi, uiConfig } = useGlobalContext();

  const navigate = useNavigate();
  useEffect(() => {
    //Change Main title
    setUi({ ...uiConfig, heading: "Create a new Policy" });
    //Load tags
    (async () => {
      await fetchTags().then(x => setAvailableTags(x)).catch(error => {
        console.error(error);
        addNotification("An error occured when attempting to load tags! Please refresh the page and try again", "error");
      })
    })();

  }, []);


  const [newTag, setNewTag] = useState("");

  const handleTagChange = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddNewTag = async () => {
    if (newTag && !availableTags.find(x => x.name == newTag)) { // check that new tag not already exists
      createTag({ name: newTag }).then(addedTag => {  //add new tag through api
        setAvailableTags([...availableTags, addedTag]); //add added tag to available tags state
        setTags([...tags, addedTag._id]); //select the added tag
        setNewTag(''); //clear the new tag input
      }).catch(error => {
        console.error(error);
        addNotification(`An error occured when attempting to add the new tag. ${error.message}`, "error");
      });
    }
    else {
      addNotification(`Tag ${newTag} already exists`, "info");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length < 1) {
      addNotification('Policy name is required.', "error");
    } else if (title.length > 100) {
      addNotification('Policy name shoud be less than 100 characters.', "error");
    }
    if (description.length < 1) {
      addNotification('Description is required.', "error");
    }
    if (tags.length == 0) {
      addNotification('At least one tag ID must be provided.', "error");
    }

    createPolicy({ title, description, tags }).then(res => {
      setTitle("");
      setDescription("");
      setTags([]);

      navigate(`/policies/${res._id}`)

    }).catch(error => {
      console.error(error);
      if (error.success === false && error.error === 'Validation Error') {
        const errorMessages = error.details.map((detail: { path: string, message: string }) => detail.path + " : " + detail.message).join(`\n`);
        addNotification(`There are errors in the form. Check these fields and try again.
               ${errorMessages}`, "error");
      } else {
        addNotification(error.message || "An error has occured. Please try again!", "error");
      }
    });


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
            <label key={tag._id} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                value={tag._id}
                checked={tags.includes(tag._id)}
                onChange={() => handleTagChange(tag._id)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              {tag.name}
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
