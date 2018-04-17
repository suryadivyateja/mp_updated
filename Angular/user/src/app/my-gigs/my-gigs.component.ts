import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';


import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service"; 
import { forEach } from '@angular/router/src/utils/collection';
import * as moment from 'moment';
// import * as async from 'async';
declare var $: any;

@Component({
  selector: 'app-my-gigs',
  templateUrl: './my-gigs.component.html',
  styleUrls: ['./my-gigs.component.css']
})
export class MyGigsComponent implements OnInit {

  constructor(private title: Title,private authService:AuthService,private gigService:GigService,private activatedRoute: ActivatedRoute,private router: Router) { }

user_id:string;
name:string;
greeting:boolean;
gigs;
orders;
final=[];
or_num:number;
to_be_del_id;
n_gig:string;
completed=[];
inprogress=[];
cancelled=[];
deactive = [];
rejected = [];
all=[];
active = [];

assigned_days;
total_ext_days;
project_days;
pro_com_date;
pro_pic:string;
  ngOnInit() {

    $('.m-l-btn').click(function(event){
      $('.m-l-btn').removeClass('selected-index');
      $(event.target).addClass('selected-index');
    });

    this.n_gig = this.activatedRoute.queryParams['_value'].gig;
    if(this.n_gig == 'newgig'){
      this.greeting = true;
    }else{
      this.greeting = false;
    }
    
    if(this.activatedRoute.queryParams['_value'].gig == 'newgig'){
      $('#new-gig').show();
    }else{
      $('#new-gig').hide();
    }
    if(this.activatedRoute.queryParams['_value'].gig == 'updategig'){
      $('#gig-update').show();
    }else{
      $('#gig-update').hide();
    }
    this.title.setTitle('Gig Details - Market Place');
    $('.click').click(function(){
        alert('hi')
      });
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;
    this.authService.getUser(this.user_id).subscribe(user => {
        this.name = user.msg.name;
        this.pro_pic = user.msg.profile_pic;
    this.gigService.get_gigsby_id(this.user_id).subscribe(gigs => {
      console.log(gigs);
      if(gigs.success){
        gigs.msg.forEach(gig => {
          var total_score = 0;
          this.gigService.get_reviews_gigid(gig._id).subscribe(rev => {
            console.log(rev);
            if(rev.success){
              if(rev.msg.length > 0){
                rev.msg.forEach(review => {
                  total_score += JSON.parse(review.score);
                });
                console.log(total_score);
                switch (total_score) {
                  case 1:
                    gig.rating = ['../assets/star-on1.png','../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png',];
                  break;
                  case 2:
                    gig.rating = ['../assets/star-on1.png','../assets/star-on1.png','../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png',];
                  break;
                  case 3:
                    gig.rating = ['../assets/star-on1.png','../assets/star-on1.png','../assets/star-on1.png','../assets/star-off1.png','../assets/star-off1.png',];
                  break;
                  case 4:
                    gig.rating = ['../assets/star-on1.png','../assets/star-on1.png','../assets/star-on1.png','../assets/star-on1.png','../assets/star-off1.png',];
                  break;
                  case 5:
                    gig.rating = ['../assets/star-on1.png','../assets/star-on1.png','../assets/star-on1.png','../assets/star-on1.png','../assets/star-on1.png',];
                  break;
                
                  default:
                    break;
                }
              }else{
                gig.rating = ['../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png',];                
              }
            }else{
              gig.rating = ['../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png','../assets/star-off1.png',];                
            }
          });
          gig.name = this.name;
          gig.pro_pic = this.pro_pic;
          this.all.push(gig);
          this.final.push(gig)
          if(gig.pause === true){
            this.deactive.push(gig);
          }else{
            this.active.push(gig);
          }
        });
      }
    });
  });
}
// d=1;
open_drop(event){
//  this.d++;
//  if(this.d%2 === 0){
//    $(event.target).parent().find('.sales-drop').css({'display':'block'});
//   }else{    
//     $(event.target).parent().find('.sales-drop').css({'display':'none'});
//  }
  $('.sales-drop').css({'display':'none'});
  $(event.target).parent().find('.sales-drop').css({'display':'block'});
}

// pause gig
pause_gig(gig){
 console.log(gig);
 let g = {
   gig_id:gig._id
 }
 this.gigService.pause_gig(g).subscribe(res => {
   console.log(res);
   if(res.pause){
     gig.pause = true;
   }else{
     gig.pause = false;
   }
 });
}
  go_to_gig(cat){
    switch (cat) {
      case "Deactive":
        this.final = this.deactive;
        $('#comp').addClass('border1');
        $('#progress').removeClass('border1');
        $('#cancelled').removeClass('border1');
        $('#all').removeClass('border1');
        break;
      case "active":
        this.final = this.active;
        $('#progress').addClass('border1');
        $('#comp').removeClass('border1');
        $('#cancelled').removeClass('border1');
        $('#all').removeClass('border1');
        break;
      case "Rejected":
        this.final = this.rejected;
        $('#cancelled').addClass('border1');
        $('#progress').removeClass('border1');
        $('#comp').removeClass('border1');
        $('#all').removeClass('border1');
        break;
      case "all":
        this.final = this.all;
        $('#all').addClass('border1');
        $('#progress').removeClass('border1');
        $('#cancelled').removeClass('border1');
        $('#comp').removeClass('border1');
        break;
    
      default:
        break;
    }
  }
  hide_greeting(){
    $('.custom-order-div-back').hide();
  }

  goto_gig_det(gig_id){
    this.router.navigate(["/gig"],{queryParams:{id:gig_id}});
    // alert(gig_id);
  }

  goto_edit_gig(gig_id){
    this.router.navigate(["/edit-gig"],{queryParams:{id:gig_id}});
  }
  temp_obj = {};
  delete_gig(gig){
    $('.dark-pop').css({'display':'flex'});
    this.to_be_del_id = gig.gig_id;
    this.temp_obj = gig;
  }
  close_pop(){
    $('.dark-pop').css({'display':'none'});
    // $('.pop-up').hide();

  }

  fin_delete_gig(){
      let gig_id = this.to_be_del_id;
     this.gigService.delete_gig(gig_id).subscribe(res => {
      console.log(res);
      if(res.success){
        let index_num = this.final.indexOf(this.temp_obj);
        this.final.splice(index_num,1);
        this.all.splice(index_num,1);
        $('.gig-pop-div-back').css({'display':'none'});
        $('.pop-up').hide();
      }
    })
  }
  closeDB(){
    $('.pdb').hide();
  }
}
