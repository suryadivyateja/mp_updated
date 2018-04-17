import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppComponent } from "../app.component";
import { Title , Meta } from "@angular/platform-browser";
declare var $:any;
@Component({
  selector: 'app-financials',
  templateUrl: './payment-financials.component.html',
  styleUrls: ['./payment-financials.component.css','../settings/settings.component.css']
})
export class PaymentFinancialsComponent implements OnInit {

  constructor(private authService:AuthService,private title:Title,private app :AppComponent) { }
  pay_palEmail:String;
  user_id:String;
  pay_pal_updated_Email:String;
  agree:boolean = false;
  ngOnInit() {
    this.title.setTitle("Payments | MarketPlace");
    let u = localStorage.getItem('user');
    let user = JSON.parse(u);
    // console.log(user);
    this.user_id = user.id;
    let user_id = this.user_id;

    this.authService.getUser(user_id).subscribe(dat => {
      // console.log(dat.msg.pay_pal);
      this.pay_palEmail = dat.msg.pay_pal;
    })

  }

  saveSettings(){

    let u = localStorage.getItem('user');
    let user = JSON.parse(u);
    this.user_id = user.id;

    if(this.agree == true){
        let user_paypal = {
          pay_palEmail:this.pay_palEmail,
          user_id:this.user_id
        }          
          this.authService.authUpdateUser_paypal(user_paypal).subscribe(re => {
            let msg = {
              text:"PayPal Account Updated",
              from:"profile"
            }
            this.app.error_pop(msg);
          })

    }else{
      let msg = {
        text:"Please check I understand and agree",
      }
      this.app.error_pop(msg);
    }

  }

  handleChange(event){

    this.agree = event.target.checked;
    // console.log(this.agree);
    
  }

}
