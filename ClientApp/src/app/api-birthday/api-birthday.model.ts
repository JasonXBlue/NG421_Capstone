import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class Birthday {
  constructor(
    public celebId: string,
    public name: string,
    public dob: string,
    public havePic: string,
    public twitter: string,
    public price: number,
    public age: number
  ) {}
}

@Injectable({
  providedIn: "root",
})
export class BirthdayAdapter implements Adapter<Birthday> {
  adapt(item: any): Birthday {
    return new Birthday(
      item.celebId,
      item.name,
      item.dob,
      item.havePic,
      item.twitter,
      item.price,
      item.age
    );
  }
}
