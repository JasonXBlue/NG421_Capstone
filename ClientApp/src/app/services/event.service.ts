import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ievent } from "../interfaces/ievent";

@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(
    private httpClient: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  async getEvents() {
    return this.httpClient.get<Ievent[]>(this.baseUrl + "event").toPromise();
  }

  async addEvent(event: Ievent) {
    return await this.httpClient
      .post<Ievent>(this.baseUrl + "event", event)
      .toPromise();
  }
}
