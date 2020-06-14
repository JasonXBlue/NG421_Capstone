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

// @Injectable({
//   providedIn: 'root'
// })

// get your own key from https://holidayapi.com/
const HOLIDAY_API_KEY = "79e7b46541aa1ae9154a5cc239ab80ccaae02fe1";

// change this to your own country
const COUNTRY_CODE = "US";

interface Holiday {
  date: string;
  name: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: "holiday"; holiday: Holiday } | { type: "normal" }
>;

@Injectable({
  providedIn: "root",
})
export class HolidayApiService {
  //export class HolidayApiService implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate = startOfYear(subYears(new Date(), 1));

  events: CalendarEventWithMeta[] = [];

  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.fetchHolidays();
  // }

  public fetchHolidays() {
    this.http
      .get<{ holidays: Holiday[] }>(
        "https://calendarific.com/api/v2/holidays",
        {
          params: {
            api_key: HOLIDAY_API_KEY,
            country: COUNTRY_CODE,
            year: String(new Date().getFullYear()),
          },
        }
      )
      .subscribe(({ holidays }) => {
        this.events = holidays.map((holiday) => {
          return {
            start: new Date(holiday.date),
            title: holiday.name,
            allDay: true,
            meta: {
              type: "holiday",
              holiday,
            },
          };
        });

        // this.cdr.markForCheck();
      });
  }
}
