import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { FlightInfo } from './flightInfo.model';
import { FlightInfoClass, FlightInfoClassResp } from './flightInfo.class';
import {Observable, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  flightInfoUrl='../assets/flight-info.json';

  // getFlightInfo(){ //return an observable of FlightInfo
  //   return this.http.get<FlightInfo>(this.flightInfoUrl)
  //   .pipe(
  //     catchError(this.handleError)
  //   ); //pipe this Observable through to the error handler
  // }
  // private handleError(error:HttpErrorResponse){
  //   if(error.error instanceof ErrorEvent){
  //     console.error('an error occurred:', error.error.message)
  //   }//this above is 2nd type error: client-side or network errors
  //   else{
  //     console.error(
  //       `Backend returned code ${error.status}`+
  //       `body was: ${error.error}`);
  //   }// server reject req, return HTTP resp with 404 or 500
  //   return throwError(
  //     'Sth bad happened; Tray again!'
  //   )
  // }
  // //return a full resp 
  // getFlightInfoResponse():Observable<HttpResponse<FlightInfo>>{
  //   return this.http.get<FlightInfo>(this.flightInfoUrl,{observer:'response'});
  // }// .get returns an observable

  search(filter:{carrier:string}={carrier:''},page=1):
  Observable<FlightInfoClassResp>{
    return this.http.get<FlightInfoClassResp>(this.flightInfoUrl)
    .pipe(
      tap((response:FlightInfoClassResp)=>{
        response.result=response.result
        .map<FlightInfoClass>(flightInfoClass => new FlightInfoClass(flightInfoClass.flightNumber,flightInfoClass.carrier))
        .filter(flightInfoClass=>flightInfoClass.carrier.includes(filter.carrier))

        return response;
      })
    );
  }
}
