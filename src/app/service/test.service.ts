import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { user } from '../modal/user';
import { LoginResponse } from '../modal/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://pim.itmd-b1.com/api/api/Authentication/Login';
  private refreshUrl = 'https://pim.itmd-b1.com/api/api/Authentication/RefreshToken';
  private key: string = 'yuioplkjgrewqsdfvcserfhy';
  private IV: string = 'MagB1#V2';
  private refreshTimeout: any;

  constructor(private http: HttpClient) { }

  private encryptUsingTripleDES(data: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.IV);
    const mode = CryptoJS.mode.CBC;
    const encrypted = CryptoJS.TripleDES.encrypt(data, keyHex, { iv, mode });
    return encrypted.toString();
  }

  login(data: user): Observable<LoginResponse> {
    const encryptedPassword = this.encryptUsingTripleDES(data.Password);
    const encryptedData = { ...data, Password: encryptedPassword };

    return this.http.post<LoginResponse>(this.url, encryptedData).pipe(
      tap(response => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("refreshToken", response.refreshToken);
        this.scheduleTokenRefresh(response.token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return throwError("Refresh token not available");

    return this.http.post<LoginResponse>(this.refreshUrl, { refreshToken }).pipe(
      tap(response => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("refreshToken", response.refreshToken);
        this.scheduleTokenRefresh(response.token);
      }),
      catchError(error => {
        this.logout();
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    if (this.refreshTimeout) clearTimeout(this.refreshTimeout);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  private scheduleTokenRefresh(token: string): void {
    const expirationDate = this.getTokenExpirationDate(token);
    if (!expirationDate) return;

    const expiresIn = expirationDate.getTime() - Date.now() - 2 * 60 * 1000; // الوقت المتبقي مع خصم دقيقتين

    if (this.refreshTimeout) clearTimeout(this.refreshTimeout);

    if (expiresIn > 0) {
      this.refreshTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
      }, expiresIn);
    }
  }

  private getTokenExpirationDate(token: string): Date | null {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload || !payload.exp) return null;

    return new Date(payload.exp * 1000);
  }
}
