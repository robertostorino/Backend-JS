import mongoose from 'mongoose';

export const connect = async (URL) => {
    try {
        await mongoose.connect(`${URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Atlas connected')
    } catch (error) {
        console.log('Something goes wrong ' + error)
    }
};