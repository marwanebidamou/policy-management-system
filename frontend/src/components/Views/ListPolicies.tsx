import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { fetchPolicies, PolicyDTO, SearchPolicyDTO, SearchPolicyOrderBy, SearchPolicyResultDTO } from "../../api/policyService";
import { Link } from "react-router-dom";

const policies = [
    {
        title: "Privacy Policy",
        description:
            "Learn how we handle your data and protect your privacy. Our privacy policy is designed to ensure transparency and build trust with our users.",
        author: "admin_user",
        upvotes: 120,
        comments: 45,
        tags: ["Privacy", "Data Protection", "Transparency"],
    },
    {
        title: "Terms of Service",
        description:
            "Understand the rules and guidelines for using our services. By accessing our platform, you agree to the terms outlined here.",
        author: "tos_writer",
        upvotes: 89,
        comments: 30,
        tags: ["Legal", "Guidelines"],
    },
    {
        title: "Refund Policy",
        description:
            "Find out about our refund process and eligibility criteria. If you’re not satisfied, we aim to provide an easy refund process.",
        author: "finance_team",
        upvotes: 76,
        comments: 20,
        tags: ["Refunds", "Customer Support"],
    },
    {
        title: "Shipping Policy",
        description:
            "Read about shipping times, costs, and delivery options. We strive to provide timely and reliable shipping services.",
        author: "logistics_expert",
        upvotes: 150,
        comments: 65,
        tags: ["Shipping", "Logistics", "Delivery"],
    },
    {
        title: "Cookie Policy",
        description:
            "Know how we use cookies to enhance your experience. Our cookie policy outlines what data is collected and why.",
        author: "developer_team",
        upvotes: 110,
        comments: 40,
        tags: ["Cookies", "Tracking", "User Experience"],
    },
];

export default function ListPolicies() {

    const { uiConfig, setUi, addNotification } = useGlobalContext();

    const initialSearchObj: SearchPolicyDTO = {
        filters: {
            academicYear: new Date().getFullYear(),
            authorId: undefined,
            myPoliciesOnly: false,
            tags: [],
            title: ''
        },
        pagination: {
            page: 1,
            limit: 10
        }
    }

    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });

    const [loading, setLoading] = useState(false);

    const [policies, setListPolicies] = useState(Array<PolicyDTO>);

    useEffect(() => {
        setUi({ ...uiConfig, heading: 'Policies' });
        (async () => {
            setLoading(true);
            fetchPolicies(initialSearchObj).then(res => {
                setListPolicies(res.data);
                setPagination({
                    page: res.paginationProps.page,
                    total: res.paginationProps.total,
                    pages: res.paginationProps.pages,
                    limit: 10
                });
            })
                .catch(err => {
                    addNotification('An error occured when attempting fetching data. Please try again later.', "error");
                    console.error(err);
                }).finally(() => {
                    setLoading(false);
                });
        })();
    }, []);

    const staticImage = "https://via.placeholder.com/50"; // Static image URL

    return (
        <ul role="list" className="divide-y divide-gray-100 w-full">
            {policies.map((policy, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                    {/* Left Section */}
                    <div className="flex min-w-0 gap-x-4">
                        {/* Static Image */}
                        <img
                            alt="Policy"
                            src={staticImage}
                            className="size-12 flex-none rounded bg-gray-50"
                        />
                        {/* Policy Info */}
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold text-gray-900">
                                {policy.title}
                            </p>
                            <p className="text-xs text-gray-500">
                                By {policy.author?.username}
                            </p>
                            {/* Truncated Description with Read More */}
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                {policy.description}
                                <span className="ml-1 text-blue-500 cursor-pointer">
                                    <Link to={`/policies/${policy._id}`} className="hover:underline">
                                        Read more
                                    </Link>
                                </span>
                            </p>
                            {/* Tags */}
                            <div className="mt-2 flex flex-wrap gap-1">
                                {policy.tags!.map((tag) => (
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
                    <div className="flex shrink-0 sm:flex-col sm:items-end">
                        <p className="text-sm text-gray-700">👍 {policy.upvotesCount}</p>
                        <p className="text-sm text-gray-700">💬 {policy.commentsCount}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
