import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { fetchPolicies, PolicyDTO, SearchPolicyDTO, SearchPolicyOrderBy, SearchPolicyResultDTO } from "../../api/policyService";
import { Link } from "react-router-dom";
import PolicySearchForm from "./SearchPolicies";


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
    }


    const [loading, setLoading] = useState(false);

    const [policies, setListPolicies] = useState(Array<PolicyDTO>);

    const searchPolicies = async (params: SearchPolicyDTO) => {



        setLoading(true);
        fetchPolicies(params).then(res => {
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
    }

    const handleSearch = async (criteria: { title?: string, academicYear?: number, tags?: string[], orderBy?: SearchPolicyOrderBy }) => {
        setOrderBy(criteria.orderBy || SearchPolicyOrderBy.UpvotesCount);
        let filters = {
            academicYear: criteria.academicYear || new Date().getFullYear(),
            authorId: undefined,
            myPoliciesOnly: false,
            tags: criteria.tags || ([] as string[]),
            title: criteria.title || '',
        };

        setFilters(filters);
        await searchPolicies({ filters, pagination: { page: 1, limit: 10 } });
    }

    useEffect(() => {
        setUi({ ...uiConfig, heading: 'Policies' });
        (async () => {
            await searchPolicies(initialSearchObj);
        }
        )();
    }, []);

    const staticImage = "https://via.placeholder.com/50"; // Static image URL

    return (
        <>
            <PolicySearchForm onSearch={handleSearch} />
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
        </>
    );
}
