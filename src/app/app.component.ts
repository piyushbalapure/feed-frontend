import { Component, OnDestroy, OnInit } from "@angular/core";
import { DocumentsApiService } from "./services/api-services/documents.api.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { chunk } from "lodash";
import { LoaderService, LoaderState } from "./services/loader.service";
const DEFAULT_PAGE_SIZE = 10;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  documents = [];
  totalCount = 0;
  pageSize = DEFAULT_PAGE_SIZE;
  pageSizeOptions: number[] = [];
  searchText = "";
  sortBy = "title";
  showLoader = true;

  private loaderSubscription: Subscription;
  private searchTextModelChanged: Subject<string> = new Subject<string>();
  private searchTextModelChangeloaderSubscription: Subscription;

  constructor(
    private documentsApiService: DocumentsApiService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.setPagination();
    this.searchDocuments();

    this.loaderSubscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.showLoader = state.show;
      }
    );

    this.searchTextModelChangeloaderSubscription = this.searchTextModelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchText) => {
        this.searchText = searchText;
        this.searchDocuments();
      });
  }

  ngOnDestroy() {
    this.searchTextModelChangeloaderSubscription.unsubscribe();
    this.loaderSubscription.unsubscribe();
  }

  searchDocuments(event: PageEvent = new PageEvent()) {
    this.documents = [];
    const currentPage = event.pageIndex ? event.pageIndex + 1 : 1;
    const pageSize = event.pageSize || this.pageSize;

    this.documentsApiService
      .searchDocuments(this.searchText, this.sortBy, currentPage, pageSize)
      .subscribe((response: any) => {
        this.documents = response.result;
        this.totalCount = response.totalCount;
        this.setPagination();
      });
  }

  setPagination() {
    this.pageSize = DEFAULT_PAGE_SIZE;
    this.pageSizeOptions = this.getPageSizeOptions();
  }

  makeChunks(array: [], chunkSize: number) {
    return chunk(array, chunkSize);
  }

  getPageSizeOptions() {
    const pageSizeOptions = [];
    for (let i = DEFAULT_PAGE_SIZE; i <= this.totalCount; i += this.pageSize) {
      pageSizeOptions.push(i);
    }
    return pageSizeOptions;
  }
}
