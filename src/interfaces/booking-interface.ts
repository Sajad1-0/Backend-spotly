export interface Booking {
    id: string;
    roomID: string;
    userID: string;
    startTime: string;
    endTime: string;
}

export interface UpdateBooking {
    roomID?: string;
    userID?: string;
    startTime?: string;
    endTime?: string;
}

export interface CreateBookings extends Omit<Booking, 'id'> {}