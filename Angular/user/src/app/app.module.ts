import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from "@angular/http";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { GigComponent } from './gig/gig.component';
import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageSalesComponent } from './manage-sales/manage-sales.component';
import { PaymentsComponent } from './payments/payments.component';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { MyGigsComponent } from './my-gigs/my-gigs.component';
import { InboxComponent } from './inbox/inbox.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OrderDetailsSellerComponent } from './order-details-seller/order-details-seller.component';
import { OrderDetailsBuyerComponent } from './order-details-buyer/order-details-buyer.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { PasswordComponent } from './password/password.component';
import { PaymentFinancialsComponent } from './payment-financials/payment-financials.component';
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';
import { IdVerificationComponent } from './id-verification/id-verification.component';
import { ErrorComponent } from './error/error.component';
import { Ng2CarouselamosModule } from "ng2-carouselamos";
import { MyDatePickerModule } from 'mydatepicker';
// services
import { AuthService } from "./services/auth.service";
import { GigService } from "./services/gig.service";
import { ValidateService } from "./services/validate.service";
import { CreateGigNewComponent } from './create-gig-new/create-gig-new.component';
import { EditGigComponent } from "./edit-gig/edit-gig.component";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    EditGigComponent,
    OrderDetailsComponent,
    GigComponent,
    SellerComponent,
    BuyerComponent,
    CheckoutComponent,
    SubHeaderComponent,
    DashboardComponent,
    ManageOrdersComponent,
    ManageSalesComponent,
    PaymentsComponent,
    WithdrawalsComponent,
    MyGigsComponent,
    InboxComponent,
    NotificationsComponent,
    OrderDetailsSellerComponent,
    OrderDetailsBuyerComponent,
    FavoritesComponent,
    FeedbackComponent,
    SettingsComponent,
    ProfileSettingsComponent,
    PasswordComponent,
    PaymentFinancialsComponent,
    EmailNotificationsComponent,
    IdVerificationComponent,
    ErrorComponent,
    CreateGigNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    Ng2CarouselamosModule,
    MyDatePickerModule
  ],
  providers: [AuthService,GigService,ValidateService,HeaderComponent,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
