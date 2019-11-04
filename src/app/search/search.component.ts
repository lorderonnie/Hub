import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../user/user';
import { UserService } from '../user-service/user.service';
import { error } from '@angular/compiler/src/util';
import { Repository } from  '../repository/repository';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  SearchUser:string;
  repositories: Repository[]=[]
  user: User;
  constructor( public userService:UserService) { }

  ngOnInit() {
    this.userService.userRequest("lorderonnie").then(
      (success)=>{
        this.user=this.userService.user;
        console.log(this.user)
      },
      (error)=>{
        console.log("cant find user")
      }
      );
      
  }
   
  search(){
  this.userService.userRequest(this.SearchUser).then(
  (success)=>{
    this.user=this.userService.user;
    console.log(this.user)
  },
  (error)=>{
    console.log("cant find user")
  }
  );
  } 
  repository(SearchUser){
    this.userService.userrepository(SearchUser).then(
      (success)=>{
        this.repositories=this.userService.repositories
        
      },
      (error)=>{
      
      }
    );
  }
}
