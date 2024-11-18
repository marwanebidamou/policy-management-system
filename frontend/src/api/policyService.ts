import apiClient from "./apiClient";




export const createPolicy = async (policyData: CreatePolicyDTO): Promise<CreatePolicyDTO> => {
    const response = await apiClient.post<CreatePolicyDTO>("/policy", policyData);
    return response.data;
};



export const fetchPolicies = async (searchObj: SearchPolicyDTO): Promise<SearchPolicyResultDTO> => {
    const response = await apiClient.get<SearchPolicyResultDTO>("/policy", {
        params: searchObj,
    });
    return response.data;
};



export const upvotePolicy = async (policyId: string): Promise<UpVotePolicyResponseDTO> => {
    const response = await apiClient.post<UpVotePolicyResponseDTO>(`/policy/${policyId}/upvote`);
    return response.data;
};


export const commentOnPolicy = async (
    policyId: string,
    content: string
): Promise<PostCommentResponseDTO> => {
    const response = await apiClient.post<PostCommentResponseDTO>(`/policy/${policyId}/comment`, {
        content,
    });
    return response.data;
};


export const fetchComments = async (
    policyId: string,
    page: number = 1,
    limit: number = 10
): Promise<CommentListDTO> => {
    const response = await apiClient.get<CommentListDTO>(`/policy/${policyId}/comment`, {
        params: { page, limit },
    });
    return response.data;
};


export const createTag = async (tagData: CreateTagDTO): Promise<TagDTO> => {
    const response = await apiClient.post<TagDTO>("/tag", tagData);
    return response.data;
};


export const fetchTags = async (filters: { name?: string } = {}): Promise<TagDTO[]> => {
    const response = await apiClient.get<TagDTO[]>("/tag", {
        params: filters,
    });
    return response.data;
};


export type CreateTagDTO = {
    name: string
}
export type CreatePolicyDTO = {
    title: string,
    description: string,
    tags: string[]
}

export type PostCommentPolicy = {
    content: string
}


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

export type TagDTO = {
    _id: string,
    name: string
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