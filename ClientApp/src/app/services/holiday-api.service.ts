import { Injectable } from "@angular/core";
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CalendarEvent, CalendarView } from "angular-calendar";
import { HttpClient } from "@angular/common/http";
import { startOfYear, subYears } from "date-fns";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Holiday } from "../interfaces/holiday";

// get your own key from https://calendarific.com/
//const HOLIDAY_API_KEY = "79e7b46541aa1ae9154a5cc239ab80ccaae02fe1";

@Injectable({
  providedIn: "root",
})
export class HolidayApiService {
  private readonly URL =
    "https://calendarific.com/api/v2/holidays?api_key=79e7b46541aa1ae9154a5cc239ab80ccaae02fe1&country=US&year=2020&type=national";

  constructor(private http: HttpClient) {}

  getHolidays(): Observable<{ response: any }> {
    return this.http
      .get<{ response: any }>(this.URL)
      .pipe(map((res) => res.response));
  }
}
