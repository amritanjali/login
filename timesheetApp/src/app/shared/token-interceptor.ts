import{Injectable} from'@angular/core';
import {HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse } from'@angular/common/http';
import { Observable, from } from "rxjs";
import { map } from 'rxjs/operators';
import{AuthenticationService} from'./authentication.service'
import { async } from 'q';
// import { PassThrough } from 'stream';

@Injectable()

export class TokenInterceptor implements  HttpInterceptor {

    constructor(private authService: AuthenticationService) { }
    //function which will be called for all http calls
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token: string = localStorage.getItem('token');
        // const authData = this.authService.getToken();
    
        //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + authData)
        //     .set('Content-Type', 'application/json')
        //     .set('org-name', 'timesheet')

        // });
        // let currentUser = this.authService. getToken();
        //   if (currentUser && currentUser.token) {
        //     console.log("inter cept current user" + currentUser)
        //     console.log("interceptor current user toknr" + currentUser.token)
        //     request = request.clone({
        //         setHeaders: { 
        //             token: currentUser.token
        //         }
        //     });
        // }
        return next.handle(request);


    }
}
