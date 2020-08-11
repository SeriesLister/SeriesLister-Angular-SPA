import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CatchInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newHeaders: HttpHeaders = req.headers;
        newHeaders = req.headers.append('Content-Type', 'application/json');
        return next.handle(req.clone({headers: newHeaders}));
    }

}