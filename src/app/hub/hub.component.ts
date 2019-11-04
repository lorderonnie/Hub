import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../user/user';
import { UserService } from "../user-service/user.service";

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit }
 
  user: User;

  constructor( private http:HttpClient,private userService:UserService) {}

  ngOnInit() {
    interface ApiResponse{
      name:string;
      location:string;
      followers:number;
      following:number;
      public_repos:number;
    };  
    this.http.get<ApiResponse>("https://api.github.com/users/lorderonnie?access_token=07baf7d4fd6660b35246bb26d0be54194bc4e92c").subscribe((data: { name: string; location: string; followers:number; following:number; public_repos:number; })=>{
      this.user = new User(data.name, data.location,data.followers,data.following,data.public_repos)
    },err=>{
      this.user = new User("Unknown","Location not found",0,0,0)
      console.log("An error occurred")
  }); 
    
    
  }
}
