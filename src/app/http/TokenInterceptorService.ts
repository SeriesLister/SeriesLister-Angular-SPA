import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, pipe, throwError, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, retryWhen, mergeMap, delay, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService, Alert, Status } from '../services/alert.service';
import { AuthService } from '../services/auth-service.service';

@Injectable({
    providedIn: 'root'
})
//TOKEN DOESN'T SAVE!
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private route: Router, 
        private notification: AlertService, 
        private authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : 
        Observable<HttpEvent<any>> {
            let newHeaders = req.headers;
            const token : boolean = this.authService.jwTokens.hasToken();//gives an error if it's null need method to return string length 0
            if (token) {
                newHeaders = newHeaders.append('Authorization', `Bearer ${this.authService.jwTokens.getToken()}`);
            }

            const authReq = req.clone({headers: newHeaders});
            return next.handle(authReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        if (!this.authService.jwTokens.hasToken()) {
                            this.notification.add(new Alert("Invalid login", Status.DANGER));
                            this.authService.logout();
                            this.route.navigateByUrl("/login");
                            return EMPTY;
                        }

                        return this.authService.refreshTokens(this.authService.user.email, 
                            this.authService.jwTokens.getRefreshToken()).pipe(
                                switchMap((data) => {
                                    if (data['token'] && data['refreshToken']) {
                                        this.authService.jwTokens.setRefreshToken(data['refreshToken']);
                                        this.authService.jwTokens.setToken(data['token']);
                                        let newHeaders1 = req.headers;
                                        newHeaders1 = newHeaders1.append('Authorization', `Bearer ${this.authService.jwTokens.getToken()}`);
                                        const authReq1 = req.clone({headers: newHeaders1});
                                        return next.handle(authReq1);
                                    }
                                        this.notification.add(new Alert("Invalid login", Status.DANGER));
                                        this.authService.logout();
                                        this.route.navigateByUrl("/login");
                                        return EMPTY;
                                })
                            );
                    } else if (error.status === 403) {
                        this.notification.add(new Alert("Invalid permissions", Status.DANGER));
                        this.route.navigateByUrl("/dashboard");
                        return EMPTY;//Returning EMPTY cancels the pipe
                    }
                    return EMPTY;
                })
            );

    }

}