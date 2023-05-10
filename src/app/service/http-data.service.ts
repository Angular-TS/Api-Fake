import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { Participant } from '../model/participant.model';
import { Center } from '../model/center.model';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  Fake_API_Participants = 'http://localhost:3000/api/v1/participants';
  Fake_API_Centers = 'http://localhost:3000/api/v1/centers';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders ({ 'Content-Type': 'application/json' })
  };

  checkError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`ERROR OCURRED ${error.status}, BODY WAS: ${error.error}`);
    }
    else { console.log(`BACKEND RETURNED COD ${error.status}, BODY WAS: ${error.error}`); }
    return throwError (
      'SOMETHING HAPPEND WITH REQUEST, TRY AGAIN.'
    );
  }

  getParticipants(): Observable<Participant> {
    return this.http.get<Participant>(this.Fake_API_Participants)
      .pipe(retry(1), catchError(this.checkError));
  }
  
  getCenters(): Observable<Center> {
    return this.http.get<Center>(this.Fake_API_Centers)
      .pipe(retry(1), catchError(this.checkError));
  }

  getMarathonCenter(centerId: number): Observable<Center> {
    return this.http.get<Center>(`${this.Fake_API_Centers}/${centerId}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  getParticipantsByCenterId(centerId: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.Fake_API_Centers}/${centerId}/participants`)
      .pipe(retry(1), catchError(this.checkError));
  }
}
