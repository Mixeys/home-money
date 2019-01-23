import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { BaseApi } from "../../../shared/core/base-api";

@Injectable({
  providedIn: "root"
})
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<any> {
    return this.get("bill");
  }

  getCurrency(base: string = "UAH"): Observable<any> {
    return this.http.get(
      `http://data.fixer.io/api/latest?access_key=8430a3de2480fc69417a87befe0bb3eb`
    );
  }
}
