import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
const URL = "http://localhost:3000/";

@Injectable({
  providedIn: "root",
})
export class DocumentsApiService {
  constructor(private _http: HttpClient) {}

  searchDocuments(
    searchText: String,
    sortBy: String,
    currentPage: Number,
    pageSize: Number
  ) {
    return this._http.get(
      `${URL}documents/search?searchText=${searchText}&sortBy=${sortBy}&currentPage=${currentPage}&pageSize=${pageSize}`
    );
  }
}
