import { Injectable } from '@angular/core';
import { StorageService, StorageType } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  
  /**
   * The storage key
   */
  private readonly THEME_KEY = StorageType.THEME;

  /**
   * The dark theme class name
   */
  private readonly DARK_THEME_CLASS_NAME = 'theme-dark';

  /**
   * data type of the theme type in use
   */
  private themeType: ThemeType;

  constructor(private storage: StorageService) {}

  /**
   * Sets the theme on app startup
   */
  public setThemeOnStart() {
    this.setTheme(this.storage.getFromStorage(this.THEME_KEY));
  }

  /**
   * Toggles the theme between light and dark
   */
  public toggle(): void {
    switch(this.themeType) {
      case ThemeType.DARK:
        this.setTheme(ThemeType.LIGHT);
      break;

      case ThemeType.LIGHT:
        this.setTheme(ThemeType.DARK);
      break;
    }
  }

  /**
   * Sets the theme based on the supplied theme type
   * @param themeType The theme type
   */
  private setTheme(themeType: ThemeType) {
    this.themeType = themeType;
    this.storage.addToStorage(this.THEME_KEY, themeType);
    themeType === ThemeType.LIGHT ?
    document.body.classList.remove(this.DARK_THEME_CLASS_NAME) :
    document.body.classList.add(this.DARK_THEME_CLASS_NAME);
  }

}

/**
 * The types of themes
 */
enum ThemeType {
  DARK = "Dark", 
  LIGHT = "Light"
}