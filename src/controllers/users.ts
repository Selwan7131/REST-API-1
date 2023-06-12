import express from 'express';
import { getUsers, deleteUserById, getUserById } from 'db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsers

        return res.status(200).json(user);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// this is a controller to delete
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        // isntead of body at first accept parameters
        const {id} = req.params;
        // we are not checking any authentication because we will use middle wares
        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// update controller
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username){
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        user.username = username;
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}