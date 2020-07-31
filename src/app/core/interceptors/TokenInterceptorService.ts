import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService, Alert, Status } from '../services/offfline/alert.service';
import { AuthService } from '../services/auth-service.service';
import { JWTokens } from '../../jwt/JWTokens';

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
                                        this.authService.jwTokens = new JWTokens(data['refreshToken'], data['token']);
                                        this.authService.jwTokens.storeTokensInternal();
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