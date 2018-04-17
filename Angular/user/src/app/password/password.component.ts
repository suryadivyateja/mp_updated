import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Title , Meta } from "@angular/platform-browser";
import { AppComponent } from "../app.component";
declare var $:any;
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css','../settings/settings.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private authService:AuthService, private validate:ValidateService,private title:Title,private app:AppComponent) { }

  currentPassword:any;
  newPassword:any;
  conformPassword:any;
  user_id:any;
  email:String;
  ngOnInit() {
    this.title.setTitle("ChangePassword | MarketPlace");

  }
  update_pass(event){
    if(event.keyCode == 13){
      this.changePassword();
    }
  }
  
  changePassword(){
    let u = localStorage.getItem('user');
    let user = JSON.parse(u);
    this.user_id = user.id;
    this.email = user.email;

    if(this.validate.validateInput(this.currentPassword) && this.validate.validateInput(this.newPassword) && this.validate.validateInput(this.conformPassword)){
      if(this.newPassword == this.conformPassword){
            let user_det = {
              user_id:this.user_id,
              password:this.currentPassword,
              newPassword:this.newPassword
            }    
            // console.log(user_det);
                this.authService.authPassword(user_det).subscribe(res =>{
                  console.log(res);
                  if(res.success){
                    let msg = {
                      text:"Password Updated Successfully",
                      from:"profile"
                    }
                    this.app.error_pop(msg);
                  }else{
                    $('#err').html("Incorrect Password !");
                  }
                });
            }else{
              $('#err').html("new password must match with conform password")
            // alert("new password must match with conform password");
          }
        }else{ 
          $('#err').html("cannot be left blank")
          // alert("cannot be left blank");
        }
      }
}
