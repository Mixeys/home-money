import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApi } from "../../../shared/core/base-api";
import { MPEvent } from "../models/event.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: MPEvent): Observable<MPEvent> {
    return this.post("events", event);
  }
}
