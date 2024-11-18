import React, { useState } from "react";

export default function PolicyDetail() {
  const [policy, setPolicy] = useState({
    title: "Privacy Policy",
    description: "This policy describes how we handle your data responsibly.",
    author: { username: "admin_user" },
    createdAt: "2024-11-16T14:44:50.991Z",
    tags: [
      { _id: "1", name: "Privacy" },
      { _id: "2", name: "Data Protection" },
    ],
    comments: [
      {
        id: "1",
        text: "This is a great policy!",
        author: "user123",
        createdAt: "2024-11-15T10:00:00.000Z",
      },
      {
        id: "2",
        text: "I think this needs more clarification on data usage.",
        author: "user456",
        createdAt: "2024-11-16T12:30:00.000Z",
      },
    ],
  });

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: new Date().toISOString(),
        text: newComment,
        author: "Current User", // Mock user
        createdAt: new Date().toISOString(),
      };
      setPolicy((prevPolicy) => ({
        ...prevPolicy,
        comments: [...prevPolicy.comments, comment],
      }));
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <div>
      {/* Policy Details */}
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold text-gray-900">{policy.title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Policy details and metadata.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Title */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Title</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{policy.title}</dd>
          </div>
          {/* Description */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Description</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{policy.description}</dd>
          </div>
          {/* Author */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Author</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{policy.author.username}</dd>
          </div>
          {/* Created At */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Created At</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {new Date(policy.createdAt).toLocaleDateString()}
            </dd>
          </div>
          {/* Tags */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Tags</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {policy.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2"
                >
                  #{tag.name}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900">Comments</h4>
        <div className="mt-4 space-y-4">
          {policy.comments.map((comment) => (
            <div key={comment.id} className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-700">{comment.text}</p>
              <p className="mt-2 text-xs text-gray-500">
                By {comment.author} on {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Comment */}
      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900">Add a Comment</h4>
        <div className="mt-4 flex gap-2">
          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Write your comment here..."
          />
          <button
            type="button"
            onClick={handleAddComment}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
