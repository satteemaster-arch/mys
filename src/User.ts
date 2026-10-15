import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    // never send the password hash back to the browser
    toJSON: {
        transform: (_doc, ret: Record<string, unknown>) => {
            delete ret.password;
            return ret;
        },
    },
});

export default mongoose.model<IUser>('User', UserSchema);
