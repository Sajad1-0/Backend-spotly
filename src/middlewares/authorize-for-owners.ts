import { Request, Response, NextFunction } from "express";
import { Role } from "../users/user-roles";
import { httpCodeStatus } from "../httpStatus";
import { AuthenticateRequest } from "../interfaces/booking-interface";
import { BookingService } from "../bookings/booking-service";

const bookingService = new BookingService();

export const authorizeForOwners = async (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    
    const bookingID = req.params.id;
    const {userID: requesterUserID, role} = req.jwtPayload || {}

    if(role === Role.Admin) next()

    const {userID: ownerUserID} = await bookingService.findOne(bookingID);

    if(requesterUserID === ownerUserID) next();

    res.status(httpCodeStatus.NOT_AUTHORIZED)
    .send(`User with this ${ownerUserID} hasn't any rights for this booking: ${bookingID}`)

}
