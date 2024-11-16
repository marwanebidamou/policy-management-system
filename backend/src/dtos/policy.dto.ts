import { z } from 'zod';
import { TagDTO } from './tag.dto';

export const createPolicySchema = z.object({
    title: z.string().min(1, 'Policy name is required').max(100, 'Policy name shoud be less than 100 characters'),
    description: z.string().min(1, 'Description is required'),
    tags: z.array(z.string().min(1, 'Tag ID shouldn\'t be empty')).nonempty('At least one tag ID must be provided'),
});


// Automatically infer TypeScript types from the schemas
export type CreatePolicyDTO = z.infer<typeof createPolicySchema>;


export type PolicyDTO = {
    _id: string,
    title: string,
    description: string,
    academicYear: number,
    tags?: TagDTO[]
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
    data: PolicyDTO[]
}

export enum SearchPolicyOrderBy {
    UpvotesCount = "UpvotesCount",
    DateAsc = "DateAsc",
    DateDesc = "DateDesc",
}