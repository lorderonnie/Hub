import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../user/user';
import { Repository } from  '../repository/repository';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  apikey: string;
  repositories: Repository[]=[]
  userName:string;
  constructor(private http: HttpClient) {
    this.user = new User("", "", 0, 0, 0)
  }

  userRequest(newUser:string) {
    this.userName = newUser;
    interface ApiResponse {
      name: string,
      location: string,
      followers: number,
      following: number,
      public_repos: number,
    }
    let apiurl="https://api.github.com/users/"+newUser+"?access_token="+environment.apikey;
    let promise = new Promise((resolve, reject) => {
      this.http.get<ApiResponse>(apiurl).toPromise().then(
        (response) => {
        this.user=response;
        console.log(response)
        resolve()
        
      },
      error=>{
        this.user.name = "Unknown"
        this.user.location = "Location not found"
        this.user.followers = 0
        this.user.following = 0
        this.user.public_repos = 0
        reject(error)
      })
    })
    return promise
  }
  userrepository(SearchUser:string){
     
    interface ApiResponse {
      name:string,
      full_name:string,
      created_at:Date,
      pushed_at:Date,
      language:string,
      size:number,
      html_url:string,
      length:number,
    }
    let getrepos="https://api.github.com/users/"+this.userName+"/repos?access_token="+environment.apikey;
    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiResponse[]>(getrepos).toPromise().then(
        (hubrepos)=>{
          console.log(hubrepos)
          this.repositories =[];
           for (let i =0;i < hubrepos.length;i++){
            let repository =new Repository(hubrepos[i].name,hubrepos[i].full_name,hubrepos[i].created_at,hubrepos[i].pushed_at,hubrepos[i].language,hubrepos[i].size,hubrepos[i].html_url)
           
            this.repositories.push(repository);   
            console.log(this.repositories)         
          }
          resolve()
        },
        (error)=>{
          alert("cant work")
          
          reject();
        }
      );
    });
    return promise;
  }
  
}


