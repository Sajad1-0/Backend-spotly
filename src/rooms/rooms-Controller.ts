import { Request, Response } from "express";
import { RoomService } from "./rooms-service";
import { httpCodeStatus } from "../httpStatus";

const roomsController = new RoomService();

export const createRooms = async (req: Request, res: Response) => {

    try {
        const roomId = await roomsController.create(req.body);
        res.status(httpCodeStatus.CREATED)
        .json({message: 'Rooms Created', roomId})
    }
    catch (error) {
        res.status(httpCodeStatus.NOT_FOUND)
        .json({error: (error as Error).message})
    }
}

export const deleteRoomById = async (req: Request, res: Response) => {
    const deleteRoom = req.params.id; 
    if(!deleteRoom) {
        res.status(httpCodeStatus.BAD_REQUEST).json({
            message: 'Room ID is required'
        })
        return
    }
    try {
        await roomsController.deleteRoom(deleteRoom)
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
    const allRooms = await roomsController.getAllRooms();
    res.status(httpCodeStatus.OK).json(allRooms)
}

// find one room
export const findRoomById = async (req: Request, res: Response) => {

    try {
        const roomId = await roomsController.findOneRoomById(req.params.id);
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

    try {
        const updateId = await roomsController.updateRoom(req.params.id, req.body);

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