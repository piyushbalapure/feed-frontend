import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DocumentCard } from "./document-card.component";

describe("DocumentCard", () => {
  let component: DocumentCard;
  let fixture: ComponentFixture<DocumentCard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentCard],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
