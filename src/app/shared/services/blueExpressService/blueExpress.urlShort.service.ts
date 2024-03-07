import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BlueExpress_Service {
  urlBaseMs = ""
  constructor() {
    this.urlBaseMs = environment.urlBaseMs;
  }
  async deleteUrlShort(shortUrl: string): Promise<any> {
    try {
      console.info(`deleteUrlShort  longUrl`, shortUrl);
      const url = `${ this.urlBaseMs}/buex/`+shortUrl ;
      console.info(`deleteUrlShort  url`, url);
      const response = await axios.delete(url);
      console.info('deleteUrlShort-response', response);
      return response.data;
    } catch (error) {
      console.error('deleteUrlShort error', error);
      throw new Error(`Connection service to function createUrlShort error`);
    }
  }

  async createUrlShort(longUrl: string): Promise<any> {
    try {
      console.info(`createUrlShort  longUrl`, longUrl);
      const url = `${ this.urlBaseMs}/buex/`;
      const config: AxiosRequestConfig = {
        data: {
          longUrl: longUrl,
        },
      };
      console.info(`createUrlShort  config`, config);
      const response = await axios.post(url, { longUrl: longUrl });
      console.info('createUrlShort-response', response);
      return response.data;
    } catch (error) {
      console.error('createUrlShort error', error);
      throw new Error(`Connection service to function createUrlShort error`);
    }
  }

  async getList(limit: number, startKey: string): Promise<any> {
    try {
      console.info(`createUrlShort  listShorts limit`, limit, 'startKey:', startKey);
      const url = `${ this.urlBaseMs}/buex/list/limit/${limit}/startKey/${startKey}`;

      console.info(`createUrlShort  url`, url);
      const response = await axios.get(url);
      console.info('createUrlShort-response', response);
      return response.data;
    } catch (error) {
      console.error('createUrlShort error', error);
      throw new Error(`Connection service to function createUrlShort error`);
    }
  }

  async getByUrlShort(shortUrl: string): Promise<any> {
    try {
      console.info('getByUrlShort  listShorts shortUrl:', shortUrl);
      const url = `${ this.urlBaseMs}/buex/longUrl/${shortUrl}`;

      console.info(`createUrlShort  url`, url);
      const response = await axios.get(url);
      console.info('createUrlShort-response', response);
      return response.data;
    } catch (error) {
      console.error('createUrlShort error', error);
      throw new Error(`Connection service to function createUrlShort error`);
    }
  }
}
