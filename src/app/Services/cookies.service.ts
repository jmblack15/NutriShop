import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  setCookie(name: string, value: string, expirationDays: number = 31, path: string = '/') {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=${path}`;
    document.cookie = cookie;
  }

  getCookie(cookieName: string): string | null {
    const cookies = document.cookie.split(';')

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (decodeURIComponent(name) === cookieName) {
        return decodeURIComponent(value);
      }
    }

    return null
  }

}
