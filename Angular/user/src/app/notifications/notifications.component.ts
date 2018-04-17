import { Component, OnInit } from '@angular/core';
import { Title , Meta } from "@angular/platform-browser";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";
import { AppComponent } from "../app.component";
declare var $: any;
import * as moment from "moment";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private title: Title,private router:Router,private activatedRoute:ActivatedRoute,private authService:AuthService,private gigService:GigService,private app:AppComponent) { }

  user_id:string;
not_arr;
f_not_arr = [];
not_id:string;
order_id:string;
  ngOnInit() {
    this.title.setTitle("Notifications | MarketPlace");
      let user = localStorage.getItem('user');
      let u = JSON.parse(user);
      this.user_id = u.id;
        this.gigService.get_notifications(this.user_id).subscribe(not => {
          this.not_arr = not.msg;
          this.not_arr.forEach(element => {
            this.f_not_arr.push({
              image:element.image.replace('public',''),
              message:element.message,
              date:moment(element.date).fromNow(),
              status:element.status,
              destination:element.destination,
              link:element.link,
              not_id:element._id
            })
          });    
          this.f_not_arr.reverse();
          console.log(this.f_not_arr);
        })
      }

  goto_order_det(destination,order_id,not_id){
    console.log(destination,order_id);
      this.not_id = not_id;
      this.order_id = order_id;
      let not = {
        not_id:this.not_id
      }
      this.gigService.change_not_status(not).subscribe(not => {
        console.log(not);
      });
      switch(destination){
        case "gig":
        this.router.navigate(['/gig'],{queryParams:{id:order_id}});
        break;
        case "order-details":
        this.router.navigate(['/order-details'],{queryParams:{order_id:order_id}});
        break;
      }
  }

  all_read(){
      let user_id = {
        user_id:this.user_id
      }
      this.gigService.mark_all_read(user_id).subscribe(not => {
        console.log(not);
        if(not.success){
          let msg = {
            text:"Marked as All Read",
            from:'profile'
          }
          this.app.error_pop(msg);
        }
      })
  }
}
