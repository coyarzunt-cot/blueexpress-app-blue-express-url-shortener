import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  private get ourStorage(): Storage {
    return sessionStorage;
  }

  setItem(key: string, value: any) {
    this.ourStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): any {
    const data = this.ourStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
    return data;
  }
  removeItem(key: string) {
    this.ourStorage.removeItem(key);
  }
  clear(): void {
    this.ourStorage.clear();
  }
}
