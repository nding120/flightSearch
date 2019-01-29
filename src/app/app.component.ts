import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightService } from './flight.service';
import { FlightInfo } from './flightInfo.model';
import { FormControl } from '@angular/forms';
import "rxjs/Rx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private keyword: string;
  private titleFilter: FormControl=new FormControl(); //use in html, bind data with [FormControl]
  constructor(private http:HttpClient, private flightService:FlightService){
    this.titleFilter.valueChanges
    .debounceTime(500) //no trigger input value when user is type, after finished, it trigger. import'rxjs/Rx'
    .subscribe(value=>{this.keyword=value});// titleFilter.valueChanges这个字段流，订阅它，传给keyword
  }

  title = 'flightSrch';
  filterStatus='';
  
 
  flightInfo: FlightInfo;//FlightInfo[] is wrong???
  error: Error; //??????
  ngOnInit(){
    this.flightService.getFlightInfo()
    .subscribe((data:FlightInfo)=> {this.flightInfo = data;},
    error=>this.error=error
    );
  //  console.log(this.flightInfo);
  }

  // //full response
  // showFlightInfoResponse(){
  //   this.flightService.getFlightInfoResponse()//HttpResponse<FlightInfos>
  //   .subscribe(resp=>{ 
  //     //display headers
  //     const keys=resp.headers.keys();
  //     this.headers=keys.map(key=>`${key}:${resp.headers.get(key)}`);
  //     //access the body , type as flightInfo
  //     this.flightInfo={...resp.body};
  //   });
  // }
}
 