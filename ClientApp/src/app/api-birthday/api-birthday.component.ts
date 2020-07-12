import {
  Component,
  OnInit,
  Injectable,
  PipeTransform,
  Pipe,
  Input,
} from "@angular/core";
import { Ibirthday } from "../interfaces/ibirthday";
import { BirthdayService } from "../services/birthday.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Birthday } from "./api-birthday.model";

@Pipe({ name: "values" })
@Component({
  selector: "app-api-birthday",
  templateUrl: "./api-birthday.component.html",
  styleUrls: ["./api-birthday.component.css"],
})
@Injectable()
export class ApiBirthdayComponent implements OnInit {
  // private CELEB_URL =
  //   "https://cors-anywhere.herokuapp.com/https://celebritybucks.com/developers/birthdays/JSON";

  birthdays: any[];

  @Input()
  result$: Observable<any>;

  constructor(private birthdayService: BirthdayService) {
    //this.result$ = birthdayService.getBirthdays();
  }

  // async getBirthdays() {
  //   return await this.httpClient.get<Ibirthday[]>(this.CELEB_URL).toPromise();
  // }

  async ngOnInit() {
    //this.birthdayService.getBirthdays();
    // this.birthdays = this.birthdayService.getBirthdays();
    // console.log(this.birthdays);
    // this.result$.subscribe((res) => {
    //   this.birthdays = res.birthdays;
    //   console.log(this.birthdays);
    //   return this.birthdays;
    // });
  }
}
