import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { AuthService } from '../services/auth.service';
import { GigService } from '../services/gig.service';
import { AppComponent } from '../app.component';
import * as moment from 'moment';
declare var $: any;
declare var require: any;
require('raty-js');

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  // tslint:disable-next-line:max-line-length
  constructor(private title: Title, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private gigService: GigService, private app: AppComponent) { }

  user_id: string;
  name: string;
  email: string;
  profile_pic: string;
  country: string;
  city: string;
  skills: string;
  custom = {};
  designation: string;
  sk = [];
  skill_exist: boolean;
  description: string;
  date: string;
  us: any;

  rc_num: number;
  or_num: number;
  vr_num: number;
  lp_num: number;
  rl_num: number;
  gigs = [];
  all_gigs = [];
  rc_gigs = [];
  or_gigs = [];
  vr_gigs = [];
  lp_gigs = [];
  rl_gigs = [];
  all_len = 0;
  reviews;
  f_rev = [];
  f_rev_len = 0;
  join_date: string;
  total_days: number;
  orderd_date: string;
  pro_com_date;
  completed_jobs = [];
  top_rat = [];
  comp_jobs_num = 0;
  total_earnings: number;
  f_total_earnings = '0';

  order_description: string;
  cus_order_date: string;
  cus_delivery_date: any;
  cus_order_image: string;
  buyer_id: string;
  avg_rat;
  five_rat = [];
  four_rat = [];
  three_rat = [];
  two_rat = [];
  one_rat = [];
  f_five_rat;
  f_four_rat;
  f_three_rat;
  f_two_rat;
  f_one_rat;
  reviews_len = 0;
  reviews_sum = 0;
  f_avg_rat: number;
  user: boolean;
  ngOnInit() {

    this.title.setTitle('Seller Profile | Market Place');
    var user = localStorage.getItem('user');
    if (user === null || user === undefined || user === '') {
      this.buyer_id = '';
    } else {
      const u = JSON.parse(user);
      this.buyer_id = u.id;
    }
    console.log(user);
    this.user_id = this.activatedRoute.queryParams['_value'].id;

    if (this.user_id === this.buyer_id) {
      this.user = true;
    } else {
      this.user = false;
    }

    this.authService.getUser(this.user_id).subscribe(dat => {
      console.log(dat);
      const us = dat.msg;
      this.name = us.name + ' ' + us.last_name;
      this.profile_pic = us.profile_pic;
      if (us.country === null || us.country === undefined) {
        this.country = '';
      } else {
        this.country = us.country;
      }
      // this.city = us.city;
      this.join_date = moment(us.date).format('MMM YYYY');
      this.email = us.email;
      if (us.designation === null || us.designation === undefined) {
        this.designation = '';
      } else {
        this.designation = us.designation;
      }
      this.skills = us.skills;
      if (this.skills === '' || this.skills === null || this.skills === undefined) {
        // this.sk;

      } else {
        this.sk = this.skills.split(',');
      }
      if (us.description === null || us.description === undefined) {
        this.description = '';
      } else {
        this.description = us.description;
      }
      this.date = us.date;
    });

    this.gigService.get_gigsby_id(this.user_id).subscribe(re => {
      console.log(re);
      if (re.msg.length > 0) {
        re.msg.forEach(element => {
          if (!element.pause) {
            this.all_len += 1;
            // console.log(a);
            element['name'] = this.name;
            element['gig_img_main'] = element.img1.replace('public', '');
            this.gigService.get_orders_seller(element.user_id).subscribe(order => {
              if (order.msg.length > 0) {
                let i = 0;
                order.msg.forEach(o => {
                  if (o.gig_id === element._id) {
                    if (o.order_status === 'Order Delivered') {
                      i++;
                    }
                    element['jobes_done'] = i;
                  } else {
                    element['jobes_done'] = i;
                  }
                });
              } else {
                element['jobes_done'] = 0;
              }
            });
            const fav = {
              gig_id: element._id,
              user_id: this.buyer_id
            };
            this.gigService.get_fav_gig(fav).subscribe(favv => {
              if (favv.msg.length > 0) {
                element['fav_status'] = true;
              } if (favv.msg === 'No gig') {
                element['fav_status'] = false;
              }
            });
            // rc
            if (element.category === 'rc') {
              console.log('rc');
              this.rc_gigs.push(element);
              element['category'] = 'Resume/CV';
            }
            // or
            if (element.category === 'or') {
              this.or_gigs.push(element);
              element['category'] = 'Cover Letters';
            }
            // vr
            if (element.category === 'vr') {
              this.vr_gigs.push(element);
              element['category'] = 'LinkedIn Makeover';
            }
            // lp
            if (element.category === 'lp') {
              this.lp_gigs.push(element);
              element['category'] = 'Selection Criteria';
            }
            if (element.category === 'rl') {
              console.log('rl');
              this.rl_gigs.push(element);
              element['category'] = 'Reference Letter';
            }
            console.log(this.rl_gigs);
            // aggrigate
            this.rc_num = this.rc_gigs.length;
            this.or_num = this.or_gigs.length;
            this.vr_num = this.vr_gigs.length;
            this.lp_num = this.lp_gigs.length;
            this.rl_num = this.rl_gigs.length;

            this.gigService.get_reviews(this.user_id).subscribe(rev => {
              let total_rat = 0;
              let number_of_rating = 0;
              let average_rating = 0;
              if (rev.msg.length > 0) {
                rev.msg.forEach(revv => {
                  if (revv.gig_id === element._id) {
                    // tslint:disable-next-line:radix
                    total_rat = total_rat + parseInt(revv.score);
                    number_of_rating++;
                  }
                });
                average_rating = Math.round(total_rat / number_of_rating);
                if (Number.isNaN(average_rating)) {
                  element['star1'] = '../assets/star-off.png';
                  element['star2'] = '../assets/star-off.png';
                  element['star3'] = '../assets/star-off.png';
                  element['star4'] = '../assets/star-off.png';
                  element['star5'] = '../assets/star-off.png';
                } else {
                  switch (average_rating) {
                    case 1:
                      element['star1'] = '../assets/star-on.png';
                      element['star2'] = '../assets/star-off.png';
                      element['star3'] = '../assets/star-off.png';
                      element['star4'] = '../assets/star-off.png';
                      element['star5'] = '../assets/star-off.png';
                      break;
                    case 2:
                      element['star1'] = '../assets/star-on.png';
                      element['star2'] = '../assets/star-on.png';
                      element['star3'] = '../assets/star-off.png';
                      element['star4'] = '../assets/star-off.png';
                      element['star5'] = '../assets/star-off.png';
                      break;
                    case 3:
                      element['star1'] = '../assets/star-on.png';
                      element['star2'] = '../assets/star-on.png';
                      element['star3'] = '../assets/star-on.png';
                      element['star4'] = '../assets/star-off.png';
                      element['star5'] = '../assets/star-off.png';
                      break;
                    case 4:
                      element['star1'] = '../assets/star-on.png';
                      element['star2'] = '../assets/star-on.png';
                      element['star3'] = '../assets/star-on.png';
                      element['star4'] = '../assets/star-on.png';
                      element['star5'] = '../assets/star-off.png';
                      break;
                    case 5:
                      element['star1'] = '../assets/star-on.png';
                      element['star2'] = '../assets/star-on.png';
                      element['star3'] = '../assets/star-on.png';
                      element['star4'] = '../assets/star-on.png';
                      element['star5'] = '../assets/star-on.png';
                      break;

                    default:
                      break;
                  }
                }
              } else {
                element['star1'] = '../assets/star-off.png';
                element['star2'] = '../assets/star-off.png';
                element['star3'] = '../assets/star-off.png';
                element['star4'] = '../assets/star-off.png';
                element['star5'] = '../assets/star-off.png';
              }
            });
            this.gigs.push(element);
            this.all_gigs = this.gigs;
          } else {
            // this.all_len = a;
          }
        });
      } else {
        $('.gigs-div').html('NO GIGS TO SHOW :(');
        $('.gigs-div').css('background-color', 'grey');
      }
    });

    this.gigService.get_reviews(this.user_id).subscribe(order => {
      if (order.msg.length !== 0) {
        this.reviews = order.msg;
        this.reviews_len = this.reviews.length
        this.avg_rat = 0;
        this.reviews_sum = 0;
        let raty = [];
        let five_rat = [];
        let four_rat = [];
        let three_rat = [];
        let two_rat = [];
        let one_rat = [];
        let toprat = 0;
        let avg_rating = 0;
        this.reviews.forEach(element => {
          // this.avg_rat = +this.avg_rat + +element.score;
          avg_rating = avg_rating + parseInt(element.score);
          this.reviews_sum = +this.reviews_sum + +element.score;
          // console.log(this.reviews_sum);
          switch (element.score) {
            case '5':
              five_rat.push(element.score);
              break;
            case '4':
              four_rat.push(element.score);
              break;
            case '3':
              three_rat.push(element.score);
              break;
            case '2':
              two_rat.push(element.score);
              break;
            case '1':
              one_rat.push(element.score);
              break;

            default:
              break;
          }

          this.authService.getUser(element.buyer_id).subscribe(us => {
            let u = us.msg;
            switch (element.score) {
              case '5':
                five_rat.push(element.score);
                raty = ['../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png',];
                break;
              case '4':
                four_rat.push(element.score);
                raty = ['../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-off.png',];
                break;
              case '3':
                three_rat.push(element.score);
                raty = ['../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-off.png', '../assets/star-off.png',];
                break;
              case '2':
                two_rat.push(element.score);
                raty = ['../assets/star-on.png', '../assets/star-on.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png',];
                break;
              case '1':
                one_rat.push(element.score);
                raty = ['../assets/star-on.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png',];
                break;

              default:
                break;
            }
            let obj = {
              buyer_name: u.name,
              profile_pic: u.profile_pic,
              date: moment(element.date).format('MMM Do YY'),
              raty: raty,
              review: element.review
            }
            this.f_rev.push(obj);
            this.f_rev_len = this.f_rev.length;
          });
        });
        if (five_rat.length > 0) {
          this.f_five_rat = (five_rat.length / this.reviews_len) * 100 + '%';
        } else {
          this.f_five_rat = five_rat.length + '%';
        }
        if (four_rat.length > 0) {
          this.f_four_rat = (four_rat.length / this.reviews_len) * 100 + '%';
        } else {
          this.f_four_rat = four_rat.length + '%';
        }
        if (three_rat.length > 0) {
          this.f_three_rat = (three_rat.length / this.reviews_len) * 100 + '%';
        } else {
          this.f_three_rat = three_rat.length + '%';
        }
        if (two_rat.length > 0) {
          this.f_two_rat = (two_rat.length / this.reviews_len) * 100 + '%';
        } else {
          this.f_two_rat = two_rat.length + '%';
        }
        if (one_rat.length > 0) {
          this.f_one_rat = (one_rat.length / this.reviews_len) * 100 + '%';
        } else {
          this.f_one_rat = one_rat.length + '%';
        }

        // if(this.avg_rat==''||this.avg_rat==null||this.avg_rat==undefined){
        //   this.avg_rat = 0;
        // }else{
        //   this.avg_rat = this.avg_rat/this.reviews_len;
        // }
        //  this.f_avg_rat = this.avg_rat.toFixed(1);
        this.f_avg_rat = Math.round(avg_rating / this.reviews_len);
        toprat = Math.round(this.f_avg_rat);
        if (Number.isNaN(toprat)) {
          this.top_rat = ['../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png',];
        } else {
          switch (toprat) {
            case 1:
              this.top_rat = ['../assets/star-on.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png',];
              break;
            case 2:
              this.top_rat = ['../assets/star-on.png', '../assets/star-on.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png',];
              break;
            case 3:
              this.top_rat = ['../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-off.png', '../assets/star-off.png',];
              break;
            case 4:
              this.top_rat = ['../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-off.png',];
              break;
            case 5:
              this.top_rat = ['../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png', '../assets/star-on.png',];
              break;

            default:
              break;
          }
        }
        this.f_rev_len = this.f_rev.length;
        $('#raty').raty({
          starOn: '../assets/star-on.png',
          starOff: '../assets/star-off.png',
          starHalf: '../assets/star-half.png',
          half: true,
          readOnly: true,
          number: 5,
          score: this.f_avg_rat,
        });
      } else {
        this.f_rev_len = 0;
        this.f_avg_rat = 0.0;
        $('#raty').raty({
          starOn: '../assets/star-on.png',
          starOff: '../assets/star-off.png',
          starHalf: '../assets/star-half.png',
          half: true,
          readOnly: true,
          number: 5,
          score: this.f_avg_rat,
        });
        this.top_rat = ['../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png', '../assets/star-off.png',];
      }
    });
    // jobs completd
    this.gigService.get_orders_seller(this.user_id).subscribe(orders => {
      let o = orders.msg
      if (orders.msg.length > 0) {
        let total_earnings = 0;
        let completed_jobs = [];
        orders.msg.forEach(element => {
          let total_days = +element.assigned_days + +element.total_ext_days;
          let pro_com_date = moment(element.date).add(total_days, 'day').format('MMM Do YY');

          if (element.order_status == 'Order Delivered') {
            completed_jobs.push(element);
            total_earnings = total_earnings + element.total_amount;
          }
          total_earnings = total_earnings - (total_earnings * 5 / 100);
        });
        this.f_total_earnings = total_earnings.toFixed(0);
        this.comp_jobs_num = completed_jobs.length;
      } else {
        this.comp_jobs_num = 0;
        this.f_total_earnings = '0';
      }

    })
    $('#cust-submit').click(function () {
      $('.confirm-order').css({ 'display': 'block' });
    });
  }
  open_cus() {
    if (this.authService.loggedIn() === true) {
      if (this.user_id !== this.buyer_id) {
        $('.custom-order-div-back').css({ 'display': 'flex' });
      }
    } else {
      // this.app.showBackLogin(true);
    }
  }
  closeCustOrder() {
    $('.custom-order-div-back').css({ 'display': 'none' });
  }
  open_pop(com) {
    if (com == 'open') {
      $('.custom-order-core').css({ 'display': 'none' });
      $('.confirm-order').css({ 'display': 'block' });
    }
    if (com == 'close') {
      $('.confirm-order').css({ 'display': 'none' });
      $('.custom-order-core').css({ 'display': 'block' });
    }
  }

  gigs_get(cat) {
    switch (cat) {
      case 'all':
        this.gigs = this.all_gigs;
        // console.log(this.gigs);
        $('.cat-btns').removeClass('ser-selected');
        $('#all-btn').addClass('ser-selected');
        break;
      case 'rc':
        this.gigs = this.rc_gigs;
        $('.cat-btns').removeClass('ser-selected');
        $('#rc-btn').addClass('ser-selected');
        break;
      case 'or':
        this.gigs = this.or_gigs;
        $('.cat-btns').removeClass('ser-selected');
        $('#or-btn').addClass('ser-selected');
        break;
      case 'vr':
        this.gigs = this.vr_gigs;
        $('.cat-btns').removeClass('ser-selected');
        $('#vr-btn').addClass('ser-selected');
        break;
      case 'lp':
        this.gigs = this.lp_gigs;
        $('.cat-btns').removeClass('ser-selected');
        $('#lp-btn').addClass('ser-selected');
        break;
      case 'rl':
        this.gigs = this.rl_gigs;
        $('.cat-btns').removeClass('ser-selected');
        $('#rl-btn').addClass('ser-selected');
        break;
      default:
        break;
    }
  }

  addtoFav(gig_id, event, gig) {
    if (this.authService.loggedIn() === true) {
      if (gig.user_id !== this.buyer_id) {
        let fav = {
          gig_id: gig_id,
          user_id: this.buyer_id
        }
        this.gigService.add_to_fav(fav).subscribe(res => {
          console.log(res);
          if (res.msg1 == 'added to favorites') {
            this.all_gigs.forEach(element => {
              if (element._id == gig_id) {
                element.fav_status = true;
              }
            });
            this.authService.getUser(this.buyer_id).subscribe(buyer => {
              if (buyer.success) {
                let new_not_s = {
                  user_id: this.user_id,
                  message: buyer.msg.name + buyer.msg.last_name + '' + 'Added your GIG to favorites',
                  date: moment(),
                  status: 'not_seen',
                  image: buyer.msg.profile_pic,
                  destination: 'gig',
                  link: gig_id
                }
                this.gigService.post_notification(new_not_s).subscribe(not_s => {
                  console.log(not_s);
                });
              }
            });
          }
          if (res.msg == 'removed from favorites') {
            this.all_gigs.forEach(element => {
              if (element._id == gig_id) {
                element.fav_status = false;
              }
            });
          }
        });
      } else {
        let msg = {
          text: 'You can\'t add your own GIG to favorites'
        }
        this.app.error_pop(msg);
      }
    } else {
      // this.app.showBackLogin(true);
    }
  }

  gotoGig(id) {
    this.router.navigate(['/gig'], { queryParams: { id: id } });
  }

  fileChange(event) {
    this.cus_order_image = event.target.files[0];
  }


  date_cus: string;
  post_custom_order() {
    $('.dark-back').css({'display':'flex'});
    this.cus_order_date = moment().format('MMM Do YY');
    if (this.cus_delivery_date === '' || this.cus_delivery_date === null || this.cus_delivery_date === undefined) {
      this.cus_delivery_date = 'date not enclosed';
    }
    let formData = new FormData();
    formData.append('seller_id', this.user_id);
    formData.append('buyer_id', this.buyer_id);
    formData.append('orderd_date', this.cus_order_date);
    formData.append('order_description', this.custom['description']);
    formData.append('order_image', this.cus_order_image);
    formData.append('delivery_date', this.cus_delivery_date.formatted);

    this.gigService.place_cus_order(formData).subscribe(res => {
      console.log(res);
      if (res.success) {
        $('.dark-back').css({'display':'none'});
        $('.cdb').hide();
        let or = res.msg;
        let new_not_b = {
          user_id: or.buyer_id,
          message: '<p class="bold">You have Placed a <span class="bold">New Custom Order</span></p>',
          date: moment(),
          image: '../assets/custom-order.png',
          status: 'not_seen',
          destination: 'order-details',
          link: or._id
        }
        this.gigService.post_notification(new_not_b).subscribe(not_b => {
        });
        this.authService.getUser(this.buyer_id).subscribe(buyer => {
          if (buyer.success) {
            let new_not_s = {
              user_id: or.seller_id,
              message: '<p class="bold">You Got a <span >New Custom Order</span> from' + ' ' + '<span class="bold">'+ buyer.msg.name+' '+buyer.msg.last_name+'</span></p>',
              date: moment(),
              image: buyer.msg.profile_pic,
              status: 'not_seen',
              destination: 'order-details',
              link: or._id
            }
            this.gigService.post_notification(new_not_s).subscribe(not_b => {
            });
          }
        })
      }
    });
  }
  go_to_inbox() {
    console.log('yes');
    if (this.authService.loggedIn() === true) {
      console.log(1);
      if (this.user_id !== this.buyer_id) {
        let new_conv = {
          from: this.buyer_id,
          to: this.user_id,
        }
        this.gigService.check_conversation(new_conv).subscribe(res => {
          console.log(res);
          if (res.success) {
            if (res.msg[0] !== null && res.msg[0] !== undefined) {
              this.router.navigate(['/inbox'], { queryParams: { seller_id: this.user_id, conv_id: res.msg[0].conv_id } });
            } else {
              this.router.navigate(['/inbox'], { queryParams: { seller_id: this.user_id, conv_id: res.msg.conv_id } });
            }
          }
        });
      } else {
        let msg = {
          text: 'You can\'t message your self'
        }
        this.app.error_pop(msg);
      }
    } else {
      // this.app.showBackLogin(true);
    }
  }
  closeDB() {
    $('.cdb').hide();
  }
  openDB() {
    $('.cdb').css({ 'display': 'flex' });
  }
}
