import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

    private serviceUrl: string = 'http://lpa2-api.azurewebsites.net/';
    constructor(private http: Http) { }

    createUser(data: any) {
        return this.http
            .post(this.serviceUrl + 'v1/customers', data)
            .map((res: Response) => res.json());
    }

    authenticate(data: any) {
        var dt = "grant_type=password&username=" + data.username + "&password=" + data.password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.serviceUrl + 'v1/authenticate', dt, options).map((res: Response) => res.json());
    }

    validateToken(token: string) {
        return true;
    }
}