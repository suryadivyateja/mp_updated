import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { GigService } from "../services/gig.service";
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-create-gig-new',
  templateUrl: './create-gig-new.component.html',
  styleUrls: ['./create-gig-new.component.css']
})
export class CreateGigNewComponent implements OnInit {

  constructor(private title: Title, private authService: AuthService, private validateService: ValidateService, private router: Router, private gigService: GigService) { }

  tabOneCheck: boolean = false;
  tabTwoCheck: boolean = false;
  tabThreeCheck: boolean = false;
  tabFourCheck: boolean = false;

  // comp1
  user_id: string;
  gig_category: string;
  gig_sub_category: string = "";
  gig_title: string;
  gig_description: string;
  comp1: string;
  email = false;
  profiles = false;
  sharing = false;
  social_login = false;
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
  rev_sta: string;
  rev_pre: string;
  rev_pro: string;
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
  author_work: string;

  // comp4
  comp4: any;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;

  extras = [];
  profile_pic: string;
  question: string;
  answer: string
  faq: string;
  ext: string;
  i = 1;
  e = 1;

  // add FAQ
  addFaq() {
    var first_q = $('#q1').val();
    var first_a = $('#a1').val();
    var flag = false;
    let j;
    for (j = 1; j <= this.i; j++) {
      var q = $('#q' + j).val();
      var a = $('#a' + j).val();
      if (q !== null && q !== undefined && q !== '' && a !== null && a !== undefined && a !== '') {
        flag = true;
      } else {
        flag = false;
      }
    }
    if (j - 1 == this.i) {
      this.addFq(flag);
    }

  }
  addFq(flag) {
    if (flag) {
      this.i++;
      // $('.faq-core').prepend('<div class="faq" style="position: relative;display: block;width: 80%;text-align: left;margin-top: 10px;"><h4 class="faq-head" style="margin: 20px 0 8px;font-size: 120%;color: #222222;font-weight:bold">Question</h4><input type="text" class="faq_question" name="faq_question[]" id="q' + this.i + '" value="" style="width: 80%;border: 1px solid #CCCCCC;box-shadow: inset 0 0px 5px 1px #FBFBFB;border-radius: 2px;padding: 4px;"><h4 style="font-size: 120%;font-weight:bold" class="faq-head">Answer</h4><textarea name="faq_answer[]" id="a' + this.i + '" value="" style="width: 100%;border: 1px solid #CCCCCC;box-shadow: inset 0 0px 5px 1px #FBFBFB;border-radius: 2px;padding: 4px;"></textarea></div> ');
      $('.faq-core').prepend(
        `<div style="display: flex;align-items: flex-start;justify-content: flex-start;flex-direction: column;width: 600px;height: auto;"><label style="width: 100%;display: flex;align-items: flex-start;justify-content: flex-start;flex-direction:column;"><div style="margin: 14px 0;text-align: left;font-weight: var(--font-weight-mid);color: #444;">Question</div><input type="text" style="width: 618px;height:42px;border: 1px solid #ddd;border-radius: 3px;box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);" id="q`+ this.i + `" maxlength="94"></label><label style="width: 100%;display:flex;align-items: flex-start;justify-content: flex-start;flex-direction: column;"><div style="margin: 14px 0;text-align: left;font-weight: var(--font-weight-mid);color: #444;">Answer</div><textarea style="width:618px;border: 1px solid #ddd;border-radius:3px;height:56px;box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);" id="a`+ this.i +`"></textarea></label></div>`
      )
    } else {
      // donothing
    }
  }

  //  add extra
  addExtra() {
    var blog = false;
    let m;
    for (m = 1; m <= this.e; m++) {
      var des = $('#des' + m).val();
      var cost = $('#cost' + m).val();
      // var days = $('#days'+m).val();
      if (des == null || des == undefined || des == '' || cost == null || cost == undefined || cost == '') {
        blog = false;
      } else {
        blog = true;
      }
    }
    if (m - 1 == this.e) {
      this.addext(blog);
    }

  }
  addext(blog) {
    if (blog) {
      this.e++;
      // $('.extras-core').append('<div class="ext' + this.e + '" style="position:relative;display: flex; align-items: flex-start; justify-content: space-around;flex-direction: row;height: 70px;width: 80%;margin-left: 10%;border: 1px solid #d8d8d8;background-color: #f2f2f2;border-radius: 2px;color: rgba(0, 0, 0, 0.5);margin: 30px 10%;"><div style="top:50%;transform:translate(0%,75%);font-weight:800;padding-left:10px;color:#999;cursor:pointer" class="into' + this.e + ' into" value="' + this.e + '">x</div><div style="top:50%;transform:translate(-5%,65%);"><input style="width:370px;border:1px solid #999;border-radius:2px;" type="text" id="des' + this.e + '"></div><div style="width:75px;border-radius:3px;top:23%;position:relative;left:-20px;" class="input-group"><span style="background-color:#DFDFDF;border:1px solid #999;width:40px" class="input-group-addon">$</span><input class="form-control" style="width:30px;border:1px solid #999;padding:2px;;" type="number" id="cost' + this.e + '"></div></div>');
      $('.extras-core').append(`<div style="height: 75px;width: 600px;border: 1px solid #ddd;background-color: #F3F3F3;border-radius: 4px; display: flex; align-items: center;justify-content: space-around; flex-direction: row; margin-bottom: 5px;"><div style="width:10%;height:40%;display: flex;align-items: center; justify-content: center;"><div style="cursor:pointer;font-size:85%;font-weight:500;color:#dddd;" id="into` + this.e + `">X</div></div><div style="width:50%; height:40%;"><input type="text" style="width:95%;height: 85%;" placeholder="Describe the type of your extra" id="des` + this.e + `" (change)="handleChange($event)"></div><div style="width: 15%; display: flex;align-items: center;justify-content: center;"> <div style="border: 1px solid #ddd; border-radius: 3px;display: flex; align-items: center;justify-content: center;flex-direction: row;height: 40px;width: 80px;overflow: hidden;"><div style="display: flex;align-items: center;justify-content: center; height: 100%;width: 40%;border-right: 1px solid #ddd;font-size: 80%;color: #555;">  $</div><div style="height: 100%;width: 60%;border: none;"> <input type="number" style="    border: none; height: 100%;width: 100%;padding: 0; margin: 0;text-align: center;font-size: 80%;color: #555;" id="cost` + this.e + `"></div></div></div></div>`
      )
    } else {
      // alert('create');
    }

  }

  clear() {
    console.log('hi');
    $('#des1').val('');
    $('#cost1').val('');
  }

  ngOnInit() {
    let u = localStorage.getItem('user');    
    let user = JSON.parse(u);
    this.user_id = user.id;  

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
          if (this.gig_category == 'rc' && this.validateService.validateInput(this.gig_sub_category)) {
            const comp1 = {
              category: this.gig_category,
              sub_category: this.gig_sub_category,
              title: this.gig_title,
              description: this.gig_description,
              email: this.email,
              profiles: this.profiles,
              sharing: this.sharing,
              social_login: this.social_login,
              rating: this.rating,
              mobile: this.mobile
            };
            $('.cg-divs').hide();
            $('.cg-two').show();
            $('#two-cg-h').addClass('selected-cg-h');
            $('.helpers').hide();
            $('.cg-two-helper').show();
          } else {
            $('#g-one-all-err').html('Please choose a sub category !!');
          }
          if (this.gig_category !== 'rc') {
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
            $('.cg-divs').hide();
            $('.cg-two').show();
            $('#two-cg-h').addClass('selected-cg-h');
            $('.helpers').hide();
            $('.cg-two-helper').show();
          }
        } else {
          $('#g-one-all-err').html('All fields must be filled !!');
        }
        // $('.cg-divs').hide();
        // $('.cg-two').show();
        // $('#two-cg-h').addClass('selected-cg-h');
        // $('.helpers').hide();
        // $('.cg-two-helper').show();
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
        // $('.cg-divs').hide();
        // $('.cg-three').show();
        // $('#three-cg-h').addClass('selected-cg-h');
        break;
      case 'fourth':
        let faqarr = [];
        let extarr = [];
        let faq = false;
        let extra = false;
        let j;
        let m;
        let faq_per = false;
        let ext_per = false;
        let temp_f = 0;
        temp_f = this.i;
        for (j = 1; j <= temp_f; j++) {
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
              faq_per = true;
            } else {
              $('#g-3-all-err').html('Please enter the answer for the question');
              faq_per = false;
              temp_f = 0;
            }
          } else {
            if (!this.validateService.validateInput(a)) {
              let obj = {
                question: 'undefined',
                answer: 'undefined'
              };
              faqarr.push(obj);
              this.faq = JSON.stringify(faqarr);
              faq_per = true;
            } else {
              $('#g-3-all-err').html('Please enter the question for the answer');
              faq_per = false;
              temp_f = 0;
            }
          }
        }
        let temp_e = 0;
        temp_e = this.e;
        for (m = 1; m <= temp_e; m++) {
          var des = $('#des' + m).val();
          var cost = $('#cost' + m).val();
          // var days = $('#days'+m).val();
          if (this.validateService.validateInput(des)) {
            if (this.validateService.validateInput(cost)) {
              this.extras.push({
                description: des,
                cost: cost
              });
              ext_per = true;
            } else {
              $('#g-3-all-err').html('Please enter the cost for your extra');
              ext_per = false;
              temp_e = 0;
            }
          } else {
            if (!this.validateService.validateInput(cost)) {
              this.extras.push({
                description: 'undefined',
                days: 'undefined',
                cost: 'undefined'
              });
              ext_per = true;
            } else {
              $('#g-3-all-err').html('Please enter the descritpion for your extra');
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
        // $('.cg-divs').hide();
        // $('.cg-four').show();
        // $('#four-cg-h').addClass('selected-cg-h');
        break;
      case 'fifth':
        this.author_work = $('.author-work').val();
        if (this.validateService.validateInput(this.author_work)) {
          $('.cg-divs').hide();
          $('.cg-five').show();
          $('#five-cg-h').addClass('selected-cg-h');
        } else {
          $('#auth-work-err').html('Please tell when the author will start the work');
        }
        // $('.cg-divs').hide();
        // $('.cg-five').show();
        // $('#five-cg-h').addClass('selected-cg-h');
        break;
      case 'sixth':
        if (this.validateService.validateInput(this.img1)) {
          if (this.validateService.validateInput(this.img2) && this.validateService.validateInput(this.img3)) {
            $('.cg-divs').hide();
            $('.cg-six').show();
            $('#six-cg-h').addClass('selected-cg-h');
          } else {
            $('#g-4-all-errr').html('Please Upload atleast three images ');
          }
        } else {
          $('#g-4-all-errr').html('Please upload the main image ');
        }
        // $('.cg-divs').hide();
        // $('.cg-six').show();
        // $('#six-cg-h').addClass('selected-cg-h');
        break;
      case 'publish':
        this.savegig();
        break;

      default:
        break;
    }
  }

  // show sub category if having any
  showmore(event) {
    if (event.target.value === 'rc') {
      $('.sub-cat').css({ 'display': 'block' });
    } else {
      $('.sub-cat').css({ 'display': 'none' });
    }
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
      // this.pac_cos_pro = null;
      // this.pac_det_pro = null;
      // this.pac_del_pro = null;
      // this.words_pro = null;
      // this.rev_pro = null;
    }
  }

  handleChange(event) {
    switch (event.target.value) {
      case 'email':
        this.email = event.target.checked;
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

  // image uploads
  images: any;
  fileChange1(input) {
    this.img1 = input.target.files[0];
    if (input.target.files && input.target.files['0']) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#gig_img_one')
          .attr('src', e.target['result']).css({ 'display': 'block' });
        $('.add-img').css({ 'display': 'block' });
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
        $('.add-img').css({ 'display': 'block' });
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
        $('.add-img').css({ 'display': 'block' });
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
        $('.add-img').css({ 'display': 'block' });
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
        $('.add-img').css({ 'display': 'block' });
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
        $('.add-img').css({ 'display': 'block' });
        $('#file_six_label').css({ 'display': 'none' });
      };
      reader.readAsDataURL(input.target.files['0']);
    }
  }

  // remove images
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

  // post GIG data
  gig_id: any;
  final_read_ext = [];
  savegig() {
    if (this.gig_sub_category === '' || this.gig_sub_category === null || this.gig_sub_category === undefined) {
      this.gig_sub_category = "Not Specified";
    }
    let formData = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('category', this.gig_category);
    formData.append('sub_category', this.gig_sub_category);
    formData.append('title', this.gig_title);
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
    formData.append('author_work', this.author_work);
    formData.append('faq', this.faq);
    formData.append('img1', this.img1),
      formData.append('img2', this.img2),
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

    for (let z = 1; z <= this.e; z++) {
      var des = $('#des' + z).val();
      var cost = $('#cost' + z).val();
      this.final_read_ext.push({
        description: des,
        cost: cost
      });
    }
    console.log(this.final_read_ext);
    this.authService.auth_upload_gig(formData).subscribe(dat => {
      console.log(dat);
      if (dat.success == true) {
        this.gig_id = dat.msg._id;
        let ext = {
          gig_id: this.gig_id,
          extrs: this.final_read_ext
        }
        this.gigService.post_gig_extrs(ext).subscribe(re => {
          console.log(re);
          if (re.success == true) {
            this.router.navigate(['/my-gigs'], { queryParams: { gig: "newgig" } });
          }
        });
      }
    });
  }

}
