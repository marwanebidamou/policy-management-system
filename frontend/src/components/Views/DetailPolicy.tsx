import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentItemDTO, CommentListDTO, commentOnPolicy, fetchComments, fetchPolicyById } from "../../api/policyService";
import { useGlobalContext } from "../../contexts/GlobalContext";

export default function PolicyDetail() {
  const { id } = useParams<{ id: string }>();
  const [policy, setPolicy] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addNotification, uiConfig, setUi, isAuthenticated } = useGlobalContext();

  useEffect(() => {
    setUi({ ...uiConfig, heading: 'Detail Policy ' })
  }, []);
  useEffect(() => {
    if (!id) return;

    // Fetch Policy and Comments
    const fetchPolicyData = async () => {
      setLoading(true);
      try {
        // Fetch policy details
        const fetchedPolicy = await fetchPolicyById(id);
        setPolicy(fetchedPolicy);
        setUi({ ...uiConfig, heading: 'Detail Policy :' + fetchedPolicy.title })

        // Fetch comments
        const commentsResponse: CommentListDTO = await fetchComments(id, 1, 1000);
        setComments(commentsResponse.data || Array<CommentItemDTO>());
      } catch (err) {
        console.error("Error fetching policy or comments:", err);
        setError("Failed to load policy details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyData();
  }, [id]);

  const handleAddComment = async () => {

    if (newComment.trim()) {
      commentOnPolicy(id as string, newComment).then(res => {
        if (res.success) {
          addNotification('Comment has been posted succesfully!', "success");
          setNewComment("");
        }
      }).then(async () => {
        // Fetch comments
        const commentsResponse: CommentListDTO = await fetchComments(id as string, 1, 1000);
        setComments(commentsResponse.data || Array<CommentItemDTO>());
      }).catch(error => {
        addNotification('An error occurred while adding the comment. Please try again later.', "error");

        console.error(error);
      })
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {/* Policy Details */}
      <div className="p-6 bg-white shadow rounded-lg">
        {/* Title */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Created on {new Date(policy.createdAt).toLocaleDateString()} by{" "}
            <span className="font-semibold">{policy.author?.username || "Unknown"}</span>
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Description</h2>
          <p className="mt-2 text-gray-700">{policy.description}</p>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {policy.tags.map((tag: any) => (
              <span
                key={tag._id}
                className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>



      {/* Comments Section */}
      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900">Comments ({comments.length})</h4>
        <div className="mt-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-700">{comment.content}</p>
              <p className="mt-2 text-xs text-gray-500">
                By {comment.author.username} on {new Date(comment.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Comment */}
      {isAuthenticated() ?
        (<>
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
        </>) : (<>
          <h4>Login or sign up to add new comments</h4>
        </>)}

    </div>
  );
}
