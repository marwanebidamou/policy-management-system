import { z } from 'zod';
import { TagDTO } from './tag.dto';

export const createPolicySchema = z.object({
    title: z.string().min(1, 'Policy name is required').max(100, 'Policy name shoud be less than 100 characters'),
    description: z.string().min(1, 'Description is required'),
    tags: z.array(z.string().min(1, 'Tag ID shouldn\'t be empty')).nonempty('At least one tag ID must be provided'),
});

export const commentPolicySchema = z.object({
    content: z.string().min(1, 'Comment content is required').max(500, 'Comment shoud be less than 500 characters'),
});

// Automatically infer TypeScript types from the schemas
export type CreatePolicyDTO = z.infer<typeof createPolicySchema>;
export type PostCommentPolicy = z.infer<typeof commentPolicySchema>;


export type PolicyDTO = {
    _id: string,
    title: string,
    description: string,
    academicYear: number,
    upvotesCount: number,
    createdAt: Date,
    tags?: TagDTO[],
    author?: PersonDTO
}

export type PersonDTO = {
    _id: string,
    username: string
}

export type SearchPolicyDTO = {
    filters: {
        title?: string,
        academicYear?: number,
        myPoliciesOnly?: boolean,
        authorId?: string,
        tags?: string[]
    },
    pagination: {
        page: number,
        limit: number
    },
    orderBy?: SearchPolicyOrderBy
}

export type SearchPolicyResultDTO = {
    criteria: SearchPolicyDTO,
    paginationProps: {
        total: number,
        page: number,
        pages: number
    },
    data: PolicyDTO[]
}

export enum SearchPolicyOrderBy {
    UpvotesCount = "UpvotesCount",
    DateAsc = "DateAsc",
    DateDesc = "DateDesc",
}

export type UpVotePolicyResponseDTO = {
    success: boolean,
    alreadyVoted: boolean
}

export type PostCommentResponseDTO = {
    success: boolean,
    commentId?: string
}

export type CommentItemDTO = {
    _id: string,
    content: string,
    date: Date,
    author?: PersonDTO,
}

export type CommentListDTO = {
    data: CommentItemDTO[],
    paginationProps: {
        total: number,
        page: number,
        pages: number
    }
}