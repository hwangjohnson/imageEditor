import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, URLSearchParams } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { ResponseContentType, RequestContentType, ResponseType } from './enum';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppSettings } from './AppSettings';
import { Router } from '@angular/router';
//import { CommonUtils } from './common-utils';

@Injectable()
export class ApiServiceService {
  constructor(private http: Http, private router: Router) {}
  get(
    path: string,
    params: Object,
    acceptType?: ResponseContentType,
    contentType?: RequestContentType
  ): Observable<any> {
    const httpParams = new HttpParams();

    if (params) {
      for (const key in params) {
        httpParams.set(key, params[key]);
      }
    }

    return this.http
      .get(`${AppSettings.ApiBaseUrl}${path}`, {
        headers: this.getHeaders(contentType, acceptType)
        //params: httpParams
      })
      .pipe(
        map(res =>
          acceptType && acceptType != ResponseContentType.Json
            ? res
            : res.json()
        )
      )
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            localStorage.clear();
            this.redirectToLogin();
          }
          return Observable.throw(error.json().error || 'Server error');
        })
      );
  }
  put(
    path: string,
    body: Object = {},
    acceptType?: ResponseContentType,
    contentType?: RequestContentType
  ): Observable<any> {
    console.log(path + ' : ' + JSON.stringify(body));

    let options = new RequestOptions({
      headers: this.getHeaders(contentType, acceptType)
    });

    return this.http
      .put(
        `${AppSettings.ApiBaseUrl}${path}`,
        contentType === RequestContentType.FORM
          ? this.getUrlParams(body)
          : contentType === RequestContentType.FORM_DATA
          ? this.getFormData(body)
          : body,
        options
      )
      .pipe(
        map(res =>
          acceptType && acceptType !== ResponseContentType.Json
            ? res
            : res.json()
        )
      )
      .pipe(
        catchError(error => {
          return Observable.throw(error.json().error || 'Server error');
        })
      );
  }
  post(
    path: string,
    body: Object = {},
    acceptType?: ResponseContentType,
    contentType?: RequestContentType
  ): Observable<any> {
    return this.postAs(path, body, acceptType, contentType).pipe(
      catchError(error => {
        return this.formatErrors(error, path, body, acceptType, contentType);
      })
    );
  }
  postAs(
    path: string,
    body: Object = {},
    acceptType?: ResponseContentType,
    contentType?: RequestContentType,
    skipToken = false
  ): Observable<any> {
    console.log(path + ' : ' + JSON.stringify(body));

    let options = new RequestOptions({
      headers: this.getHeaders(contentType, acceptType, skipToken)
    });

    return this.http
      .post(
        `${AppSettings.ApiBaseUrl}${path}`,
        contentType === RequestContentType.FORM
          ? this.getUrlParams(body)
          : contentType === RequestContentType.FORM_DATA
          ? this.getFormData(body)
          : body,
        options
      )
      .pipe(
        map(res =>
          acceptType && acceptType !== ResponseContentType.Json
            ? res
            : res.json()
        )
      );
  }
  getUrlParams(body: Object): URLSearchParams {
    let httpParams = new URLSearchParams();

    if (body) {
      for (const key in body) {
        httpParams.set(key, body[key]);
      }
    }

    return httpParams;
  }
  getFormData(body: Object) {
    let formData = new FormData();

    if (body) {
      for (const key in body) {
        let data = body[key];

        if (Array.isArray(data)) {
          data.forEach(element => {
            formData.append(key, element);
          });
        } else {
          formData.append(key, data);
        }
      }
    }

    return formData;
  }
  formatErrors(
    error,
    path: string,
    body: Object = {},
    acceptType?: ResponseContentType,
    contentType?: RequestContentType
  ): Observable<any> {
    if (error.status === 401) {
      localStorage.clear();
      this.redirectToLogin();
    } else if (error.status === 403) {
      //Access Denied
      let err = error.json();
      //CommonUtils.toaster(err.Message, ResponseType.ERROR);
      this.redirectToHome();
      return throwError(error.json().error || 'Access Denied');
    } else if (error.status === 409) {
      //Access Denied
      let err = error.json();
      //CommonUtils.toaster(err.Message, ResponseType.ERROR);
      this.redirectToLogin();
      return throwError(error.json().error || 'Access Denied');
    } else if (error.status === 500) {
      let err = error.json();
      //CommonUtils.toaster(err.Message, ResponseType.ERROR);
      //Internal Server Error
      return throwError(error.json().error || 'Internal Server Error');
    } else if (error.status === 400) {
      let err = error.json();
      //CommonUtils.toaster(err.Message, ResponseType.ERROR);
      //Bad Request
      return throwError(error.json().error || 'Bad Request');
    } else if (error.status === 422) {
      let err = error.json();
      //CommonUtils.toaster(err.Message, ResponseType.ERROR);
      //Bad Request
      return throwError(JSON.parse(error._body) || 'Somthing went wrong!');
    } else {
      return throwError(error.json().error || 'Server error');
    }
  }
  private redirectToLogin() {
    this.router.navigate(['signin']);
  }
  private redirectToHome() {
    this.router.navigate(['home']);
  }

  getHeaders(
    contentType: RequestContentType,
    acceptType: ResponseContentType,
    skipToken = false
  ) {
    const headersConfig = new Headers();

    // headersConfig.append('Access-Control-Allow-Origin', '*');
    // headersConfig.append('Access-Control-Allow-Headers', 'Content-Type');

    if (!contentType) {
      contentType = RequestContentType.JSON;
    }
    if (!acceptType) {
      acceptType = ResponseContentType.Json;
    }

    if (contentType == RequestContentType.FORM_DATA)
      headersConfig.append('enctype', this.getContentType(contentType));
    else headersConfig.append('Content-Type', this.getContentType(contentType));
    headersConfig.append('Accept', this.getAcceptType(acceptType));

    if (!skipToken) {
      const token = localStorage.getItem('token');
      if (token) {
        headersConfig.append('Authorization', `bearer ${token}`);
      }
    }
    return headersConfig;
  }
  private getContentType(contentType: RequestContentType): string {
    let val = '';
    switch (contentType) {
      case RequestContentType.FORM:
        val = 'application/x-www-form-urlencoded';
        break;

      case RequestContentType.FORM_DATA:
        val = 'multipart/form-data';
        break;

      case RequestContentType.JSON:
        val = 'application/json';
        break;
    }

    return val;
  }
  private getAcceptType(acceptType: ResponseContentType): string {
    let val = '';
    switch (acceptType) {
      case ResponseContentType.Blob:
        val = 'application/octet-stream';
        break;

      case ResponseContentType.Text:
        val = 'text/plain';
        break;

      case ResponseContentType.Json:
        val = 'application/json';
        break;
    }

    return val;
  }
}
