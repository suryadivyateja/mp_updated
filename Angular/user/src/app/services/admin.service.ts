import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AdminService {

  constructor(private http:Http) { }

  adminToken:any;

  // authenticate amin
  authenticate(admin){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post("http://localhost:3000/admin/auth_admin",admin,{headers:header}).map(res => res.json());
    // return this.http.post("admin/auth_admin",admin,{headers:header}).map(res => res.json());
  }

  // loggedIn
  loggedIn(){
    return tokenNotExpired('adminToken');
  }

  // get all users
  get_all_users(){
    return this.http.get("http://localhost:3000/admin/get_all_users").map(res => res.json());
    // return this.http.get("admin/get_all_users").map(res => res.json());
  }
  
  // get all gigs
  get_all_gigs(){
    return this.http.get("http://localhost:3000/admin/get_all_gigs").map(res => res.json());
    // return this.http.get("admin/get_all_gigs").map(res => res.json());
  }
  
}
