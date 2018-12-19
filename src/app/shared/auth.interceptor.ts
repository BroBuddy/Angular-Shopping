import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';

import * as AppReducers from '../store/app.reducers';
import * as AuthReducers from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppReducers.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted', req);

        return this.store.select('auth').pipe(
            switchMap((authState: AuthReducers.State) => {
                const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });

                return next.handle(copiedReq);
            })
        );
    }
}
