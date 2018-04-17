import { Component, OnInit,AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router , ActivatedRoute , Params } from "@angular/router";
import { GigService } from "../services/gig.service";
import { AuthService } from "../services/auth.service";
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private title: Title , private activatedRoute:ActivatedRoute , private gigService:GigService,private authService:AuthService) { }

from_id:string;
conv_id:string;
to_id:string;
msg:string;
current_index:number;
side_conv = [];
all_det = [];
display_msgs = [];
url_conv:string;
last_msg_id:string;
unread_number:number;
selected = false;
  ngOnInit() {

    this.scrollToBottom();

    this.title.setTitle('Inbox - Market Place');
    let user = localStorage.getItem('user');
    if(user === null || user === undefined){
      this.from_id = ''
    }else{
      let u = JSON.parse(user);
      this.from_id = u.id;
    }
    if(this.activatedRoute.queryParams['_value'].conv_id !== null || this.activatedRoute.queryParams['_value'].conv_id !== undefined){
      this.url_conv = this.activatedRoute.queryParams['_value'].conv_id;
    }
    $('.send-div').css({'display':'none'});
    // getting all messages of user
    this.get_all_conversations();
      this.run_intervel();
  }
  
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  get_all_conversations(){
    this.unread_number = 0;
    this.gigService.get_conversations(this.from_id).subscribe(all_conv => {
      console.log(all_conv);
      this.all_det = all_conv;
      if(all_conv.msg.length !== 0){
        all_conv.msg.forEach(conversation => {
          if(conversation.status === "notSeen"){
            this.unread_number++;
          }
          conversation.users.forEach(user => {
            if(user !== this.from_id){
              let last_msg:string;
              this.authService.getUser(user).subscribe(sender_det => {
                // console.log(sender_det);
                if(sender_det.success === true){
                  let sender = sender_det.msg;
                  let msgs = conversation.msg.reverse();
                  if(msgs.length > 0){
                    if(msgs[0].from === this.from_id){
                      if(conversation.conv_id === this.url_conv){
                        this.side_conv.push({
                          sender_name:sender.name+" "+sender.last_name,
                          sender_pic:sender.profile_pic.replace('public',''),
                          last_msg:"<b>YOU:</b>"+" "+msgs[0].msg.substr(0,13),
                          time:moment(msgs[0].time).calendar(),
                          temp_time:msgs[0].time,
                          conv_id:conversation.conv_id,
                          to_id:user,
                          all_msgs:msgs.reverse(),
                          selected:true,
                        });
                      }else{
                        this.side_conv.push({
                          sender_name:sender.name+" "+sender.last_name,
                          sender_pic:sender.profile_pic.replace('public',''),
                          last_msg:"<b>YOU:</b>"+" "+msgs[0].msg.substr(0,13),
                          time:moment(msgs[0].time).calendar(),
                          temp_time:msgs[0].time,
                          conv_id:conversation.conv_id,
                          to_id:user,
                          all_msgs:msgs.reverse(),
                          selected:false,
                        });
                      }
                    }else{
                      if(conversation.conv_id === this.url_conv){
                        this.side_conv.push({
                          sender_name:sender.name+" "+sender.last_name,
                          sender_pic:sender.profile_pic.replace('public',''),
                          last_msg:msgs[0].msg.substr(0,18),
                          time:moment(msgs[0].time).calendar(),
                          temp_time:msgs[0].time,
                          conv_id:conversation.conv_id,
                          to_id:user,
                          all_msgs:msgs.reverse(),
                          selected:true,
                        });
                      }else{
                        this.side_conv.push({
                          sender_name:sender.name+" "+sender.last_name,
                          sender_pic:sender.profile_pic.replace('public',''),
                          last_msg:msgs[0].msg.substr(0,18),
                          time:moment(msgs[0].time).calendar(),
                          temp_time:msgs[0].time,
                          conv_id:conversation.conv_id,
                          to_id:user,
                          all_msgs:msgs.reverse(),
                          selected:false,
                        });
                      }
                    }
                  }else{
                    if(conversation.conv_id === this.url_conv){
                      this.side_conv.push({
                        sender_name:sender.name+" "+sender.last_name,
                        sender_pic:sender.profile_pic.replace('public',''),
                        last_msg:"<b>Start Conversation !</b>",
                        time:moment(msgs[0].time).fromNow(),
                        temp_time:msgs[0].time,
                        conv_id:conversation.conv_id,
                        to_id:user,
                        all_msgs:[],
                        selected:true,
                      });
                    }else{
                      this.side_conv.push({
                        sender_name:sender.name+" "+sender.last_name,
                        sender_pic:sender.profile_pic.replace('public',''),
                        last_msg:"<b>Start Conversation !</b>",
                        conv_id:conversation.conv_id,
                        to_id:user,
                        all_msgs:[],
                        selected:false,
                      });
                    }
                  }
                }else{
                  this.side_conv.push({
                    sender_name:"******",
                    sender_pic:"../../assets/icons/001_when_user_has_no_profile_screen_mouse_hover.png",
                    last_msg:"<b>This user no longer exists</b>",
                    conv_id:conversation.conv_id,
                    // to_id:user,
                    all_msgs:[],
                    selected:false,
                  });
                }
                this.side_conv.sort((a,b) => {
                  return JSON.parse(moment(b.temp_time).format('x')) - JSON.parse(moment(a.temp_time).format('x'))
                });
                console.log(this.side_conv);
              });
            }
          });
        });
      }
    });
  }

  // switch_conv(conv_id,index){
  //   $('.send-div').css({'display':'flex'});
  //   this.display_msgs = [];
  //   clearInterval(this.run_intervel);
  //   this.conv_id = '';
  //   this.current_index = null;
  //   this.gigService.get_conv_conv_id({conv_id:conv_id,from:this.from_id}).subscribe(res => {
  //     // console.log(res);
  //     if(res.success){
  //       this.conv_id = res.msg[0].conv_id;
  //       this.current_index = index;
  //       this.display_msgs = res.msg;
  //       console.log(this.display_msgs);
  //     }
  //   });
  // }
  switch_conv(conv_id,index){
    this.selected = true;
    this.display_msgs = [];
    var temp_dis = [];
    this.conv_id = '';
    this.current_index = null;
   var change = new Promise((resolve,reject) =>{
     this.side_conv.forEach(conv => {
       conv.selected = false;
     });
     resolve(true);
   });
   change.then((msg) => {
      if(msg === true){
        if(this.side_conv[index].all_msgs[this.side_conv[index].all_msgs.length-1].from !== this.from_id){
          this.gigService.change_status(conv_id).subscribe(sta => {
            console.log(sta);
          }); 
        }
        this.side_conv[index].selected = true;
        this.conv_id = this.side_conv[index].conv_id;
        this.to_id = this.side_conv[index].to_id;
        this.current_index = index;
      }
      var all_msg_length = this.side_conv[index].all_msgs.length;
      this.side_conv[index].all_msgs.forEach((msg,index) => {
        if(msg.from === this.from_id){
          this.authService.getUser(msg.from).subscribe(res1 =>{
            temp_dis.push({
              status:true,
              message:msg.msg,
              conv_id:this.conv_id,
              pic:res1.msg.profile_pic.replace('public',''),
              time:msg.time,
              display_time:moment(msg.time).fromNow()
            });
            temp_dis.sort((a,b) => {
              return JSON.parse(moment(a.time).format('x')) - JSON.parse(moment(b.time).format('x'));
            });
            if(index === all_msg_length-1){
              // $('.send-div').css({'display':'flex'});
              // $('.messages-div-text').css({'display':'block'});
              // $('.spinner').css({'display':'none'});
            }
          });
        }
        if(msg.from !== this.from_id){
          this.authService.getUser(msg.from).subscribe(res2 =>{
            if(res2.success === true){
              temp_dis.push({
                status:false,
                message:msg.msg,
                conv_id:this.conv_id,
                pic:res2.msg.profile_pic.replace('public',''),
                time:msg.time,
                display_time:moment(msg.time).fromNow()
              });
              temp_dis.sort((a,b) => {
                return JSON.parse(moment(a.time).format('x')) - JSON.parse(moment(b.time).format('x'));
              });
              if(index === all_msg_length-1){
                $('.send-div').css({'display':'flex'});
              $('.messages-div-text').css({'display':'block'});
              $('.spinner').css({'display':'none'});
              }
            }
          });
        }
      });
      this.display_msgs = temp_dis;
      console.log(this.display_msgs);
   });
    // $(".messages-div").animate({ scrollTop: $('.messages-div').prop('scrollHeight')}, 100);
  }
oldconvids = [];
run_intervel(){
  setInterval(() => {
      this.oldconvids = [];
      this.side_conv.forEach(side => {
        this.oldconvids.push(side.conv_id);
      }); 
        this.gigService.get_conversations(this.from_id).subscribe(all_conv => {
          // console.log(all_conv);
          if(all_conv.msg.length>0){
            all_conv.msg.sort((a,b) => {
              if(a.updatedon !== null && a.updatedon !== undefined && b.updatedon !== null && b.updatedon !== undefined){
                return JSON.parse(b.updatedon) - JSON.parse(a.updatedon)
              }
            });
            this.unread_number = 0;
            var a = 0;
                all_conv.msg.forEach(newconvs => {
                  if(this.oldconvids.includes(newconvs.conv_id) === false){
                    newconvs.users.forEach(user =>{
                      if(user !== this.from_id){
                        this.authService.getUser(user).subscribe(sender_det => {
                          if(sender_det.success){
                            let sender = sender_det.msg;
                            if(newconvs.msg.length > 0){
                              let msgs = newconvs.msg.reverse();
                              if(newconvs.status === "notSeen"){
                                if(msgs[0].from !== this.from_id){
                                  a++;
                                  this.unread_number = a;
                                }else{
                                  this.unread_number = a;
                                }
                              }
                              if(msgs[0].from === this.from_id){
                                this.side_conv.push({
                                sender_name:sender.name+" "+sender.last_name,
                                sender_pic:sender.profile_pic.replace('public',''),
                                last_msg:"<b>YOU:</b>"+" "+msgs[0].msg.substr(0,13),
                                time:moment(msgs[0].time).calendar(),
                                temp_time:msgs[0].time,
                                conv_id:newconvs.conv_id,
                                to_id:user,
                                all_msgs:msgs.reverse(),
                                selected:false,                                             
                              });
                              this.side_conv.sort((a,b) => {
                                return JSON.parse(moment(b.temp_time).format('x')) - JSON.parse(moment(a.temp_time).format('x'))
                              });
                              }else{
                                this.side_conv.push({
                                sender_name:sender.name+" "+sender.last_name,
                                sender_pic:sender.profile_pic.replace('public',''),
                                last_msg:msgs[0].msg.substr(0,18),
                                time:moment(msgs[0].time).calendar(),
                                temp_time:msgs[0].time,
                                conv_id:newconvs.conv_id,
                                to_id:user,
                                all_msgs:msgs.reverse(),
                                selected:false,                                         
                              });
                              this.side_conv.sort((a,b) => {
                                return JSON.parse(moment(b.temp_time).format('x')) - JSON.parse(moment(a.temp_time).format('x'))
                              });
                              }
                            }
                          }
                        });
                      }
                    })
                  }
                });
            all_conv.msg.forEach(conv => {
              this.side_conv.forEach(side => {
                  if(conv.conv_id === side.conv_id){
                    // console.log(1);
                    if(side.all_msgs.length < conv.msg.length){
                      conv.users.forEach(user => {
                        if(user !== this.from_id){
                          // console.log(2);
                          this.authService.getUser(user).subscribe(sender_det => {
                            if(sender_det.success){
                              side.last_msg = conv.msg.reverse()[0].msg.substr(0,18);
                              side.temp_time = conv.msg.time;
                              side.time = moment(conv.msg.time).calendar();
                              side.all_msgs = conv.msg.reverse();
                              if(this.display_msgs.length > 0){
                                // console.log(3);
                                var reversemsg = conv.msg.reverse();
                                // console.log(this.display_msgs.length);
                                var numofmsgsunread = side.all_msgs.length - this.display_msgs.length;
                                for(let i = numofmsgsunread ; i>0 ; i--){
                                  if(conv.msg[i-1].from !== this.from_id){
                                    this.authService.getUser(conv.msg[i-1].from).subscribe(sender => {
                                      this.display_msgs.push({
                                        status:false,
                                        message:reversemsg[i-1].msg,
                                        conv_id:this.conv_id,
                                        pic:sender.msg.profile_pic.replace('public',''),
                                        time:reversemsg[i-1].time,
                                        display_time:moment(reversemsg[i-1].time).fromNow()
                                      });
                                    });
                                  }
                                }
                              }
                            }
                          });
                        }
                      });
                    }
                  }
              });
            });
            this.side_conv.sort((a,b) => {
              return JSON.parse(moment(b.temp_time).format('x')) - JSON.parse(moment(a.temp_time).format('x'))
            });
            console.log(this.side_conv);
          }
        });
    },5000);
}
    // $(".messages-div").animate({ scrollTop: $('.messages-div').prop('scrollHeight')}, 1000);
  // }

  // send msg on enter
  send_msg_enter(event){
    if(event.keyCode == 13){
        this.send_msg();  
      }
  }

  // send msg
  send_msg(){
    if(this.selected === true){
      let msg = {
        conv_id:this.conv_id,
        message:this.msg,
        from:this.from_id,
        to:this.to_id,
        time:moment()
      }
      this.gigService.change_status_notseen(this.conv_id).subscribe(res => {
      });
      this.gigService.send_msg_with_conv_id(msg).subscribe(res => {
        if(res.success === true){
          this.msg = '';
          this.side_conv[this.current_index].last_msg = "<b>YOU:</b>"+" "+res.verf.msg.substr(0,18);
          this.side_conv[this.current_index].time = moment(res.verf.time).calendar();
          this.side_conv[this.current_index].temp_time = res.verf.time;
          this.side_conv[this.current_index].all_msgs.push(res.verf);
          this.side_conv.sort((a,b) => {
            return JSON.parse(moment(b.temp_time).format('x')) - JSON.parse(moment(a.temp_time).format('x'))
          });
          res.verf['status'] = true;
          res.verf['message'] = res.verf.msg;
          this.authService.getUser(res.verf.from).subscribe(sender =>{
            res.verf['pic'] = sender.msg.profile_pic.replace('public','');
            this.display_msgs.push(res.verf);
            this.display_msgs.sort((a,b) => {
              return JSON.parse(moment(a.time).format('x')) - JSON.parse(moment(b.time).format('x'));
            });
            // console.log(this.display_msgs);
          });
        }
      });
    }else{
      console.log('Please select a conversation and send !');
    }
     
  }
}
