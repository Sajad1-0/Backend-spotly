import { CreateRoom, UpdateRoom } from "../interfaces/room-interface";
import { roomRepository } from "./rooms-Repository";

const roomService = new roomRepository();

export class RoomService {
    async create(room: CreateRoom) {
        return await roomService.create(room)
    }

    async getAllRooms() {
        return await roomService.findAllRooms()
    }

    async findOneRoomById(id: string) {
        return await roomService.findOne(id)
    }

    async updateRoom(id: string, updateRoom: UpdateRoom) {
        return await roomService.update(id, updateRoom)

    }

    async deleteRoom(id: string) {
        return await roomService.delete(id)
    }
}