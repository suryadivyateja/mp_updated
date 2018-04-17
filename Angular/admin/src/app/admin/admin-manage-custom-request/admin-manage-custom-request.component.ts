import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
declare var $:any;
@Component({
  selector: 'app-admin-manage-custom-request',
  templateUrl: './admin-manage-custom-request.component.html',
  styleUrls: ['./admin-manage-custom-request.component.css']
})
export class AdminManageCustomRequestComponent implements OnInit {

  constructor(private adminService:AdminService) { }
custom_orders=[];
  ngOnInit() {
    this.adminService.getCustomOrders().subscribe(res=>{
      this.custom_orders=res.msg;
      console.log(res.msg)
        
})
}
    delete_this(cat){
      this.adminService.DeleteCustomOrder(cat._id).subscribe(res=>{
        console.log(res)
        if(res.success===true){
          var index = this.custom_orders.indexOf(cat);
      this.custom_orders.splice(index,1);
      $('#serr').html('<i class="fa fa-check"></i> request deleted successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#serr').css('display','none')
},2000);
      
        }
      })
      
      
        }

}
