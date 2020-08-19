import { Subject } from 'rxjs';
import { CrudTypes } from '@app/shared/models/crud-types';

export class AdminService {

  /**
   * Keeps track of the state of crud we're in
   */
  private stateSubject: Subject<CrudTypes> = new Subject<CrudTypes>();

  /**
   * The objectId to keep track
   */
  private objectId: number = -1;

  /**
   * The crud types as an enum for the html
   */
  private CrudTypes = CrudTypes;

  constructor() {}

  /**
   * Sets the state to a crud type
   * @param state The crudTypes
   */
  public changeState(state: CrudTypes): void {
    this.stateSubject.next(state);
  }

  /**
   * Restores the defaults for the objectid, and state
   */
  public restoreDefaults(): void {
    this.changeState(CrudTypes.LIST);
    this.setObjectId(-1);
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

  /**
   * Gets the crud types
   */
  public getCrudTypes() {
    return this.CrudTypes;
  }

  /**
   * Gets the state subject
   */
  public getStateSubject() {
    return this.stateSubject;
  }

}
