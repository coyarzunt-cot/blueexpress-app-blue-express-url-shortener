import { Injectable } from '@angular/core';
import { SessionData } from '@shared/interfaces/sessionData';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  sesionData: SessionData = {
    companyId: 0,
    rol: '',
    user: '',
  };

  constructor() {}

  set(sesionDataIn: SessionData) {
    this.sesionData = sesionDataIn;
  }

  get(): SessionData {
    return this.sesionData;
  }

  getCompanyId(): number {
    return this.sesionData.companyId;
  }
  clear(): void {
    this.sesionData = {
      companyId: 0,
      rol: '',
      user: '',
    };
  }
}
