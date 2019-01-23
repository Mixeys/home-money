import { Component, OnInit, Input } from "@angular/core";
import { Bill } from "../../shared/models/bill.model";

@Component({
  selector: "mp-bill-card",
  templateUrl: "./bill-card.component.html",
  styleUrls: ["./bill-card.component.scss"]
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any;

  constructor() {}

  ngOnInit() {}
}
