export class FlightInfoClass {
    constructor(public flightNumber: number , public carrier: string){}
}

export interface FlightInfoClassResp {
    result: FlightInfoClass[];
}