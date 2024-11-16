import Policy from '../models/Policy';
import { createPolicySchema, CreatePolicyDTO, SearchPolicyDTO, SearchPolicyResultDTO, PolicyDTO, SearchPolicyOrderBy } from '../dtos/policy.dto';
import { BaseError, BaseErrorType } from '../errors/BaseError';
import { validateAndCastObjectId } from '../validators/customValidators';
import Tag from '../models/Tag';

/**
 * Create a new policy
 * @param tagData - Data for the new policy
 */
export const createPolicy = async (connectedUser: string, policyData: CreatePolicyDTO) => {

    const { title, description, tags } = policyData;
    // Ensure all tag IDs are valid
    const validTags = await Tag.find({ _id: { $in: tags } });
    if (validTags.length !== tags.length) {
        throw new BaseError('Some provided tag IDs are invalid.', BaseErrorType.InvalidModel);
    }

    // Create and save the policy
    let newPolicy = new Policy({
        title,
        description,
        academicYear: new Date().getFullYear(),
        authorId: connectedUser,
        tags
    });

    newPolicy = await newPolicy.save();
    console.log(newPolicy);
    return newPolicy;
};

/**
 * Get all policies
 * @param filters - Optional filters for fetching tags
 */
export const getAllPolicies = async (
    connectedUserId: string,
    searchObj: SearchPolicyDTO = { pagination: { limit: 10, page: 1 }, filters: {} }
): Promise<SearchPolicyResultDTO> => {
    const query: any = {};

    //filter by academic year
    query.academicYear = (searchObj?.filters?.academicYear || new Date().getFullYear()) as number;

    //filter by title
    if (searchObj?.filters?.title) {
        query.title = { $regex: searchObj.filters.title, $options: 'i' }; //i for case-insensitive 
    }

    //filter by tags
    if (searchObj?.filters?.tags && searchObj.filters.tags.length > 0) {
        query.tags = { $in: searchObj.filters.tags as string[] };
    }

    //filter by authoe
    if (searchObj?.filters?.myPoliciesOnly && connectedUserId) {
        query.authorId = connectedUserId;
    } else if (searchObj?.filters?.authorId) {
        query.authorId = searchObj.filters.authorId;
    }

    const page = searchObj?.pagination?.page || 1;
    const limit = searchObj?.pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const sortOption = getSortOption(searchObj?.orderBy);

    const data = await Policy.find(query)
        .populate('tags')
        .sort(sortOption)
        .skip(skip)
        .limit(limit);


    const policies: PolicyDTO[] = data.map((policy) => ({
        _id: policy._id as string,
        title: policy.title,
        description: policy.description,
        academicYear: policy.academicYear,
        //tags: policy.tags.map(tag => { _id: tag._id.toString()})
    }));


    return {
        criteria: searchObj,
        data: policies
    }
};


const getSortOption = (orderBy: SearchPolicyOrderBy | undefined): Record<string, 1 | -1> => {
    switch (orderBy) {
        case SearchPolicyOrderBy.DateAsc:
            return { createdAt: 1 }; // Sort by date ascending
        case SearchPolicyOrderBy.DateDesc:
            return { createdAt: -1 }; // Sort by date descending
        case SearchPolicyOrderBy.UpvotesCount:
        default:
            return { upvotesCount: -1 }; // Default to upvotes descending
    }
};