import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { fetchPolicies, upvotePolicy, PolicyDTO, SearchPolicyDTO, SearchPolicyOrderBy } from "../../api/policyService";
import { Link } from "react-router-dom";
import PolicySearchForm from "./SearchPolicies";
import { HandThumbUpIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

export default function ListPolicies() {
    const { uiConfig, setUi, addNotification } = useGlobalContext();

    const [filters, setFilters] = useState({
        academicYear: new Date().getFullYear(),
        authorId: undefined,
        myPoliciesOnly: false,
        tags: ([] as string[]),
        title: ''
    });

    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });

    const [orderBy, setOrderBy] = useState(SearchPolicyOrderBy.UpvotesCount);

    const initialSearchObj: SearchPolicyDTO = {
        filters,
        orderBy,
        pagination
    };

    const [loading, setLoading] = useState(false);

    const [policies, setListPolicies] = useState<Array<PolicyDTO>>([]);

    const searchPolicies = async (params: SearchPolicyDTO) => {
        setLoading(true);
        fetchPolicies(params)
            .then(res => {
                setListPolicies(res.data);
                setPagination({
                    page: res.paginationProps.page,
                    total: res.paginationProps.total,
                    pages: res.paginationProps.pages,
                    limit: 10
                });
            })
            .catch(err => {
                addNotification('An error occurred while fetching policies. Please try again later.', "error");
                console.error(err);
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = async (criteria: { title?: string, academicYear?: number, tags?: string[], orderBy?: SearchPolicyOrderBy }) => {
        setOrderBy(criteria.orderBy || SearchPolicyOrderBy.UpvotesCount);
        const updatedFilters = {
            academicYear: criteria.academicYear || new Date().getFullYear(),
            authorId: undefined,
            myPoliciesOnly: false,
            tags: criteria.tags || ([] as string[]),
            title: criteria.title || '',
        };

        setFilters(updatedFilters);
        await searchPolicies({ filters: updatedFilters, pagination: { page: 1, limit: 10 } });
    };

    useEffect(() => {
        setUi({ ...uiConfig, heading: 'Policies' });
        (async () => {
            await searchPolicies(initialSearchObj);
        })();
    }, []);

    const handleUpvote = async (policyId: string) => {
        try {
            const result = await upvotePolicy(policyId);
            if (result.success) {
                setListPolicies(prevPolicies =>
                    prevPolicies.map(policy =>
                        policy._id === policyId
                            ? { ...policy, upvotesCount: policy.upvotesCount + 1 }
                            : policy
                    )
                );
                addNotification("Policy upvoted successfully!", "success");
            } else if (result.alreadyVoted) {
                addNotification("You've already upvoted this policy!", "info");
            }
        } catch (err) {
            console.error(err);
            addNotification("Failed to upvote the policy. Please try again later.", "error");
        }
    };

    return (
        <>
            <PolicySearchForm onSearch={handleSearch} />
            <ul role="list" className="divide-y divide-gray-200 w-full bg-white shadow-sm rounded-md p-4">
                {policies.map(policy => (
                    <li
                        key={policy._id}
                        className="flex justify-between items-center gap-x-6 py-4 hover:bg-gray-100 transition rounded-lg px-4"
                    >
                        {/* Left Section */}
                        <div className="flex gap-x-4 items-start">
                            {/* Static Image */}
                            <img
                                alt="Policy"
                                src="https://via.placeholder.com/60"
                                className="h-14 w-14 flex-none rounded-lg bg-gray-200"
                            />
                            {/* Policy Info */}
                            <div className="flex flex-col">
                                <Link to={`/policies/${policy._id}`} className="text-lg font-semibold text-gray-800 hover:underline">
                                    {policy.title}
                                </Link>
                                <p className="text-sm text-gray-600">
                                    By {policy.author?.username || "Unknown"} - Added on {new Date(policy.createdAt).toLocaleDateString()}
                                </p>
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                    {policy.description}
                                </p>
                                {/* Tags */}
                                <div className="mt-2 flex flex-wrap gap-3">
                                    {policy.tags!.map(tag => (
                                        <span
                                            key={tag._id}
                                            className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                                        >
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Right Section */}
                        <div className="flex flex-col items-end space-y-2">
                            {/* Upvote Button */}
                            <button
                                onClick={() => handleUpvote(policy._id)}
                                className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 focus:outline-none"
                            >
                                <HandThumbUpIcon className="h-5 w-5" />
                                Upvote
                            </button>
                            {/* Upvotes and Comments */}
                            <div className="flex items-center gap-4 text-sm text-gray-700">
                                <div className="flex items-center gap-1">
                                    <HandThumbUpIcon className="h-5 w-5 text-gray-500" />
                                    {policy.upvotesCount}
                                </div>
                                <div className="flex items-center gap-1">
                                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-500" />
                                    {policy.commentsCount}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
