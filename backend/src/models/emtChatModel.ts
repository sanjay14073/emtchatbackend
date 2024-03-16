import mongoose, { Document } from 'mongoose';

interface EmtDocument extends Document {
    EmtId: string;
    UserId: string;
    HospitalId: string;
    message: string;
}

const EmtSchema = new mongoose.Schema<EmtDocument>({
    EmtId: {
        type: String,
       
    },
    UserId: {
        type: String,
       
    },
    HospitalId: {
        type: String,

    },
    message: {
        type: String,

    }
});

const EmtChatModel = mongoose.model<EmtDocument>('Emt', EmtSchema);

export default EmtChatModel;
