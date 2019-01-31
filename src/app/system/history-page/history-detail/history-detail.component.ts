import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { EventsService } from "../../shared/services/events.service";
import { CategoryService } from "../../shared/services/category.service";
import { MPEvent } from "../../shared/models/event.model";
import { Category } from "../../shared/models/category.model";
import { Subscription } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "mp-history-detail",
  templateUrl: "./history-detail.component.html",
  styleUrls: ["./history-detail.component.scss"]
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  event: MPEvent;
  category: Category;
  isLoaded = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.sub = this.route.params
      .pipe(
        mergeMap((params: Params) =>
          this.eventsService.getEventById(params["id"])
        )
      )
      .pipe(
        mergeMap((event: MPEvent) => {
          this.event = event;
          return this.categoryService.getCategoryById(event.category);
        })
      )
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
