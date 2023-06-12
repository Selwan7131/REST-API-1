import mongoose from "mongoose";

// every time we use one of the controllers to fetch we want to avoid fetching authentication objects by accident 
// meaning we dont want to fetch all users and provide the entire api with our authentication data
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type:String, required: true },
    // authentication model, object
    authentication:{
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

// Turn the schema into a model
export const UserModel = mongoose.model('User', UserSchema);

// write actions to be used in controllers
// Good pactice to keep them abstracted but for now this file will do fine

export const getUsers = () => UserModel.find();
// registering
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// logged in or not
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById( id );
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({ _id: id });
export const updateUser = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

