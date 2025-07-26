import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient:HttpClient) { }

  sendMessage(form:object):Observable<any>
  {
    return this.httpClient.post('https://formspree.io/f/myzpyjyz',form);
  }
}
