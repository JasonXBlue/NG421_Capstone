import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { CalendarComponent } from "./calendar/calendar.component";
import { EventComponent } from "./event/event.component";
import { CustomerComponent } from "./customer/customer.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "calendar", component: CalendarComponent },
      { path: "events", component: EventComponent },
      { path: "customers", component: CustomerComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
