import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightService } from './flight.service';
import { FlightInfo } from './flightInfo.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import "rxjs/Rx";
import { FlightInfoClass } from './flightInfo.class';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private keyword: string;
  private titleFilter: FormControl=new FormControl(); //use in html, bind data with [FormControl]
  
  constructor(private http:HttpClient, private flightService:FlightService, private fb: FormBuilder){
    // this.titleFilter.valueChanges
    // .debounceTime(500) //no trigger input value when user is type, after finished, it trigger. import'rxjs/Rx'
    // .subscribe(value=>{this.keyword=value});// titleFilter.valueChanges这个字段流，订阅它，传给keyword
  }

  title = 'flightSrch';
  filterStatus='';
  
 
  // flightInfo: FlightInfo;//FlightInfo[] is wrong???
  // error: Error; //??????
  // ngOnInit(){
  //   this.flightService.getFlightInfo()
  //   .subscribe((data:FlightInfo)=> {this.flightInfo = data;},
  //   error=>this.error=error
  //   );
  // //  console.log(this.flightInfo);
  // }

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

  filteredFlight:FlightInfoClass[]=[];
  flightForm:FormGroup;
  isLoading=false;

  ngOnInit(){
    // this.filteredFlight=this.fb.group({ // must has length!
    //   userInput:null
    // })
    console.log(this.flightForm);
    this.flightForm.get('userInput').valueChanges
    .pipe(
      debounceTime(500),
      tap(() => this.isLoading = true),
        switchMap(value => this.flightService.search({carrier: value}, 1)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => {this.filteredFlight = users.result;console.log(this.filteredFlight)});

  }

  displaySearch(item:FlightInfoClass){
    if(item){
      console.log("display-search");
      return item.carrier;
    }

  }

}
 