import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "mp-currency-card",
  templateUrl: "./currency-card.component.html",
  styleUrls: ["./currency-card.component.scss"]
})
export class CurrencyCardComponent {
  @Input() currency: any;
  currencies: string[] = ["USD", "UAH"];
}
