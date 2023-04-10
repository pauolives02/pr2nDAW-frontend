import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          let errorMsg = ''
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`
          }
          else {
            // errorMsg = `Error Code: ${error.status},  Message: ${error.message}`
            errorMsg = error.error.msg
          }
          console.log(errorMsg)
          return throwError(errorMsg)
        })
      )
  }
}