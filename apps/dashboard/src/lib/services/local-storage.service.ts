import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage | null;

  constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
    if (isPlatformBrowser(this.platformId as object)) {
      this.storage = localStorage;
    } else {
      this.storage = null;
    }
  }
  setItem(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.storage) {
      return this.storage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }

  clear(): void {
    if (this.storage) {
      this.storage.clear();
    }
  }
}
