import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Employee } from './employee.model';

import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employeeList: Observable<Employee[]>;
  @Output() NewRecordAdded = new EventEmitter();

  constructor(private httpC: HttpClient) { }

  getEmployeeList(): Observable<any> {
    return this.httpC.get('http://localhost:64756/api/Employee');
  }

  postEmployee(emp: Employee) {
    var body = JSON.stringify(emp);

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      )
    };
    return this.httpC.post<Employee>('http://localhost:64756/api/Employee', body, httpOptions);
    
  }

  // putEmployee(id: number, emp: Employee) {
  //   var body = JSON.stringify(emp);
  //   var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  //   var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions })
  //   return this.http.put('http://localhost:64756/api/Employee/' + id, body, requestOptions).map(x => x.json());
  // }

  // deleteEmployee(id: number) {
  //   return this.http.delete('http://localhost:64756/api/Employee/' + id).map(res => res.json);
  // }

;
}
