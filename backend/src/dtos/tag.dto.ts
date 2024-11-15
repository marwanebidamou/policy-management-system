import { z } from 'zod';

export const createTagSchema = z.object({
    name: z.string().max(50, "Name must be 50 characters or less."),
});


export const updateTagSchema = z.object({
    name: z.string().max(50, "Name must be 50 characters or less.").optional(),
});

// Automatically infer TypeScript types from the schemas
export type CreateTagDTO = z.infer<typeof createTagSchema>;
export type UpdateTagDTO = z.infer<typeof updateTagSchema>;
export type TagDTO = {
    id: string,
    name: string
}