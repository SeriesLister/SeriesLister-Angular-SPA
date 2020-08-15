import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService, Alert, Status } from '../services/offfline/alert.service';
import { AuthService } from '../services/online/authentication.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TokensResponse } from '@app/shared/models/responses/impl/tokens-response';

@Injectable({
    providedIn: 'root'
})
export class CatchInterceptor implements HttpInterceptor {

    constructor(private route: Router, 
                private notification: AlertService, 
                private authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(
            req.clone({
                headers: req.headers
            })
        ).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                if (!this.authService.jwTokens.hasToken()) {
                    this.notification.add(new Alert("Invalid login", Status.DANGER));
                    this.authService.logout();
                    this.route.navigateByUrl("/login");
                    return EMPTY;
                }

                return this.authService.refreshTokens(
                    this.authService.userHandler.getUser().email, 
                    this.authService.jwTokens.getRefreshToken()).pipe(
                    switchMap((response: TokensResponse) => {
                        if (response.success) {
                            let newHeaders = req.headers.set('Authorization', `Bearer ${response.token}`);
                            return next.handle(req.clone({headers: newHeaders}));
                        } else {
                            this.notification.add(new Alert("Invalid login", Status.DANGER));
                            this.authService.logout();
                            this.route.navigateByUrl("/login");
                            return EMPTY;
                        }
                    })
                );

            } else if (error.status === 403) {
                this.notification.add(new Alert("You shouldn't be accessing this", Status.DANGER));
                this.route.navigateByUrl('/dashbaord');
                return EMPTY;
            }

            return EMPTY;
        }));
    }

}