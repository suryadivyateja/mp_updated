import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { GigComponent } from './gig/gig.component';
import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageSalesComponent } from './manage-sales/manage-sales.component';
import { PaymentsComponent } from './payments/payments.component';
import { EditGigComponent } from "./edit-gig/edit-gig.component";
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { MyGigsComponent } from './my-gigs/my-gigs.component';
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { InboxComponent } from './inbox/inbox.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { OrderDetailsSellerComponent } from './order-details-seller/order-details-seller.component';
import { OrderDetailsBuyerComponent } from './order-details-buyer/order-details-buyer.component';
import { PasswordComponent } from './password/password.component';
import { PaymentFinancialsComponent } from './payment-financials/payment-financials.component';
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';
import { IdVerificationComponent } from './id-verification/id-verification.component';

import { ErrorComponent } from './error/error.component';
import { CreateGigNewComponent } from './create-gig-new/create-gig-new.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
      path: 'home',
      component: HomeComponent
  },
  {
      path: 'categories',
      component: CategoriesComponent
  },
  {
      path: 'create-gig',
      component: CreateGigNewComponent
  },
  {
      path: 'edit-gig',
      component: EditGigComponent
  },
  {
      path: 'gig',
      component: GigComponent
  },
  {
      path: 'seller',
      component: SellerComponent
  },
  {
      path: 'buyer',
      component: BuyerComponent
  },
  {
      path: 'checkout',
      component: CheckoutComponent
  },
  {
      path: 'dashboard',
      component: DashboardComponent
  },
  {
      path: 'manage-orders',
      component: ManageOrdersComponent
  },
  {
      path: 'manage-sales',
      component: ManageSalesComponent
  },
  {
      path: 'payments',
      component: PaymentsComponent
  },
  {
      path: 'withdrawals',
      component: WithdrawalsComponent
  },
  {
      path: 'my-gigs',
      component: MyGigsComponent
  },
  {
      path: 'inbox',
      component: InboxComponent
  },
  {
      path: 'notifications',
      component: NotificationsComponent
  },
  {
      path: 'cg',
      component: CreateGigNewComponent
  },
  {
      path: 'order-details',
      component: OrderDetailsSellerComponent
  },
  {
      path: 'order-details-buyer',
      component: OrderDetailsBuyerComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
      path: 'favorites',
      component: FavoritesComponent
  },
  {
      path: 'feedback',
      component: FeedbackComponent
  },
//   {
//       path: 'order-details',
//       component: OrderDetailsComponent
//   },
  {
      path: 'settings',
      component: SettingsComponent,
      children: [
          {
              path: '',
              redirectTo: 'profile',
              pathMatch: 'full'
          },
          {
              path: 'profile',
              component: ProfileSettingsComponent
          },
          {
              path: 'password',
              component: PasswordComponent
          },
          {
              path: 'payments',
              component: PaymentFinancialsComponent
          },
          {
              path: 'email-notifications',
              component: EmailNotificationsComponent
          },
          {
              path: 'id-verification',
              component: IdVerificationComponent
          },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
