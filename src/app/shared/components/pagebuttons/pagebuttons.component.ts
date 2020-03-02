import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagebuttons',
  templateUrl: './pagebuttons.component.html',
  styleUrls: ['./pagebuttons.component.css']
})
export class PagebuttonsComponent {
  
  
  @Input() public maxPage : number = 1;

  @Input() public currentPage : number = 1;

  constructor() {
  }

  @Output() changePage = new EventEmitter<number>();

  public getPage(requestedPage : number) : void {
    if (requestedPage < 1 || requestedPage > this.maxPage) {
      console.log("can't get the page it's over!");
      return;
    }

    this.changePage.emit(requestedPage);
  }
  
}
  
