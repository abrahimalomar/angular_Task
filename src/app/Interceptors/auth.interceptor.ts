import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../service/loading.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const cloned = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;
  const loadingService = inject(LoadingService); // حقن خدمة التحميل
  loadingService.show();

  return next(cloned).pipe(
    finalize(() => loadingService.hide()) // إيقاف التحميل بعد انتهاء الطلب
  );
  // return next(cloned);

};

// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, switchMap, of } from 'rxjs';

// @Injectable()
// export class AuthService {
//   constructor(private http: HttpClient) {}

//   refreshToken() {
//     return this.http.post<{ token: string }>('/api/refresh-token', {});
//   }
// }

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken');

//   const cloned = token ? req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`
//     }
//   }) : req;

//   return next(cloned).pipe(
//     catchError(error => {
//       if (error.status === 401 && refreshToken) {
//         // إذا كان التوكن غير صالح، حاول تجديده
//         const authService = inject(AuthService);
//         return authService.refreshToken().pipe(
//           switchMap((response) => {
//             // قم بتحديث الـ Access Token في التخزين المحلي
//             localStorage.setItem('token', response.token);

//             // قم بتعديل الطلب الأصلي مرة أخرى مع التوكن الجديد
//             const newRequest = req.clone({
//               setHeaders: {
//                 Authorization: `Bearer ${response.token}`
//               }
//             });

//             return next(newRequest);
//           }),
//           catchError(err => {
//             // إذا فشل تجديد التوكن، يمكن توجيه المستخدم إلى تسجيل الدخول
//             console.error('Refresh token failed', err);
//             return of(error); // يمكن تعديل هذا بناءً على الاحتياجات
//           })
//         );
//       }
//       return of(error); // إذا لم يكن هناك Refresh Token أو لم يكن الخطأ 401، قم بإرجاع الخطأ الأصلي
//     })
//   );
// };
