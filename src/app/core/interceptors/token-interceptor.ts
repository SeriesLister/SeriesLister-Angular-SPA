import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/online/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : 
        Observable<HttpEvent<any>> {
            let newHeaders = req.headers;
            if (this.authService.jwTokens.hasToken()) {
                newHeaders = newHeaders.append('Authorization', `Bearer ${this.authService.jwTokens.getToken()}`);
            }
            const authReq = req.clone({headers: newHeaders});
            return next.handle(authReq);
        }
    }