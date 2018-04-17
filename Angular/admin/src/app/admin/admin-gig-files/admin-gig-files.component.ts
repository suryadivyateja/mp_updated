import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
declare var $:any;
@Component({
  selector: 'app-admin-gig-files',
  templateUrl: './admin-gig-files.component.html',
  styleUrls: ['./admin-gig-files.component.css']
})
export class AdminGigFilesComponent implements OnInit {

  constructor(private adminService:AdminService) { }
gig_files=[];
  ngOnInit() {
    this.adminService.get_all_gigs().subscribe(res=>{
      console.log(res);
      this.gig_files=res.msg;
      this.gig_files.forEach(element => {
      element.username=element.members.name;
      });
    })
      
  }
  delete_this(f,val){
    console.log(val);
    var data={
      id:f._id,
      value:val
    }

    this.adminService.delete_img(data).subscribe(res=>{
      if(res.success === true){
        
        var index = this.gig_files.indexOf(f);
        console.log(index)
        
        var co =this.gig_files.filter(item => item._id === data.id)[0];
        if(data.value === 'img1'){
        co.img1='not specified';
        this.gig_files.sort();
        }else if(data.value === 'img2'){
          co.img2='not specified';
          this.gig_files.sort();
          }else if(data.value === 'img3'){
            co.img3='not specified';
            this.gig_files.sort();
            }else if(data.value === 'img4'){
              co.img4='not specified';
              this.gig_files.sort();
              }else if(data.value === 'img5'){
                co.img5='not specified';
                this.gig_files.sort();
                }else if(data.value === 'img6'){
                  co.img6='not specified';
                  this.gig_files.sort();
                  }
                  $('#serr').html('<i class="fa fa-check"></i> gig image deleted successfully')
                  .css({"padding":"8px","margin-bottom":"10px","display":"block"});
          
          setTimeout(()=>{
            $('#serr').css('display','none')
          },1000);          
      }
    })
  }

}
