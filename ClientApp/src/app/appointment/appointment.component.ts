import { Component, OnInit } from "@angular/core";
import { IAppointment } from "../interfaces/iappointment";
import { AppointmentService } from "../services/appointment.service";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"],
})
export class AppointmentComponent implements OnInit {
  appointment: IAppointment = {
    firstName: "",
    lastName: "",
    phone: "",
    date: new Date(),
    serviceType: "",
  };

  appointments: IAppointment[] = [];

  constructor(private service: AppointmentService) {}

  async ngOnInit() {
    this.appointments = await this.service.getAppointments();
    console.log(this.appointments);
  }

  async save() {
    const newAppointment = await this.service.addAppointment(this.appointment);
    this.appointments.push(newAppointment);
    console.log(newAppointment);
  }
}
