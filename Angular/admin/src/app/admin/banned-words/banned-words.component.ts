import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-banned-words',
  templateUrl: './banned-words.component.html',
  styleUrls: ['./banned-words.component.css']
})
export class BannedWordsComponent implements OnInit {

  constructor(private adminService:AdminService) { }
bwords=[];
  ngOnInit() {
    this.adminService.getBwords().subscribe(res=>{
      this.bwords=res.msg.words;
      console.log(this.bwords);

    })
  }

}
