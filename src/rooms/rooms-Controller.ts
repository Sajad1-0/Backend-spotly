import { Request, Response } from "express";
import { roomRepository, CreateRoom, UpdateRoom } from "./rooms-Repository";
import { httpCodeStatus } from "../httpStatus";

const roomsController = new roomRepository();

export const CreateRooms = async (req: Request, res: Response) => {
    const createRoom = req.body as CreateRoom;

    try {
        const roomId = await roomsController.create(createRoom);
        res.status(httpCodeStatus.CREATED)
        .json({message: 'Rooms Created', roomId})
    }
    catch (error) {
        res.status(httpCodeStatus.NOT_FOUND)
        .json({error: (error as Error).message})
    }
}

export const deletingRooms = async (req: Request, res: Response) => {
    const deleteRoom = req.body as UpdateRoom;
    if(!deleteRoom.id) {
        res.status(httpCodeStatus.BAD_REQUEST).json({
            message: 'Room ID is required'
        })
        return
    }
    try {
        const roomId = await roomsController.delete(deleteRoom.id)
        res.status(httpCodeStatus.OK).json({
            message: 'Room has been deleted succesfully!', deleteRoom
        })
    }
    catch(error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (error as Error).message
        })
    }
}

export const findAllRooms = async (req: Request, res: Response) => {
    const allRooms = await roomsController.findAllRooms();
    res.status(httpCodeStatus.OK).json(allRooms)
}