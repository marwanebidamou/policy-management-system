import Policy, { IPolicy } from '../models/Policy';
import { createPolicySchema, CreatePolicyDTO, SearchPolicyDTO, SearchPolicyResultDTO, PolicyDTO, SearchPolicyOrderBy, UpVotePolicyResponseDTO, PostCommentResponseDTO, CommentListDTO, CommentItemDTO, CreatedPolicyDto as CreatedPolicyDTO } from '../dtos/policy.dto';
import { BaseError, BaseErrorType } from '../errors/BaseError';
import { validateAndCastObjectId } from '../validators/customValidators';
import Tag from '../models/Tag';
import { TagDTO } from '../dtos/tag.dto';
import UpVote from '../models/UpVote';
import { string } from 'zod';
import Comment from '../models/Comment';

/**
 * Create a new policy
 * @param tagData - Data for the new policy
 */
export const createPolicy = async (connectedUser: string, policyData: CreatePolicyDTO): Promise<CreatedPolicyDTO> => {

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
    return {
        _id: newPolicy._id as string,
        title: newPolicy.title
    };
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

    console.log("SEARCH OBJ", searchObj);
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


    const page: number = Number(searchObj?.pagination?.page || 1);
    const limit: number = Number(searchObj?.pagination?.limit || 10);
    const skip: number = (page - 1) * limit;

    const sortOption = getSortOption(searchObj?.orderBy);

    const data = await Policy.find(query)
        .populate('tags')
        .populate('authorId')
        .sort(sortOption)
        .skip(skip)
        .limit(limit);



    const dataTotalCount = await Policy.find(query).countDocuments();

    const policies: PolicyDTO[] = data.map((policy) => ({
        _id: policy._id as string,
        title: policy.title,
        upvotesCount: policy.upvotesCount,
        description: policy.description,
        academicYear: policy.academicYear,
        createdAt: policy.createdAt,
        commentsCount: policy.commentsCount,
        tags: policy.tags.map((tag: any) => {
            if (typeof tag === 'object' && '_id' in tag && 'name' in tag) {
                return { _id: tag._id.toString(), name: (tag.name as string) };
            } else {
                return { _id: tag.toString(), name: '' };
            }
        }),
        author: (typeof policy.authorId === 'object' && '_id' in policy.authorId && 'username' in policy.authorId) ?
            { _id: policy.authorId._id.toString(), username: policy.authorId.username as string } :
            { _id: policy.authorId.toString(), username: '' }
    }));


    return {
        criteria: searchObj,
        paginationProps: {
            total: dataTotalCount,
            page: page,
            pages: Math.ceil(dataTotalCount / limit)
        },
        data: policies
    }
};


export const getPolicyById = async (policyId: string): Promise<PolicyDTO> => {
    const policy = await Policy.findById(policyId)
        .populate('tags')
        .populate('authorId');

    if (!policy) {
        throw new BaseError('Policy not found', BaseErrorType.NotFound);
    }

    const policyDTO: PolicyDTO = {
        _id: policy._id as string,
        title: policy.title,
        description: policy.description,
        upvotesCount: policy.upvotesCount,
        academicYear: policy.academicYear,
        createdAt: policy.createdAt,
        commentsCount: policy.commentsCount,
        tags: (policy.tags || []).map((tag: any) => ({
            _id: tag._id?.toString() || '',
            name: tag.name || '',
        })),
        author: policy.authorId && typeof policy.authorId === 'object' && '_id' in policy.authorId && 'username' in policy.authorId
            ? { _id: policy.authorId._id.toString(), username: policy.authorId.username as string }
            : { _id: '', username: 'Unknown' }
    };

    return policyDTO;
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


export const UpVotePolicy = async (policyId: string, connectedUserId: string): Promise<UpVotePolicyResponseDTO> => {
    const policy = await Policy.findById(policyId);
    if (!policy) {
        throw new BaseError("Policy not found", BaseErrorType.NotFound);
    }
    const upvote = await UpVote.findOne({ policyId: policy._id, userId: connectedUserId });
    if (upvote) {
        return { success: false, alreadyVoted: true };
    }

    policy.upvotesCount += 1;
    await policy.save();

    await UpVote.create({ policyId: policy._id, userId: connectedUserId });

    return { success: true, alreadyVoted: false };
}


export const commentPolicy = async (policyId: string, connectedUserId: string, content: string): Promise<PostCommentResponseDTO> => {
    const policy = await Policy.findById(policyId);
    if (!policy) {
        throw new BaseError("Policy not found", BaseErrorType.NotFound);
    }

    policy.commentsCount += 1;
    await policy.save();

    const comment = await Comment.create(
        {
            policyId: policyId,
            userId: connectedUserId,
            content
        });

    return { success: true, commentId: comment._id.toString() };
}

export const getCommentsOfPolicy = async (policyId: string, page: number, limit: number): Promise<CommentListDTO> => {
    const isPolicyExists = await Policy.exists({ _id: policyId });
    if (!isPolicyExists) {
        throw new BaseError("Policy not found", BaseErrorType.NotFound);
    }

    page = Number(page || 1);
    limit = Number(limit || 10);
    const skip: number = (page - 1) * limit;

    const data = await Comment.find({ policyId: policyId })
        .populate('userId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalCount = await Comment.countDocuments({ policyId: policyId });

    return {
        data: data.map(c => ({
            _id: c._id.toString(),
            content: c.content,
            date: c.createdAt,
            author: (typeof c.userId === 'object' && '_id' in c.userId && 'username' in c.userId) ?
                { _id: c.userId._id.toString(), username: c.userId.username as string } :
                { _id: c.userId.toString(), username: '' }
        })),
        paginationProps: {
            total: totalCount,
            page: page,
            pages: Math.ceil(totalCount / limit)

        }
    }
}

