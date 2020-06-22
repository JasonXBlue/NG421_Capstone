import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Ibirthday } from "../interfaces/ibirthday";

@Injectable({
  providedIn: "root",
})
export class BirthdayService {
  private readonly CELEB_URL =
    "https://cors-anywhere.herokuapp.com/https://celebritybucks.com/developers/birthdays/JSON";

  constructor(private http: HttpClient) {}

  getBirthdays(): Observable<{ response: any }> {
    console.log("Birthday request sent!");

    return this.http
      .get<{ response: any }>(this.CELEB_URL)
      .pipe(map((res) => res.response));
  }
}
