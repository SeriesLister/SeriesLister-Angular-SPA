import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  /**
   * Specify the size of the button
   * 'large', 'small', 'wide'
   */
  @Input()
  public size: string = '';

  @Input()
  public text: string = 'Button';

  /**
   * Specify the type of button, default is button.
   * 'submit', 'reset', 'button'
   */
  @Input()
  public type: string = 'button';

  /**
   * The disable logic for the button
   */
  @Input()
  public disabledLogic: any;

  constructor() { }

  ngOnInit(): void {
  }

}
