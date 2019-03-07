import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) {
  }
  EmployeeList: Employee[] = new Array;

  ngOnInit() {
    //this.employeeList = this.employeeService.getEmployeeList();
    // this.EmployeeList = this.employeeService.getEmployeeList();
    // console.log(this.EmployeeList);
    this.employeeService.getEmployeeList().subscribe(res => {
      console.log(res);
      if (res != null)
        this.EmployeeList = res;
    },
      error => {
        console.log('Failed load details');
      }
    );

    this.employeeService.NewRecordAdded.subscribe(
      (isUpdated: boolean) => {
        if (isUpdated) {
          this.employeeService.getEmployeeList().subscribe(res => {
            console.log(res);
            if (res != null)
              this.EmployeeList = res;
          },
            error => {
              console.log('Failed load details');
            }
          );
        }
      }
    );

  }

  showForEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  // onDelete(id: number) {
  //   if (confirm('Are you sure to delete this record?') == true) {
  //     this.employeeService.deleteEmployee(id).subscribe(data => {
  //       this.employeeService.getEmployeeList();
  //       this.toastr.warning('Deleted employee successfully', 'Employee Register');
  //     })
  //   }
  // }

}
