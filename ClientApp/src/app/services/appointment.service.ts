import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IAppointment } from "../interfaces/iappointment";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(
    private httpClient: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  async getAppointments() {
    return this.httpClient
      .get<IAppointment[]>("${this.baseUrl}appointment")
      .toPromise();
  }

  async addAppointment(appointment: IAppointment) {
    return await this.httpClient
      .post<IAppointment>("${this.baseUrl}appointment", appointment)
      .toPromise();
  }
}
