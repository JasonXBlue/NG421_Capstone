import { Injectable } from "@angular/core";
import { map, filter, switchMap } from "rxjs/operators";
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

  //   public getBirthdays() : Observable<{ response: any}>{
  //     return this.http.get('https://cors-anywhere.herokuapp.com/https://celebritybucks.com/developers/birthdays/JSON')
  //     .map((response: Response) => {
  //         return response.json().map(this.transformData);
  //     })
  //     .catch((error: Response) => { return Observable.throw('Something went wrong');})
  //     .subscribe(data => console.log(data),
  //     (error)=> console.log('err'));
  // }

  // public transformData(r:any): Ibirthday{
  //     let postData = <Ibirthday>({
  //         name: r.name,
  //         age: r.age,

  //     });
  //     return postData;
  // }
}
