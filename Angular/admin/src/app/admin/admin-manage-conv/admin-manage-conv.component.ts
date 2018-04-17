import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
declare var $:any;
@Component({
  selector: 'app-admin-manage-conv',
  templateUrl: './admin-manage-conv.component.html',
  styleUrls: ['./admin-manage-conv.component.css']
})
export class AdminManageConvComponent implements OnInit {

  constructor(private adminService:AdminService) { }
conversations=[];
convs=[];
message_id;
  ngOnInit() {
    this.adminService.get_all_convs().subscribe(res=>{
      this.conversations=res.msg;
      console.log(this.conversations);
      this.conversations.forEach(element => {
        element.msg.forEach(elem=>{
          if(elem.from === element.user1._id){
            elem.sender = element.user1.name
          }else if(elem.from === element.user2._id){
            elem.sender = element.user2.name
          }
          if(elem.to === element.user1._id){
            elem.receiver = element.user1.name
          }else if(elem.to === element.user2._id){
            elem.receiver = element.user2.name
          }
          elem.id=element._id;
          this.message_id=elem.message_id;
          this.convs.push(elem);         
        }) 
      });
    })
    console.log(this.convs);
  }
  delete_this(c){
    var data={
      id:c.id,
      message_id:c.message_id
    }
    console.log(data);
    this.adminService.deleteMsg(data).subscribe(res=>{
      if(res.success === true){
        var index = this.convs.indexOf(c);
        this.convs.splice(index,1);
        $('#serr').html('<i class="fa fa-check"></i> message deleted successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#serr').css('display','none')
},1000);
      }
    })
  }

}
