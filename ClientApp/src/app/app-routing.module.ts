import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      {
        path: "appointments",
        component: AppointmentComponent,
        canActivate: [AuthorizeGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
