import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm( form?: NgForm){
    if( form != null)
    form.reset();
    this.employeeService.selectedEmployee = {
      EmpId:null,
      EmpFName:'',
      EmpLName:'',
      Department:'',
      EmpStatus:0
    }
  }

  onSubmit(form: NgForm)
  {
    debugger;
    if(form.value.empId == null){
      this.employeeService.postEmployee(form.value).subscribe(data => {
        this.resetForm(form);
       this.employeeService.getEmployeeList().subscribe(r => {
         console.log(r);
       }
        
        );
        this.toastr.success('New record added successfully','Employee Register');
       })
    }
    else {
      // this.employeeService.putEmployee(form.value.empId, form.value).subscribe(data =>{
      //   this.resetForm(form);
      //   this.employeeService.getEmployeeList();
      //   this.toastr.info('Record updated successfully', 'Employee Register');
      //   })
    }
  }

}
