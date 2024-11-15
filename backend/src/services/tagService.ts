import Tag from '../models/Tag';
import { CreateTagDTO, UpdateTagDTO } from '../dtos/tag.dto';
import { BaseError, BaseErrorType } from '../errors/BaseError';
import Policy from '../models/Policy';
import { validateAndCastObjectId } from '../validators/customValidators';

/**
 * Create a new tag
 * @param tagData - Data for the new tag
 */
export const createTag = async (tagData: CreateTagDTO) => {
    // Check if the tag name already exists
    const existingTag = await Tag.findOne({ name: tagData.name });
    if (existingTag) {
        throw new Error(`Tag with name "${tagData.name}" already exists.`);
    }

    // Create and save the new tag
    const tag = new Tag(tagData);
    return await tag.save();
};

/**
 * Get all tags
 * @param filters - Optional filters for fetching tags
 */
export const getAllTags = async (filters: { name?: string } = {}) => {
    const query: any = {};

    //filter by tag bame
    if (filters.name) {
        query.name = { $regex: filters.name, $options: 'i' }; //i for case-insensitive 
    }

    return await Tag.find(query).sort({ name: 1 }); // Sort by name asc
};

/**
 * Get a tag by ID
 * @param id - The ID of the tag to fetch
 */
export const getTagById = async (id: string) => {
    const tag = await Tag.findById(validateAndCastObjectId(id));
    if (!tag) {
        throw new BaseError('Tag not found.', BaseErrorType.NotFound);
    }
    return tag;
};

/**
 * Update an existing tag
 * @param id - The ID of the tag to update
 * @param updateData - Data for updating the tag
 */
export const updateTag = async (id: string, updateData: UpdateTagDTO) => {

    const tag = await Tag.findById(validateAndCastObjectId(id));
    if (!tag) {
        throw new BaseError('Tag not found.', BaseErrorType.NotFound);
    }

    // Update tag properties
    Object.assign(tag, updateData);
    return await tag.save();
};

/**
 * Delete a tag
 * @param id - The ID of the tag to delete
 */
export const deleteTag = async (id: string) => {
    const tag = await Tag.findById(validateAndCastObjectId(id));
    if (!tag) {
        throw new BaseError('Tag not found.', BaseErrorType.NotFound);
    }

    // Check if the tag is used in any policies
    const isTagUsed = await Policy.exists({ tags: id });
    if (isTagUsed) {
        throw new BaseError('Cannot delete tag because it is associated with existing policies.', BaseErrorType.DeleteUsedItem);
    }

    await Tag.findByIdAndDelete(id);
    return { message: `Tag with ID ${id} deleted successfully.` };
};
