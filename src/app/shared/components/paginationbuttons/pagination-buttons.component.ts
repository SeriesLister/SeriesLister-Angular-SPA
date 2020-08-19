import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styleUrls: ['./pagination-buttons.component.css']
})
export class PaginationButtonsComponent {
  
  
  @Input() public totalPages : number = 1;

  @Input() public currentPage : number = 1;
  
  @Output() changePageEmitter = new EventEmitter<number>();

  constructor() {
  }

  public getPage(requestedPage : number) : void {
    if (requestedPage < 1 || requestedPage > this.totalPages) {
      return;
    }

    this.changePageEmitter.emit(requestedPage);
  }
  
}
  
