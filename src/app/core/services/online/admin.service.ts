import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudTypes } from '@app/shared/models/crud-types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public stateManager: Subject<CrudTypes> = new Subject<CrudTypes>();

  private id: number = -1;

  constructor() { }

  public changeState(state: CrudTypes): void {
    this.stateManager.next(state);
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

}
