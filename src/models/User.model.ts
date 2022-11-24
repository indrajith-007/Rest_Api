import { prop, getModelForClass, modelOptions, Severity, DocumentType, pre } from '@typegoose/typegoose';
import argon2 from 'argon2';
import log from '../utils/logger';

@pre<User>('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const hash = await argon2.hash(this.password);
    this.password = hash;
})
@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ required: true, type: () => String, unique: true })
    userId!: string;

    @prop({ required: true, type: () => String })
    username!: string;

    @prop({ lowercase: true, unique: true, required: true, type: () => String })
    email!: string;

    @prop({ required: true, type: () => String })
    password!: string;

    @prop({ required: true, type: Boolean, default: false })
    active!: boolean;

    @prop({ type: Number })
    code?: number;

    @prop({ type: Number, default: null })
    passwordResetToken?: number;

    @prop({ type: () => String, default: null })
    accessToken?: string;
}

export const validatePwd = async (inputpassword: string, candidatePwd: string) => {
    try {
        await argon2.verify(inputpassword, candidatePwd);
    } catch (e) {
        log.error('Could not verify');
        log.error(e);
        return false;
    }
};

export const UserModel = getModelForClass(User);
