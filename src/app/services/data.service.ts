import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

    constructor (private http: Http){}

    createUser(data: any) {
        console.log(data);
    }

    getCourses(){
       return this.http
                  .get('https://abt-api.azurewebsites.net/api/courses')
                  .map((res: Response) => res.json());    
    }
}