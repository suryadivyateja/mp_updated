import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { GigService } from "../services/gig.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { element } from 'protractor';
declare var $: any;

@Component({
  selector: 'app-edit-gig',
  templateUrl: './edit-gig.component.html',
  styleUrls: ['./edit-gig.component.css','../create-gig-new/create-gig-new.component.css']
})
export class EditGigComponent implements OnInit {

  constructor(private title: Title, private authService: AuthService, private validateService: ValidateService, private router: Router, private gigService: GigService, private activateRoute: ActivatedRoute) { }

  tabOneCheck = false;
  tabTwoCheck = false;
  tabThreeCheck = false;
  tabFourCheck = false;

  // comp1
  user_id: string;
  gig_category: string;
  sub_category: string;
  gig_title: string;
  gig_description: string;
  comp1: string;
  email: boolean = false;
  profiles = false;
  sharing = false;
  social_login: boolean = false;
  rating = false;
  mobile = false;

  // comp2
  comp2: string;
  dont_show_pre: boolean = false;
  dont_show_pro: boolean = false;
  pac_cos_sta: number;
  pac_cos_pre: number;
  pac_cos_pro: number;
  pac_det_sta: string;
  pac_det_pre: string;
  pac_det_pro: string;
  pac_del_sta: string;
  pac_del_pre: string;
  pac_del_pro: string;
  rev_sta: any;
  rev_pre: any;
  rev_pro: any;
  words_sta: string;
  words_pre: string;
  words_pro: string;
  sf_sta = false;
  sf_pre = false;
  sf_pro = false;
  hq_sta = false;
  hq_pre = false;
  hq_pro = false;

  // comp3::
  comp3: any;
  doller1: string;
  days1: string;
  check1 = false;
  // check1:string;
  description2: string;
  doller2: string;
  days2: string;
  que1: string;
  ans1: string;

  // comp4
  authwork: string;
  comp4: any;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;
  auth_work: string;
  gig_id: string;
  email_s: boolean;
  profiles_s: boolean;
  sharing_s: boolean;
  social_login_s: boolean;
  rating_s: boolean;
  mobile_s: boolean;

  first_name: string;
  last_name: string;
  extra1_id: string;
  extra2_id: string;
  f_img1: string;
  s_e: boolean = false;
  s_f: boolean = false;
  f_img2: string;
  f_img3: string;
  extras = [];
  image_ref = [];
  faq;
  dis_faq = [];
  e = 0;
  num_e: number = 1;
  num_f: number = 1;
  i = 1;
  dis_ext = [];

  addExtra() {
    var blog = false;
    let m;
    console.log(this.num_e);
    for (m = 0; m < this.num_e; m++) {
      console.log("inside for");
      var des = $('#des' + m).val();
      var cost = $('#cost' + m).val();
      console.log(des);
      console.log(cost);
      if (des == null || des == undefined || cost == null || cost == undefined) {
        blog = false;
      } else {
        blog = true;
      }
    }
    if (m == this.num_e) {
      console.log('just in');
      this.addext(blog, m);
    }
  }
  addext(blog, m) {
    if (blog) {
      this.e = m;
      // $('#ex-core').append('<div class="ext' + this.e + '" style="position:relative;display: flex; align-items: flex-start; justify-content: space-around;flex-direction: row;height: 70px;width: 80%;margin-left: 10%;border: 1px solid #d8d8d8;background-color: #f2f2f2;border-radius: 2px;color: rgba(0, 0, 0, 0.5);margin: 30px 10%;"><div style="top:50%;transform:translate(0%,75%);font-weight:800;padding-left:10px;color:#999;cursor:pointer" class="into' + this.e + ' into">x</div><div style="top:50%;transform:translate(-5%,65%);"><input style="width:370px;border:1px solid #999;border-radius:2px;" type="text" id="des' + this.e + '"></div><div style="width:75px;border-radius:3px;top:23%;position:relative;left:-10px;" class="input-group"><span style="background-color:#DFDFDF;border:1px solid #999;width:40px" class="input-group-addon">$</span><input class="form-control" style="width:45px;border:1px solid #999;" type="number" id="cost' + this.e + '"></div></div>');
      $('.extras-core').append(`<div style="height: 75px;width: 600px;border: 1px solid #ddd;background-color: #F3F3F3;border-radius: 4px; display: flex; align-items: center;justify-content: space-around; flex-direction: row; margin-bottom: 5px;"><div style="width:10%;height:40%;display: flex;align-items: center; justify-content: center;"><div style="cursor:pointer;font-size:85%;font-weight:500;color:#dddd;" id="into` + this.e + `">X</div></div><div style="width:50%; height:40%;"><input type="text" style="width:95%;height: 85%;" placeholder="Describe the type of your extra" id="des` + this.e + `" (change)="handleChange($event)"></div><div style="width: 15%; display: flex;align-items: center;justify-content: center;"> <div style="border: 1px solid #ddd; border-radius: 3px;display: flex; align-items: center;justify-content: center;flex-direction: row;height: 40px;width: 80px;overflow: hidden;"><div style="display: flex;align-items: center;justify-content: center; height: 100%;width: 40%;border-right: 1px solid #ddd;font-size: 80%;color: #555;">  $</div><div style="height: 100%;width: 60%;border: none;"> <input type="number" style="    border: none; height: 100%;width: 100%;padding: 0; margin: 0;text-align: center;font-size: 80%;color: #555;" id="cost` + this.e + `"></div></div></div></div>`
    )
      this.num_e++;

    } else {
      //  do nothing
    }

  }
  addfaq() {
    var flag = false;
    let j;
    // alert('hi');
    for (j = 0; j < this.num_f; j++) {
      var q = $('#q' + j).val();
      var a = $('#a' + j).val();
      // alert(q+a);
      if (q !== null && q !== undefined && q !== '' && a !== null && a !== undefined && a !== '') {
        flag = true;
        // alert('hi');
      } else {
        flag = false;
        // alert('bye');
      }
    }

    if (j == this.num_f) {
      this.addFq(flag, j);
    }

  }

  addFq(flag, j) {
    if (flag) {
      // alert('hi');
      this.i = j;
      // $('.faq-core').prepend('<div class="faq" style="position: relative;display: block;width: 80%;text-align: left;margin-top: 10px;"><h4 class="faq-head" style="margin: 20px 0 8px;font-size: 120%;color: #222222;font-weight:bold">Question</h4><input type="text" class="faq_question" name="faq_question[]" id="q' + this.i + '" value="" style="width: 100%;border: 1px solid #CCCCCC;box-shadow: inset 0 0px 5px 1px #FBFBFB;border-radius: 2px;padding: 4px;"><h4 class="faq-head">Answer</h4><textarea name="faq_answer[]" id="a' + this.i + '" value="" style="width: 100%;border: 1px solid #CCCCCC;box-shadow: inset 0 0px 5px 1px #FBFBFB;border-radius: 2px;padding: 4px;"></textarea></div> ');
      $('.faq-core').prepend(
        `<div style="display: flex;align-items: flex-start;justify-content: flex-start;flex-direction: column;width: 600px;height: auto;"><label style="width: 100%;display: flex;align-items: flex-start;justify-content: flex-start;flex-direction:column;"><div style="margin: 14px 0;text-align: left;font-weight: var(--font-weight-mid);color: #444;">Question</div><input type="text" style="width: 618px;height:42px;border: 1px solid #ddd;border-radius: 3px;box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);" id="q`+ this.i + `" maxlength="94"></label><label style="width: 100%;display:flex;align-items: flex-start;justify-content: flex-start;flex-direction: column;"><div style="margin: 14px 0;text-align: left;font-weight: var(--font-weight-mid);color: #444;">Answer</div><textarea style="width:618px;border: 1px solid #ddd;border-radius:3px;height:56px;box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);" id="a`+ this.i +`"></textarea></label></div>`
      )
      this.num_f++;
    } else {
      // alert('error');
    }
  }

  clear(i) {
    if (i === 1) {
      $('#des1').val('');
      $('#cost1').val('');
    } else {
      $('#des' + i).val('');
      $('#cost' + i).val('');
      $('.temp' + i).hide();
    }

  }
  ngOnInit() {

    $(document).on('click', '.into', function () {
      let p = event.srcElement.classList[0].replace('into', '');
      $('#des' + p).val('');
      $('#cost' + p).val('');
      $('.ext' + p).hide();
    });
    this.title.setTitle('Edit Gig - Market Place');
    $('#file_label').css({ 'display': 'none' });
    $('#file_two_label').css({ 'display': 'none' });
    $('#file_three_label').css({ 'display': 'none' });
    // $('#file_four_label').css({'display':'none'});
    // $('#file_five_label').css({'display':'none'});
    // $('#file_six_label').css({'display':'none'});
    // Close button
    $(".trl").click(function () {
      location.reload();
    });
    //  Panel one
    // Helpers
    $('#c-gig-cat').focus(function () {
      $('.helpers').hide();
      $('#cat-helper').toggle();
      // $('html,body').animate({scrollTop:$('#c-gig-one').offset().top});
    });
    $('#c-gig-cat').hover(function () {
      $('.helpers').hide();
      $('#cat-helper').toggle();
    });
    $('#title').focus(function () {
      $('.helpers').hide();
      $('#title-helper').toggle();
      $('html,body').animate({
        scrollTop: $('#c-gig-cat').offset().top - 80
      });
    });
    $('#title').hover(function () {
      $('.helpers').hide();
      $('#title-helper').toggle();
    });
    $('#title').keydown(function () {
      $('.helpers').hide();
      $('#title-helper').toggle();
    });
    $('.mce-container').focus(function () {
      $('.helpers').hide();
      $('#desc-helper').toggle();
    });
    $('.mce-container').hover(function () {
      $('.helpers').hide();
      $('#desc-helper').toggle();
    });
    $('.mce-container').keydown(function () {
      $('.helpers').hide();
      $('#desc-helper').toggle();
    });
    $('#skills-req-table').hover(function () {
      $('.helpers').hide();
      $('#skills-helper').toggle();
    });
    this.gig_id = this.activateRoute.queryParams['_value'].id;
    // this.gig_id = "5a169f3f9f9b290368e0c082";
    // console.log(this.gig_id);
    this.gigService.get_gig_byId(this.gig_id).subscribe(gig => {
      console.log(gig);
      let g = gig.msg;
      this.gig_category = g.category;
      if (this.gig_category === 'rc') {
        $('.sub-cat').css({ 'display': 'block' });
      }
      this.sub_category = g.sub_category;
      this.gig_title = g.title;
      this.user_id = g.user_id;
      this.gig_description = g.description;
      this.email = g.email;
      this.profiles = g.profiles;
      this.sharing = g.sharing;
      this.social_login = g.social_login;
      this.rating = g.rating;
      this.mobile = g.mobile;
      this.pac_cos_sta = JSON.parse(g.pac_cos_sta);
      this.pac_cos_pre = JSON.parse(g.pac_cos_pre);
      this.pac_cos_pro = JSON.parse(g.pac_cos_pro);
      if (g.pac_det_pre === 'Not Specified') {
        this.pac_det_pre = null;
      } else {
        this.pac_det_pre = g.pac_det_pre;
      }
      if (g.pac_det_pro === 'Not Specified') {
        this.pac_det_pro = null;
      } else {
        this.pac_det_pro = g.pac_det_pro;
      }
      this.pac_det_sta = g.pac_det_sta;
      this.pac_del_sta = g.pac_del_sta;
      // this.pac_del_pre = g.pac_del_pre;
      // this.pac_del_pro = g.pac_del_pro;
      if (g.pac_del_pre === 'Not Specified') {
        this.pac_del_pre = null;
      } else {
        this.pac_del_pre = g.pac_del_pre;
      }
      if (g.pac_del_pro === 'Not Specified') {
        this.pac_del_pro = null;
      } else {
        this.pac_del_pro = g.pac_del_pro;
      }
      this.rev_sta = g.rev_sta;
      // this.rev_pre = g.rev_pre;
      // this.rev_pro = g.rev_pro;
      if (g.rev_pre === 'Not Specified') {
        this.rev_pre = null;
      } else {
        this.rev_pre = g.rev_pre;
      }
      if (g.rev_pro === 'Not Specified') {
        this.rev_pro = null;
      } else {
        this.rev_pro = g.rev_pro;
      }
      this.words_sta = g.words_sta;
      // this.words_pre = g.words_pre;
      // this.words_pro = g.words_pro;
      if (g.words_pre === 'Not Specified') {
        this.words_pre = null;
      } else {
        this.words_pre = g.words_pre;
      }
      if (g.words_pro === 'Not Specified') {
        this.words_pro = null;
      } else {
        this.words_pro = g.words_pro;
      }
      this.sf_sta = g.sf_sta;
      // this.sf_pre= g.sf_pre;
      // this.sf_pro= g.sf_pro;
      if (g.sf_pre === 'Not Specified') {
        this.sf_pre = null;
      } else {
        this.sf_pre = g.sf_pre;
      }
      if (g.sf_pro === 'Not Specified') {
        this.sf_pro = null;
      } else {
        this.sf_pro = g.sf_pro;
      }
      this.hq_sta = g.hq_sta;
      // this.hq_pre= g.hq_pre;
      // this.hq_pro= g.hq_pro;
      if (g.hq_pre === 'Not Specified') {
        this.hq_pre = null;
      } else {
        this.hq_pre = g.hq_pre;
      }
      if (g.hq_pro === 'Not Specified') {
        this.hq_pro = null;
      } else {
        this.hq_pro = g.hq_pro;
      }
      this.dont_show_pre = JSON.parse(g.dont_show_pre);
      this.dont_show_pro = JSON.parse(g.dont_show_pro);
      // show hide table
      if (this.dont_show_pre) {
        $('.gig-fade-back').css({ 'display': 'block' });
      } else {
        $('.gig-fade-back').css({ 'display': 'none' });
      }
      if (this.dont_show_pro) {
        $('.gig-fade-back-one').css({ 'display': 'block' });
      } else {
        $('.gig-fade-back-one').css({ 'display': 'none' });
      }
      // end of show hide table
      if (g.faq !== "undefined") {
        let temp_fq = JSON.parse(g.faq);
        temp_fq.forEach(ele => {
          if (ele.question !== 'undefined' && ele.answer !== 'undefined') {
            this.dis_faq.push(ele);
            this.num_f = this.dis_faq.length;
            this.s_f = true;
          }
        });
      }

      this.img1 = g.img1;
      this.auth_work = g.author_work;
      this.img2 = g.img2;
      this.img3 = g.img3;
      this.f_img1 = g.img1;
      $('#gig_img_one').css({'display':'block'});
      this.f_img2 = g.img2;
      $('#gig_img_two').css({'display':'block'});
      this.f_img3 = g.img3;
      $('#gig_img_three').css({'display':'block'});
      if (g.img4 !== 'not specified') {
        $('#file_four_label').css({ 'display': 'none' });
        $('#gig_img_four').css({'display':'block'});
        this.img4 = g.img4;
      }
      if (g.img5 !== 'not specified') {
        $('#file_five_label').css({ 'display': 'none' });
        $('#gig_img_five').css({'display':'block'});
        this.img5 = g.img5;
      }
      if (g.img6 !== 'not specified') {
        $('#file_six_label').css({ 'display': 'none' });
        $('#gig_img_six').css({'display':'block'});
        this.img6 = g.img6;
      }
    });
    this.gigService.get_gig_extrs(this.gig_id).subscribe(gig_ext => {
      let ext = gig_ext.msg;
      gig_ext.msg.forEach(element => {
        if (element.e_description == "I will deliver all work for an extra") {
          this.check1 = true;
          this.doller1 = element.price;
        }
        else {
          if (element.e_description !== 'undefined' && element.price !== 'undefined' && element.e_description !== '' && element.price !== '') {
            this.dis_ext.push(element);
            this.s_e = true;
          }
          this.num_e = this.dis_ext.length;
          if (this.num_e === 0) {
            this.num_e = 1;
          }
        }
      });
    })

    // Body Scroll
    // Navigation button
    $('.one-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-one').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-one').offset().top - 150
      });
    });
    $('.two-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-two').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-two').offset().top - 150
      });
    });
    $('.three-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-three').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-three').offset().top - 150
      });
    });
    $('.four-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-four').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-four').offset().top - 150
      });
    });
    $('.five-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-five').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-five').offset().top - 150
      });
    });
    $('.six-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-six').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-six').offset().top - 150
      });
    });
    // Validations


  }

  fade(event) {
    if (event.target.value === 'pre') {
      if (event.target.checked) {
        $('.gig-fade-back').css({ 'display': 'block' });
      } else {
        $('.gig-fade-back').css({ 'display': 'none' });
      }
      this.dont_show_pre = event.target.checked;
    }
    if (event.target.value === 'pro') {
      if (event.target.checked) {
        $('.gig-fade-back-one').css({ 'display': 'block' });
      } else {
        $('.gig-fade-back-one').css({ 'display': 'none' });
      }
      this.dont_show_pro = event.target.checked;
    }
  }
  showmore(event) {
    if (event.target.value === 'rc') {
      $('.sub-cat').css({ 'display': 'block' });
    } else {
      $('.sub-cat').css({ 'display': 'none' });
    }
  }

  gotoNexttab(tab_num) {
    switch (tab_num) {
      case 'first':
        $('.cg-divs').hide();
        $('.cg-one').show();
        $('.cg-one-helper').show();
        break;
      case 'second':
        if (this.validateService.validateInput(this.gig_category) && this.validateService.validateInput(this.gig_title && this.validateService.validateInput(this.gig_description))) {
          const comp1 = {
            category: this.gig_category,
            title: this.gig_title,
            description: this.gig_description,
            email: this.email,
            profiles: this.profiles,
            sharing: this.sharing,
            social_login: this.social_login,
            rating: this.rating,
            mobile: this.mobile
          };
          this.comp1 = JSON.stringify(comp1);
          localStorage.setItem('comp1', this.comp1);
          $('.cg-divs').hide();
          $('.cg-two').show();
          $('#two-cg-h').addClass('selected-cg-h');
          $('.helpers').hide();
          $('.cg-two-helper').show();
        } else {
          $('#comp1-err').html('All fields must be filled !!');
        }
        $('.cg-divs').hide();
        $('.cg-two').show();
        $('#two-cg-h').addClass('selected-cg-h');
        $('.helpers').hide();
        $('.cg-two-helper').show();
        break;
      case 'third':
        if (this.dont_show_pre === false && this.dont_show_pro === false) {
          if (this.pac_cos_sta <= 9999 && this.pac_cos_pre <= 9999 && this.pac_cos_pro <= 9999) {
            if (this.validateService.validateInput(this.pac_cos_sta) && this.validateService.validateInput(this.pac_cos_pre) && this.validateService.validateInput(this.pac_cos_pro) && this.validateService.validateInput(this.pac_det_sta) && this.validateService.validateInput(this.pac_det_pre) && this.validateService.validateInput(this.pac_det_pro) && this.validateService.validateInput(this.pac_del_sta) && this.validateService.validateInput(this.pac_del_pre) && this.validateService.validateInput(this.pac_del_pro) && this.validateService.validateInput(this.rev_sta) && this.validateService.validateInput(this.rev_pre) && this.validateService.validateInput(this.rev_pro) && this.validateService.validateInput(this.words_sta) && this.validateService.validateInput(this.words_pre) && this.validateService.validateInput(this.words_pro)) {

              const comp2 = {
                pac_cos_sta: this.pac_cos_sta,
                pac_cos_pre: this.pac_cos_pre,
                pac_cos_pro: this.pac_cos_pro,
                pac_det_sta: this.pac_det_sta,
                pac_det_pre: this.pac_det_pre,
                pac_det_pro: this.pac_det_pro,
                pac_del_sta: this.pac_del_sta,
                pac_del_pre: this.pac_del_pre,
                pac_del_pro: this.pac_del_pro,
                rev_sta: this.rev_sta,
                rev_pre: this.rev_pre,
                rev_pro: this.rev_pro,
                words_sta: this.words_sta,
                words_pre: this.words_pre,
                words_pro: this.words_pro,
                sf_sta: this.sf_sta,
                sf_pre: this.sf_pre,
                sf_pro: this.sf_pro,
                hq_sta: this.hq_sta,
                hq_pre: this.hq_pre,
                hq_pro: this.hq_pro
              };
              // console.log(comp2);
              this.comp2 = JSON.stringify(comp2);
              localStorage.setItem('comp2', this.comp2);
              $('.cg-divs').hide();
              $('.cg-three').show();
              $('#three-cg-h').addClass('selected-cg-h');

            } else {
              $('#g-2-all-err').html('All fields must be filled and checked');
            }
          } else {
            $('#g-2-all-err').html('Please enter the cost less than "9999 $"');
          }
        } else if (this.dont_show_pre === true && this.dont_show_pro === false) {
          if (this.pac_cos_sta <= 9999 && this.pac_cos_pro <= 9999) {
            if (this.validateService.validateInput(this.pac_cos_sta) && this.validateService.validateInput(this.pac_cos_pro) && this.validateService.validateInput(this.pac_det_sta) && this.validateService.validateInput(this.pac_det_pro) && this.validateService.validateInput(this.pac_del_sta) && this.validateService.validateInput(this.pac_del_pro) && this.validateService.validateInput(this.rev_sta) && this.validateService.validateInput(this.rev_pro) && this.validateService.validateInput(this.words_sta) && this.validateService.validateInput(this.words_pro)) {

              const comp2 = {
                pac_cos_sta: this.pac_cos_sta,
                pac_cos_pro: this.pac_cos_pro,
                pac_det_sta: this.pac_det_sta,
                pac_det_pro: this.pac_det_pro,
                pac_del_sta: this.pac_del_sta,
                pac_del_pro: this.pac_del_pro,
                rev_sta: this.rev_sta,
                rev_pro: this.rev_pro,
                words_sta: this.words_sta,
                words_pro: this.words_pro,
                sf_sta: this.sf_sta,
                sf_pro: this.sf_pro,
                hq_sta: this.hq_sta,
                hq_pro: this.hq_pro
              };
              // this.pac_cos_pre = 0;
              if (this.pac_cos_pre === null || this.pac_cos_pre === undefined) {
                this.pac_cos_pre = 0;
              }
              if (this.pac_det_pre === null || this.pac_det_pre === undefined) {
                this.pac_det_pre = "Not Specified";
              }
              if (this.pac_del_pre === null || this.pac_del_pre === undefined) {
                this.pac_del_pre = "Not Specified";
              }
              if (this.rev_pre === null || this.rev_pre === undefined) {
                this.rev_pre = "Not Specified";
              }
              if (this.words_pre === null || this.words_pre === undefined) {
                this.words_pre = "Not Specified";
              }
              if (this.sf_pre === null || this.sf_pre === undefined) {
                this.sf_pre = false;
              }
              if (this.hq_pre === null || this.hq_pre === undefined) {
                this.hq_pre = false;
              }
              this.comp2 = JSON.stringify(comp2);
              localStorage.setItem('comp2', this.comp2);
              $('.cg-divs').hide();
              $('.cg-three').show();
              $('#three-cg-h').addClass('selected-cg-h');

            } else {
              $('#g-2-all-err').html('All fields must be filled and checked');
            }
          } else {
            $('#g-2-all-err').html('Please enter the cost less than "9999 $"');
          }
        } else if (this.dont_show_pre === false && this.dont_show_pro === true) {
          if (this.pac_cos_sta <= 9999 && this.pac_cos_pre <= 9999) {
            if (this.validateService.validateInput(this.pac_cos_sta) && this.validateService.validateInput(this.pac_cos_pre) && this.validateService.validateInput(this.pac_det_sta) && this.validateService.validateInput(this.pac_det_pre) && this.validateService.validateInput(this.pac_del_sta) && this.validateService.validateInput(this.pac_del_pre) && this.validateService.validateInput(this.rev_sta) && this.validateService.validateInput(this.rev_pre) && this.validateService.validateInput(this.words_sta) && this.validateService.validateInput(this.words_pre)) {
              const comp2 = {
                pac_cos_sta: this.pac_cos_sta,
                pac_cos_pre: this.pac_cos_pre,
                pac_det_sta: this.pac_det_sta,
                pac_det_pre: this.pac_det_pre,
                pac_del_sta: this.pac_del_sta,
                pac_del_pre: this.pac_del_pre,
                rev_sta: this.rev_sta,
                rev_pre: this.rev_pre,
                words_sta: this.words_sta,
                words_pre: this.words_pre,
                sf_sta: this.sf_sta,
                sf_pre: this.sf_pre,
                hq_sta: this.hq_sta,
                hq_pre: this.hq_pre,
              };
              if (this.pac_cos_pro === null || this.pac_cos_pro === undefined) {
                this.pac_cos_pro = 0;
              }
              if (this.pac_det_pro === null || this.pac_det_pro === undefined) {
                this.pac_det_pro = "Not Specified";
              }
              if (this.pac_del_pro === null || this.pac_del_pro === undefined) {
                this.pac_del_pro = "Not Specified";
              }
              if (this.rev_pro === null || this.rev_pro === undefined) {
                this.rev_pro = "Not Specified";
              }
              if (this.words_pro === null || this.words_pro === undefined) {
                this.words_pro = "Not Specified";
              }
              if (this.sf_pro === null || this.sf_pro === undefined) {
                this.sf_pro = false;
              }
              if (this.hq_pro === null || this.hq_pro === undefined) {
                this.hq_pro = false;
              }
              this.comp2 = JSON.stringify(comp2);
              localStorage.setItem('comp2', this.comp2);
              $('.cg-divs').hide();
              $('.cg-three').show();
              $('#three-cg-h').addClass('selected-cg-h');

            } else {
              $('#g-2-all-err').html('All fields must be filled and checked');
            }
          } else {
            $('#g-2-all-err').html('Please enter the cost less than "9999 $"');
          }
        } else if (this.dont_show_pre === true && this.dont_show_pro === true) {
          if (this.pac_cos_sta <= 9999) {
            if (this.validateService.validateInput(this.pac_cos_sta) && this.validateService.validateInput(this.pac_det_sta) && this.validateService.validateInput(this.pac_del_sta) && this.validateService.validateInput(this.rev_sta) && this.validateService.validateInput(this.words_sta)) {
              const comp2 = {
                pac_cos_sta: this.pac_cos_sta,
                pac_det_sta: this.pac_det_sta,
                pac_del_sta: this.pac_del_sta,
                rev_sta: this.rev_sta,
                words_sta: this.words_sta,
                sf_sta: this.sf_sta,
                hq_sta: this.hq_sta,
              };
              if (this.pac_cos_pre === null || this.pac_cos_pre === undefined) {
                this.pac_cos_pre = 0;
              }
              if (this.pac_det_pre === null || this.pac_det_pre === undefined) {
                this.pac_det_pre = "Not Specified";
              }
              if (this.pac_del_pre === null || this.pac_del_pre === undefined) {
                this.pac_del_pre = "Not Specified";
              }
              if (this.rev_pre === null || this.rev_pre === undefined) {
                this.rev_pre = "Not Specified";
              }
              if (this.words_pre === null || this.words_pre === undefined) {
                this.words_pre = "Not Specified";
              }
              if (this.sf_pre === null || this.sf_pre === undefined) {
                this.sf_pre = false;
              }
              if (this.hq_pre === null || this.hq_pre === undefined) {
                this.hq_pre = false;
              }
              if (this.pac_cos_pro === null || this.pac_cos_pro === undefined) {
                this.pac_cos_pro = 0;
              }
              if (this.pac_det_pro === null || this.pac_det_pro === undefined) {
                this.pac_det_pro = "Not Specified";
              }
              if (this.pac_del_pro === null || this.pac_del_pro === undefined) {
                this.pac_del_pro = "Not Specified";
              }
              if (this.rev_pro === null || this.rev_pro === undefined) {
                this.rev_pro = "Not Specified";
              }
              if (this.words_pro === null || this.words_pro === undefined) {
                this.words_pro = "Not Specified";
              }
              if (this.sf_pro === null || this.sf_pro === undefined) {
                this.sf_pro = false;
              }
              if (this.hq_pro === null || this.hq_pro === undefined) {
                this.hq_pro = false;
              }
              this.comp2 = JSON.stringify(comp2);
              localStorage.setItem('comp2', this.comp2);
              $('.cg-divs').hide();
              $('.cg-three').show();
              $('#three-cg-h').addClass('selected-cg-h');

            } else {
              $('#g-2-all-err').html('All fields must be filled and checked');
            }
          } else {
            $('#g-2-all-err').html('Please enter the cost less than "9999 $"');
          }
        }
        $('.cg-divs').hide();
        $('.cg-three').show();
        $('#three-cg-h').addClass('selected-cg-h');
        break;
      case 'fourth':
        let faqarr = [];
        let extarr = [];
        let in_faq;
        let in_ext;
        let faq_per = false;
        let ext_per = false;
        let temp_f = 0;
        temp_f = this.num_f;
        let j;
        for (j = 0; j < temp_f; j++) {
          var q = $('#q' + j).val();
          var a = $('#a' + j).val();

          if (this.validateService.validateInput(q)) {
            if (this.validateService.validateInput(a)) {
              let obj = {
                question: q,
                answer: a
              };
              faqarr.push(obj);
              this.faq = JSON.stringify(faqarr);
              in_faq = j;
              faq_per = true;
            } else {
              $('#g-3-all-err').html('Please enter the answer for the question');
              faqarr = [];
              in_faq = -1;
              faq_per = false;
              temp_f = 0;
            }
          } else {
            if (!this.validateService.validateInput(a)) {
              let obj = {
                question: "undefined",
                answer: "undefined"
              };
              faqarr.push(obj);
              this.faq = JSON.stringify(faqarr);
              in_faq = j;
              faq_per = true;
            } else {
              $('#g-3-all-err').html('Please enter the question for the answer');
              faqarr = [];
              in_faq = -1;
              faq_per = false;
              temp_f = 0;
            }
          }
        }
        // if(j+1 === temp_f ){
        //   this.faq = JSON.stringify(faqarr);
        // }
        let temp_e = 0;
        temp_e = this.num_e
        for (let p = 0; p < temp_e; p++) {
          var des = $('#des' + p).val();
          var cost = $('#cost' + p).val();
          // var days = $('#days'+p).val();
          if (this.validateService.validateInput(des)) {
            if (this.validateService.validateInput(cost)) {
              this.extras.push({
                description: des,
                cost: cost
              });
              in_ext = p;
              ext_per = true;
            } else {
              $('#g-3-all-err').html('Please enter the cost for your extra');
              this.extras = [];
              in_ext = -1;
              ext_per = false;
              temp_e = 0;
            }
          } else {
            if (!this.validateService.validateInput(cost)) {
              this.extras.push({
                description: "undefined",
                cost: "undefined"
              });
              in_ext = p;
              ext_per = true;
            } else {
              $('#g-3-all-err').html('Please enter the description for your extra');
              this.extras = [];
              in_ext = -1;
              ext_per = false;
              temp_e = 0;
            }
          }
        }
        if (ext_per === true && faq_per === true) {
          $('.cg-divs').hide();
          $('.cg-four').show();
          $('#four-cg-h').addClass('selected-cg-h');
        }
        $('.cg-divs').hide();
        $('.cg-four').show();
        $('#four-cg-h').addClass('selected-cg-h');
        break;
      case 'fifth':
      this.auth_work = $('.author-work').val();
      if (this.validateService.validateInput(this.auth_work)) {
        $('.cg-divs').hide();
        $('.cg-five').show();
        $('#five-cg-h').addClass('selected-cg-h');
      } else {
        $('#auth-work-err').html('Please tell when the author will start the work');
      }
        $('.cg-divs').hide();
        $('.cg-five').show();
        $('#five-cg-h').addClass('selected-cg-h');
        break;
      case 'sixth':
      if (this.validateService.validateInput(this.img1)) {
        if (this.validateService.validateInput(this.img2) && this.validateService.validateInput(this.img3)) {
          $('.cg-divs').hide();
          $('.cg-six').show();
          $('#six-cg-h').addClass('selected-cg-h');
        } else {
          $('#image-err').html('Atleast three images are required!');
        }
      } else {
        $('#image-err').html('Atleast one image is required!');
      }
        $('.cg-divs').hide();
        $('.cg-six').show();
        $('#six-cg-h').addClass('selected-cg-h');
        break;
      case 'publish':
        this.savegig();
        break;

      default:
        break;
    }
  }
  handleChange(event) {

    switch (event.target.value) {
      case 'email':
        this.email = event.target.checked;
        console.log(this.email);
        break;
      case 'profiles':
        this.profiles = event.target.checked;
        break;
      case 'sharing':
        this.sharing = event.target.checked;
        break;
      case 'socila-login':
        this.social_login = event.target.checked;
        break;
      case 'rating':
        this.rating = event.target.checked;
        break;
      case 'mobile':
        this.mobile = event.target.checked;
        break;
      case 'check1':
        this.check1 = event.target.checked;
        break;
    }
  }

  fileChange1(input) {
    this.img1 = input.target.files[0];

    if (input.target.files && input.target.files['0']) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#gig_img_one')
          .attr('src', e.target['result']).css({ 'display': 'block' });
        $('#file_label').css({ 'display': 'none' });
      };

      reader.readAsDataURL(input.target.files['0']);
    }
  }

  fileChange2(input) {
    this.img2 = input.target.files[0];
    if (input.target.files && input.target.files['0']) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#gig_img_two')
          .attr('src', e.target['result']).css({ 'display': 'block' });
        $('#file_two_label').css({ 'display': 'none' });
      };

      reader.readAsDataURL(input.target.files['0']);
    }
  }

  fileChange3(input) {
    this.img3 = input.target.files[0];
    if (input.target.files && input.target.files['0']) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#gig_img_three')
          .attr('src', e.target['result']).css({ 'display': 'block' });
        $('#file_three_label').css({ 'display': 'none' });
      };

      reader.readAsDataURL(input.target.files['0']);
    }
  }
  fileChange4(input) {
    this.img4 = input.target.files[0];
    if (input.target.files && input.target.files['0']) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#gig_img_four')
          .attr('src', e.target['result']).css({ 'display': 'block' });
        $('#file_four_label').css({ 'display': 'none' });
      };

      reader.readAsDataURL(input.target.files['0']);
    }
  }
  fileChange5(input) {
    this.img5 = input.target.files[0];
    if (input.target.files && input.target.files['0']) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#gig_img_five')
          .attr('src', e.target['result']).css({ 'display': 'block' });
        $('#file_five_label').css({ 'display': 'none' });
      };
      reader.readAsDataURL(input.target.files['0']);
    }
  }
  fileChange6(input) {
    this.img6 = input.target.files[0];
    if (input.target.files && input.target.files['0']) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#gig_img_six')
          .attr('src', e.target['result']).css({ 'display': 'block' });
        $('#file_six_label').css({ 'display': 'none' });
      };
      reader.readAsDataURL(input.target.files['0']);
    }
  }

  btn(num) {
    switch (num) {
      case '1':
        $('#file').val('');
        $('#gig_img_one').attr('src', '').css({ 'display': 'none' });
        $('#file_label').css({ 'display': 'block' });
        break;
      case '2':
        $('#filetwo').val('');
        $('#gig_img_two').attr('src', '').css({ 'display': 'none' });
        $('#file_two_label').css({ 'display': 'block' });
        break;
      case '3':
        $('#filethree').val('');
        $('#gig_img_three').attr('src', '').css({ 'display': 'none' });
        $('#file_three_label').css({ 'display': 'block' });
        break;
      case '4':
        $('#filefour').val('');
        $('#gig_img_four').attr('src', '').css({ 'display': 'none' });
        $('#file_four_label').css({ 'display': 'block' });
        this.img4 = null;
        break;
      case '5':
        $('#filefive').val('');
        $('#gig_img_five').attr('src', '').css({ 'display': 'none' });
        $('#file_five_label').css({ 'display': 'block' });
        this.img5 = null;
        break;
      case '6':
        $('#filesix').val('');
        $('#gig_img_six').attr('src', '').css({ 'display': 'none' });
        $('#file_six_label').css({ 'display': 'block' });
        this.img6 = null;
        break;

      default:
        break;
    }
  }
  // gig_id:any;

  extrasid = [];
  checked: boolean;
  final_read_ext = [];
  savegig() {
    this.final_read_ext = [];
    if (this.sub_category === '' || this.sub_category === null || this.sub_category === undefined) {
      this.sub_category = "Not Specified";
    }
    var tempfaq = [];
    for (let f = 0; f < this.num_f; f++) {
      var question = $('#q' + f).val();
      var answer = $('#a' + f).val();
      tempfaq.push({
        question: question,
        answer: answer
      });
      this.faq = JSON.stringify(tempfaq);
    }
    let formData = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('gig_id', this.gig_id);
    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('category', this.gig_category);
    formData.append('sub_category', this.sub_category);
    formData.append('title', this.gig_title);
    formData.append('author_work', this.auth_work);
    formData.append('description', this.gig_description);
    formData.append('email', this.email.toString());
    formData.append('profiles', this.profiles.toString());
    formData.append('sharing', this.sharing.toString());
    formData.append('social_login', this.social_login.toString());
    formData.append('rating', this.rating.toString());
    formData.append('mobile', this.mobile.toString());
    formData.append('dont_show_pre', JSON.stringify(this.dont_show_pre));
    formData.append('dont_show_pro', JSON.stringify(this.dont_show_pro));
    formData.append('pac_cos_sta', JSON.stringify(this.pac_cos_sta));
    formData.append('pac_cos_pre', JSON.stringify(this.pac_cos_pre));
    formData.append('pac_cos_pro', JSON.stringify(this.pac_cos_pro));
    formData.append('pac_det_sta', this.pac_det_sta);
    formData.append('pac_det_pre', this.pac_det_pre);
    formData.append('pac_det_pro', this.pac_det_pro);
    formData.append('pac_del_sta', this.pac_del_sta);
    formData.append('pac_del_pre', this.pac_del_pre);
    formData.append('pac_del_pro', this.pac_del_pro);
    formData.append('rev_sta', this.rev_sta);
    formData.append('rev_pre', this.rev_pre);
    formData.append('rev_pro', this.rev_pro);
    formData.append('words_sta', this.words_sta);
    formData.append('words_pre', this.words_pre);
    formData.append('words_pro', this.words_pro);
    formData.append('sf_sta', this.sf_sta.toString());
    formData.append('sf_pre', this.sf_pre.toString());
    formData.append('sf_pro', this.sf_pro.toString());
    formData.append('hq_sta', this.sf_sta.toString());
    formData.append('hq_pre', this.hq_pre.toString());
    formData.append('hq_pro', this.hq_pro.toString());
    formData.append('faq', this.faq);
    formData.append('img_ref', JSON.stringify(this.image_ref));
    formData.append('img1', this.img1);
    formData.append('img2', this.img2);
    formData.append('img3', this.img3);
    if (this.img4 !== null && this.img4 !== undefined) {
      formData.append('img4', this.img4);
    }
    if (this.img5 !== null && this.img5 !== undefined) {
      formData.append('img5', this.img5);
    }
    if (this.img6 !== null && this.img6 !== undefined) {
      formData.append('img6', this.img6);
    }

    if (this.check1 === true) {
      let ext1 = {
        description: "I will deliver all work for an extra",
        cost: this.doller1
      }
      this.final_read_ext.push(ext1);
    }
    for (let z = 0; z < this.num_e; z++) {
      var des = $('#des' + z).val();
      var cost = $('#cost' + z).val();
      this.final_read_ext.push({
        description: des,
        cost: cost
      });
    }
    console.log(this.final_read_ext);

    this.gigService.update_gig(formData).subscribe(dat => {
      console.log(dat);
      if (dat.success == true) {
        this.gig_id = dat.msg._id;

        let ext = {
          gig_id: this.gig_id,
          extrs: this.final_read_ext
        }
        this.gigService.update_gig_extrs(ext).subscribe(re => {
          console.log(re);
          if (re.success == true) {
            this.router.navigate(['/my-gigs'], { queryParams: { gig: 'updategig' } });
          }
        });
      }
    });
  }
}
