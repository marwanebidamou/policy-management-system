import { z } from 'zod';

export const createTagSchema = z.object({
    name: z.string().min(3).max(50),
});


export const updateTagSchema = z.object({
    name: z.string().min(3).max(50),
});

// Automatically infer TypeScript types from the schemas
export type CreateTagDTO = z.infer<typeof createTagSchema>;
export type UpdateTagDTO = z.infer<typeof updateTagSchema>;
export type TagDTO = {
    _id: string,
    name: string
}