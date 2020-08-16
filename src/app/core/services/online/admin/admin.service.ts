import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudTypes } from '@app/shared/models/crud-types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  /**
   * Keeps track of the state of crud we're in
   */
  public stateEmitter: Subject<CrudTypes> = new Subject<CrudTypes>();

  /**
   * The objectId to keep track
   */
  private objectId: number = -1;

  constructor() { }

  /**
   * Sets the state to a crud type
   * @param state The crudTypes
   */
  public changeState(state: CrudTypes): void {
    this.stateEmitter.next(state);
  }

  /**
   * Sets the defaults for the objectid, and state
   */
  public setDefaults(): void {
    this.stateEmitter.next(CrudTypes.LIST);
    this.objectId = -1;
  }

  /**
   * Gets the id for the object
   */
  public getObjectId(): number {
    return this.objectId;
  }

  /**
   * Sets the id for the object
   * @param id The id of the object
   */
  public setObjectId(id: number): void {
    this.objectId = id;
  }

/**
 * Sets the crudtype and id
 * @param state The crudtype to set
 * @param id The objectid to set
 */
  public setCrudTypeAndId(state: CrudTypes, id: number = -1) {
    this.changeState(state);
    this.setObjectId(id);
  }

}
