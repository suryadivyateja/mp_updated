import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ValidateService } from '../../services/validate.service';
declare var $:any;
@Component({
  selector: 'app-admin-b-words',
  templateUrl: './admin-b-words.component.html',
  styleUrls: ['./admin-b-words.component.css']
})
export class AdminBWordsComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService) { }
word;
  ngOnInit() {
  }
  submit_this(){
    if(this.validateService.validateInput(this.word)){
      this.adminService.addBWords({b_word:this.word}).subscribe(res=>{
        console.log(res);
        if(res.success === true){
          $('#message').html('<i class="fa fa-check"></i> word added successfully')
          .css({"padding":"8px","margin-bottom":"10px","display":"block"});
  
  setTimeout(()=>{
    $('#message').css('display','none')
  },1000);
  $('#serr').css("display","none");
  this.word='';
        }

      })

    }else{
      $('#serr').html('<i class="fa fa-times-circle"></i> please enter the word')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
    }
   
  }

}
