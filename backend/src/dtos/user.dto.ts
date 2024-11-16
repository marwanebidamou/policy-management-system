import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string()
});


export const signupSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, "Username is required")
        .max(50, "Username must not exceed 50 characters"),
    email: z
        .string()
        .trim()
        .email("Invalid email address"), // Validate email format
    password: z
        .string()
        .min(10, "Password must be at least 10 characters long"),
});

// Automatically infer TypeScript types from the schemas
export type SignInDTO = z.infer<typeof loginSchema>;
export type SignUpDTO = z.infer<typeof signupSchema>;

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