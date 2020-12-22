import { Component, Input, OnInit } from "@angular/core";

interface IDocument {
  title: String;
  image: URL;
  description: String;
  last_edited_on: String;
}

/**
 * @title Card with multiple sections
 */
@Component({
  selector: "document-card",
  templateUrl: "document-card.component.html",
  styleUrls: ["document-card.component.scss"],
})
export class DocumentCard {
  @Input() doc: IDocument;
}
