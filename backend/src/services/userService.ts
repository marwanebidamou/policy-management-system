import { SignInDTO, SignInResponseDTO, SignUpDTO, SignUpResponseDTO, SignUpResponseStatus } from "../dtos/user.dto";
import User from "../models/User";
import { comparePassword } from "../utils/passwordUtil";


/**
 * Sign in
 * @param info - Sign in data
 */
export const signIn = async (info: SignInDTO): Promise<SignInResponseDTO> => {
    const user = await User.findOne({ $or: [{ email: info.username }, { username: info.username }] });
    if (!user) {
        return { success: false }
    }

    const isMatch = await comparePassword(info.password, user.password);
    if (!isMatch) {
        return { success: false }
    }

    return { success: true }
};

export const isUsernameExists = async (username: String): Promise<{ exists: boolean }> => {
    let isExist = await User.exists({ username: username })
    return { exists: !!isExist };
}

export const isEmailExists = async (email: String): Promise<{ exists: boolean }> => {
    let isExist = await User.exists({ email: email })
    return { exists: !!isExist };
}

export const signUp = async (info: SignUpDTO): Promise<SignUpResponseDTO> => {
    const isEmailUsed = await isEmailExists(info.email);
    if (isEmailUsed.exists) {
        return { success: false, status: SignUpResponseStatus.EmailAlreadyInUse };
    }
    const isUsernameUsed = await isUsernameExists(info.email);
    if (isUsernameUsed.exists) {
        return { success: false, status: SignUpResponseStatus.UsernameAlreadyInUse };
    }

    let newUser = new User(info);
    newUser = await newUser.save();

    return {
        success: true,
        user: {
            email: newUser.email,
            username: newUser.username,
            _id: newUser._id.toString()
        }
    }
};