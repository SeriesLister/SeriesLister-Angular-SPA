import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Gets and return the type inside the local storage
   * @param storageType The storage type to find
   */
  getFromStorage(storageType: StorageType): any {
    return localStorage ? localStorage.getItem(storageType) : null;
  }

  /**
   * Removes the type inside the local storage
   * @param storageType The storage type to find
   */
  removeFromStorage(storageType: StorageType): void {
    if (localStorage) {
      localStorage.removeItem(storageType);
    }
  }

  /**
   * Saves the data with the storage type specified into local storage
   * @param storageType The storage type
   * @param value The data that's being saved to the storage type
   */
  addToStorage(storageType: StorageType, value: any): void {
    if (localStorage) {
      localStorage.setItem(storageType, value);
    }
  }

  /**
   * Clears the storage
   */
  clearStorage() {
    if (localStorage) {
      localStorage.clear();
    }
  }
  
}

/**
 * The type of storages
 */
export enum StorageType {
  THEME = 'theme'
}
