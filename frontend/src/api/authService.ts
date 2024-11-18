import apiClient from "./apiClient";


export const loginApi = async (username: string, password: string): Promise<SignInResponseDTO> => {
    try {
        const response = await apiClient.post<SignInResponseDTO>("/auth/sign-in", { username, password });
        return response.data;
    } catch (error: any) {
        if (error.response?.data) {
            throw error.response.data; // Throw hard-typed error DTO
        }
        throw new Error("An unexpected error occurred.");
    }
};


export const signupApi = async (username: string, email: string, password: string): Promise<SignUpResponseDTO> => {
    try {
        const response = await apiClient.post<SignUpResponseDTO>("/auth/sign-up", { username, email, password });
        return response.data;
    } catch (error: any) {
        if (error.response?.data) {
            throw error.response.data; // Throw hard-typed error DTO
        }
        throw new Error("An unexpected error occurred.");
    }
};

export type SignInResponseDTO = {
    success: boolean,
    token?: string,
    user?: ConnectedUserResponseDTO
}

export type SignUpResponseDTO = {
    success: boolean,
    status?: SignUpResponseStatus,
    token?: string,
    user?: ConnectedUserResponseDTO
}

type ConnectedUserResponseDTO = {
    username: string,
    email: string,
}

export enum SignUpResponseStatus {
    EmailAlreadyInUse = 'EmailAlreadyInUse',
    UsernameAlreadyInUse = 'UsernameAlreadyInUse',

}



