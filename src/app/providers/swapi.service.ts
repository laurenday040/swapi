import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP_REQUESTS } from '../app.constants';
import { Observable } from 'rxjs';
import { StarshipModel } from '../components/models/starship.interface';
import { RequestModel } from '../components/models/request.interface';

@Injectable()
export class SwapiService {
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    })


    constructor(private http: HttpClient) {

    }

    public getStarships(): Observable<RequestModel<StarshipModel>> {
        return this.http.get(HTTP_REQUESTS.STARSHIP, { headers: this.headers }) as any;
    }
}