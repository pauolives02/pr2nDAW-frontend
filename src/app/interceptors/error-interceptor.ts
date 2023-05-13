import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { Injectable, Inject } from '@angular/core';
import { MessageModalService } from '../services/messageModal.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private messageModalService: MessageModalService
  ) {}

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

          this.messageModalService.openModal(errorMsg, 0)

          return throwError(errorMsg)
        })
      )
  }
}