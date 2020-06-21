import {
  Component,
  OnInit,
  Injectable,
  PipeTransform,
  Pipe,
} from "@angular/core";
import { Ibirthday } from "../interfaces/ibirthday";
import { HttpClient } from "@angular/common/http";

@Pipe({ name: "values" })
@Component({
  selector: "app-api-birthday",
  templateUrl: "./api-birthday.component.html",
  styleUrls: ["./api-birthday.component.css"],
})
@Injectable()
export class ApiBirthdayComponent implements OnInit, PipeTransform {
  private CELEB_URL =
    "https://cors-anywhere.herokuapp.com/https://celebritybucks.com/developers/birthdays/JSON";

  birthdays: Ibirthday[] = [];

  constructor(private httpClient: HttpClient) {}

  transform(value, args: string[]): any {
    let values = [];
    for (let key in value) {
      values.push(value[key]);
    }
    return values;
  }

  // transform(birthday, args: string[]): any {
  //   let birthdays = [];
  //   for (let key in birthday) {
  //     birthdays.push(birthday[key]);
  //   }
  //   console.log(this.birthdays);
  //   return birthdays;
  // }

  async getBirthdays() {
    return await this.httpClient.get<Ibirthday[]>(this.CELEB_URL).toPromise();
  }

  async ngOnInit() {
    this.birthdays = await this.getBirthdays();
    console.log(this.birthdays);

    // let bMap = new Map(Object.entries(this.birthdays));
    // bMap.values();
    // bMap.entries();
  }
}
