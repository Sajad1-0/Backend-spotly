import { Request, Response } from "express";
import { roomRepository, CreateRoom, UpdateRoom } from "./rooms-Repository";
import { httpCodeStatus } from "../httpStatus";

const roomsController = new roomRepository();

export const createRooms = async (req: Request, res: Response) => {
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

export const deleteRoomById = async (req: Request, res: Response) => {
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
            message: 'Room has been deleted succesfully!', roomId
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

// find one room
export const findRoomById = async (req: Request, res: Response) => {

    try {
        const roomId = await roomsController.findOne(req.params.id);
        res.status(httpCodeStatus.OK).json({
            message: 'Room has been found', roomId
        })
    }
    catch (error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            error: (error as Error)
        })
    }
}

// update user
export const updateRoomById = async (req: Request, res: Response) => {
    const updateRoom = req.body as UpdateRoom;

    try {
        const updateId = await roomsController.update(req.params.id, updateRoom);

        if(!updateId) {
            res.status(httpCodeStatus.BAD_REQUEST).json({
                message: 'Room ID is required'
            })
            return
        }
        res.status(httpCodeStatus.OK).json({
            message: 'Room has been updated', updateId
        })
        
    } catch (error) {
        res.status(httpCodeStatus.NOT_FOUND).json({
            message: 'User has not been found', error
        })
    }
}