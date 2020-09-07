import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService, Alert, Status } from '../services/offline/alert.service';
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
                    return this.redirect("Invalid login", '/login', true);
                }

                return this.authService.refreshTokens(
                    this.authService.userHandler.getUser().email, 
                    this.authService.jwTokens.getRefreshToken()).pipe(
                    switchMap((response: TokensResponse) => {
                        if (response.success) {
                            let newHeaders = req.headers.set('Authorization', `Bearer ${response.token}`);
                            return next.handle(req.clone({headers: newHeaders}));
                        } else {
                            return this.redirect("Invalid login", '/login', true);
                        }
                    })
                );

            } else if (error.status === 403) {
                return this.redirect("You shouldn't be accessing this", '/dashbaord');
            }
        }));
    }

    /**
     * Send a danger alert and redirects the user, returns EMPTY
     * @param message The danger alert to notify the user
     * @param route The route to navigate to
     * @param isLogout Default false, do we want to logout the user
     */
    private redirect(message: string, route: string, isLogout = false): Observable<never> {
        this.notification.add(new Alert(message, Status.DANGER));
        this.route.navigateByUrl(route);
        if (isLogout) this.authService.logout();
        return EMPTY;
    }

}