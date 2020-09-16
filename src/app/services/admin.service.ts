import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": 'https://transactions-reports.herokuapp.com/'
  });
  
  options = { headers: this.httpHeaders };

  constructor(private http: HttpClient,private token: TokenStorageService) { }

  transtionsReport(data): Observable<any> {
    
    return this.http.post('https://cors-anywhere.herokuapp.com/https://sandbox-reporting.rpdpymnt.com/api/v3/transactions/report',data);
      
  }

  transtionList(data): Observable<any> {
    
    return this.http.post('https://cors-anywhere.herokuapp.com/https://sandbox-reporting.rpdpymnt.com/api/v3/transaction/list',data, this.options );
      
  }
  
  transtion(data): Observable<any> {
    
    return this.http.post('https://cors-anywhere.herokuapp.com/https://sandbox-reporting.rpdpymnt.com/api/v3/transaction',data, this.options );
      
  }

  clients(data): Observable<any> {
    
    return this.http.post('https://cors-anywhere.herokuapp.com/https://sandbox-reporting.rpdpymnt.com/api/v3/client',data, this.options );
      
  }
}
