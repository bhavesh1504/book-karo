export class Bookings {
    constructor(
     public id: string,
     public placeId: string,
     public userId: string,
     public placetitle: string,
     public imageUrl: string,
     public guestNumber: number   
    ){}
}