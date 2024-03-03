import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BlueExpress_Service {
  constructor() {}
  async deleteUrlShort(shortUrl: string): Promise<any> {
    try {
      console.info(`deleteUrlShort  longUrl`, shortUrl);
      const url = 'http://localhost:3000/buex/'+shortUrl ;
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
      const url = 'http://localhost:3000/buex/';
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
      const url = `http://localhost:3000/buex/list/limit/${limit}/startKey/${startKey}`;

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
      const url = `http://localhost:3000/buex/longUrl/${shortUrl}`;

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
