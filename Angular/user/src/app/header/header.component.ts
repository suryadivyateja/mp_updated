import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ValidateService } from "../services/validate.service";
import { AuthService } from "../services/auth.service";
import { GigService } from "../services/gig.service";
import { Router , ActivatedRoute ,  } from "@angular/router";
import * as moment from "moment";
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private app:AppComponent,private validateService:ValidateService,private authService:AuthService,private gigService:GigService,private router:Router) { }

  user_id:string;
  showDarkBack = false;
  showLoginDiv = false;
  showLogin = false;
  showSignUp = false;
  showFpSent = false;
  showFpDiv = false;
  showAuthorSignUp = false;

  // Registration values
  regRole:string;
  regName:string;
  regEmail:string;
  regPassword:string;
  regLastName:string;
  //Login values
  loginEmail:string;
  loginPassword:string;

  public user:object;
  public uName:string;
  profile_pic:string;
  all:string;
  rc:any;
  or:any;
  vr:any;
  lp:any;
  forgot_email:string;
  not_arr = [];
  f_not_arr = [];
  not_num = [];
  f_not_num = [];
  unread_num:number = 0;
  new_not_arr = [];
  inb_num = 0;
  inb_msg=[];
  not_ids = [];
  name:string;
  ngOnInit() {
    $('.db').mouseup(function(e) 
    {
        var container = $(".login-div");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            $('.db').hide();

        }
    });

    this.oninit_trigger();
  }
  oninit_trigger(){
    if(this.authService.loggedIn()){
      let user = localStorage.getItem('user');
      if(user == null||user==undefined||user==''){
        this.user_id='';
      }else{
        let u = JSON.parse(user);
        this.user_id = u.id;
               this.authService.getUser(this.user_id).subscribe(user => {
                 console.log(user);
                 this.profile_pic = user.msg.profile_pic;
                 this.name = user.msg.name;
               });
           this.gigService.get_notifications(this.user_id).subscribe(not => {
              this.not_arr = not.msg;
              this.not_arr.forEach(element => {
                 this.not_ids.push(element.notification_id);
                if(element.status === "not_seen"){
                  this.not_num.push({
                   image:element.image.replace('public',''),
                   message:element.message,
                   date:moment(element.date).fromNow(),
                   dest:element.destination,
                   status:element.status,
                   link:element.link,
                   not_id:element._id
                  });
                  this.f_not_num = this.not_num.reverse();
                  this.unread_num = this.f_not_num.length;
                }       
              });          
           });
   
           // inbox msgs
           this.gigService.get_not_msgs(this.user_id).subscribe(inbox => {
             if(inbox.success === true){
               if(inbox.msg.length > 0){
                 inbox.msg.sort((a,b) => {
                   if(a.updatedon !== null && a.updatedon !== undefined && b.updatedon !== null && b.updatedon !== undefined){
                     return JSON.parse(b.updatedon) - JSON.parse(a.updatedon)
                   }
                 });
                 inbox.msg.forEach(conv => {
                   if(conv.status === 'notSeen'){
                     conv.users.forEach(user => {
                       if(user !== this.user_id){
                         this.authService.getUser(user).subscribe(sender => {
                           if(sender.success === true && sender.msg !== null){
                             let s = sender.msg;
                             let msgs = conv.msg;
                             msgs.reverse();
                             if(msgs[0].from !== this.user_id){
                               this.inb_msg.push({
                                 profile_pic:s.profile_pic.replace('public',''),
                                 name:s.name+" "+s.last_name,
                                 msg:msgs[0].msg,
                                 previous_msgs_length:msgs.length,
                                 time:moment(msgs[0].time).calendar(),
                                 conv_id:conv.conv_id
                               });
                               this.inb_num = this.inb_msg.length;
                             }
                           }
                         });
                       }
                     });
                   }
                 });
               }
             }
             
           });
         }
         this.not_trigger();
    }
  }

  not_trigger(){
    setInterval(()=>{
      if(this.authService.loggedIn()){
              this.gigService.get_notifications(this.user_id).subscribe(not => {
                // console.log(not);
                this.not_arr = not.msg;
                this.not_arr.forEach(element => {
                  if(element.status === "not_seen"){
                    // console.log(element);
                    if(this.not_ids.includes(element.notification_id) === false){
                      this.not_ids.push(element.notification_id);
                      this.f_not_num.push({
                      image:element.image.replace('public',''),
                      message:element.message,
                      date:moment(element.date).fromNow(),
                      dest:element.destination,
                      status:element.status,
                      link:element.link,
                      not_id:element._id
                     });
                     this.f_not_num.reverse();
                     this.unread_num = this.f_not_num.length;
                    }
                  }else{
                    if(this.not_ids.includes(element.notification_id) === true){
                      // console.log('includes');
                      this.f_not_num.splice(element);
                      this.not_ids.splice(element.notification_id);
                      this.unread_num = this.f_not_num.length;
                    }
                  }       
                });          
             });
    // inbox msgs 
    
             this.gigService.get_not_msgs(this.user_id).subscribe(inbox => {
               console.log(inbox);
               if(inbox.success === true){
                 if(inbox.msg.length >0){
                   inbox.msg.sort((a,b) => {
                    if(a.updatedon !== null && a.updatedon !== undefined && b.updatedon !== null && b.updatedon !== undefined){
                      // console.log(parseInt(a.updatedon));
                      return JSON.parse(b.updatedon) - JSON.parse(a.updatedon)
                    }
                  });
                  let inb_convid = [];
                  this.inb_msg.forEach(inb => {
                    inb_convid.push(inb.conv_id);
                  });
                    inbox.msg.forEach(conv => {
                      if(conv.status === 'notSeen'){
                        console.log(conv);
                       conv.users.forEach(user => {
                         if(user !== this.user_id){
                           this.authService.getUser(user).subscribe(sender => {
                             if(sender.success === true && sender.msg !== null){
                               let s = sender.msg;
                               let msgs = conv.msg;
                               msgs.reverse();
                               this.inb_msg.forEach(prev_inb_msg => {
                                 if(conv.conv_id === prev_inb_msg.conv_id){
                                   if(prev_inb_msg.previous_msgs_length < msgs.length){
                                     if(msgs[0].from !== this.user_id){
                                       inb_convid.push(conv.conv_id);
                                       prev_inb_msg.msg = msgs[0].msg;
                                       prev_inb_msg.time = moment(msgs[0].time).calendar();
                                     }
                                   }
                                 }
                               });
                               setTimeout(() => {
                                 if(inb_convid.includes(conv.conv_id) === false){
                                   if(msgs[0].from !== this.user_id){
                                     this.inb_msg.push({
                                      profile_pic:s.profile_pic.replace('public',''),
                                      name:s.name+" "+s.last_name,
                                      msg:msgs[0].msg,
                                      previous_msgs_length:msgs.length,
                                      time:moment(msgs[0].time).calendar(),
                                      conv_id:conv.conv_id
                                     });
                                     this.inb_num = this.inb_msg.length;
                                   }
                                 }
                               },0);
                             }
                           });
                         }
                       });
                     }else{
                       if(inb_convid.includes(conv.conv_id)){
                        this.inb_msg.forEach(inb => {
                          if(inb.conv_id === conv.conv_id){
                            this.inb_msg.splice(this.inb_msg.indexOf(inb),1);
                            inb_convid.splice(conv.conv_id,1);
                            this.inb_num = this.inb_msg.length;
                          }
                        })
                       }
                     }
                   });
                 }
               }
             });
            }
          },8000);
        }

  goto_seller(){
    this.router.navigate(['/seller'],{queryParams:{id:this.user_id}});
  }

  Logout(){
    if(this.router.url.includes('checkout') || this.router.url.includes('edit-gig') || this.router.url.includes('manage-sales') || this.router.url.includes('manage-orders') || this.router.url.includes('favorites') || this.router.url.includes('inbox') || this.router.url.includes('dashboard') || this.router.url.includes('create-gig') || this.router.url.includes('my-gigs') || this.router.url.includes('withdrawals') || this.router.url.includes('order-details') || this.router.url.includes('payments') || this.router.url.includes('notifications') || this.router.url.includes('feedback') || this.router.url.includes('settings')){
      this.router.navigate(['/home']);
      this.authService.logout();
      return false;
    }else{
      this.authService.logout();
      return false;      
    }
  }

  order_id:string;
  not_id:string;
  destination:string;
  
  goto_order_det(destination,order_id,not_id){
    
    this.destination = destination;
    this.not_id = not_id;
    this.order_id = order_id;
    let not = {
      not_id:this.not_id
    }
    this.gigService.change_not_status(not).subscribe(not => {
      console.log(not);
    });
    // this.unread_num--;
      switch (this.destination) {
        case "order-details":
        this.router.navigate(['/order-details'],{queryParams:{order_id:this.order_id}});
          break;
          case "gig":
          this.router.navigate(['/gig'],{queryParams:{id:this.order_id}});
        default:
          break;
      }
    
  }

  signInTriggerClicked(){
    $('.db').show();
    $('#sign-up-left').hide();
    $('#forgot-password').css({'display':'none'});
    $('#login-left').css({ 'display':'flex' });
  }
  registerTriggerClicked(){
    $('.db').show();
    $('#login-left').hide();
    $('#sign-up-left').show();
  }
  forgotPassword(){
    $('#login-left').hide();
    $('#sign-up-left').hide();
    $('#forgot-password').css({'display':'flex'});
  }
  // login
  activate_enter(event){
    if(event.keyCode == 13){
      this.LoginSubmit();
    }
  }
  LoginSubmit(){
    if(this.validateService.validateInput(this.loginEmail) && this.validateService.validateInput(this.loginPassword)){
      if(this.validateService.validateEmail(this.loginEmail)){
        this.authService.authenticateEmail(this.loginEmail).subscribe(data =>{
          if (data.success){
            let user = {
              email :this.loginEmail,
              password: this.loginPassword
            }
            this.authService.authenticateUser(user).subscribe(dat =>{
              if (dat.success){
                this.uName = dat.user.name;
                this.authService.storeUserData(dat.token, dat.user);
                // this.oninit_trigger();
                // this.closeShowBack(true);
                this.loginEmail = null;
                this.loginPassword = null;
                window.location.reload();
              }else{
                $('#login-err').html('Incorrect Password !')
              }
            });
          }else{
            $('#login-err').html('Email not found !')
            }
        });
      }else{
        switch(false){
          case this.validateService.validateEmail(this.loginEmail):
          $('#login-err').html('Please enter a valid email id')
        }
      }
    }else{
        switch(false){
          case this.validateService.validateInput(this.loginEmail):
          $('#login-err').html('Email Id cannot be left blank');
          break;
          case this.validateService.validateInput(this.loginPassword):
          $('#login-err').html('Password cannot be left blank')
          default:
          break;

        }
    }
  }

  // sign Up
  SignUp(){
    let newUser = {
      name:this.regName,
      last_name:this.regLastName,
      email : this.regEmail,
      pay_pal : this.regEmail,
      password : this.regPassword,
      date:moment(),
    };
    
    // Validate
    if(this.validateService.validateInput(this.regName) &&  this.validateService.validateInput(this.regLastName) && this.validateService.validateInput(this.regEmail) && this.validateService.validateInput(this.regPassword)){
      
      if(this.validateService.validateEmail(this.regEmail)){

        this.authService.authenticateEmail(this.regEmail).subscribe(res => {
           if(res.success == true){
            $('.err').css({'display':'block'});
             $('#signup-err').html('Email alredy exists');
           }else{
             // send the above values to backed for registration
             this.authService.registerUser(newUser).subscribe(res=>{
               console.log(res);
               if(res.success){
                   this.loginEmail = this.regEmail;
                   this.loginPassword = this.regPassword;
                   this.LoginSubmit();
                   this.regName = null;
                   this.regLastName = null;
                   this.regEmail = null;
                   this.regPassword = null;
                 }else{
                  $('.err').css({'display':'block'});
                  $('#signup-err').html('Registration Failed !!');
               }
             });
           }
        })        
      }else{
          $('.err').css({'display':'block'});
          $('#signup-err').html('Please enter a valid email');
      }
    }else{
      switch (false) {
        case this.validateService.validateInput(this.regName): 
        $('.err').css({'display':'block'});        
          $('#signup-err').html('Name required');
          break;         
          case this.validateService.validateInput(this.regEmail):  
          $('.err').css({'display':'block'});       
          $('#signup-err').html('Email required');
          break;
          case this.validateService.validateInput(this.regPassword): 
          $('.err').css({'display':'block'});        
          $('#signup-err').html('Password required');
          break;
      
        default:
          break;
      }      
    }    
  }

  // remove errors
  remove_errors(){
    $('#login-err').html('');
  }

  close_daimond(){
    $('.main').css({'display':'none'});
  }

  open_daimond(){
    $('.main').css({'display':'flex'});
  }

}
