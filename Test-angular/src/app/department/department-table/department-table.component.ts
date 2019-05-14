import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../shared/department';
import { DepartmentService } from '../shared/department.service';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {
  departmentList: Department[] = [];
  displayDialog: boolean;

  @ViewChild('departmentform') form: DepartmentFormComponent;
  departmentForm: any;
  constructor(public service: DepartmentService) {
    this.service.loadDepermentList().subscribe(
      response => this.departmentList = response
    )
  }

  ngOnInit() {
    this.query();
  }

  query(condition?: any) {
    this.service.loadDepermentList(condition).subscribe(mUx => this.departmentList = mUx);
  }

  showDialogToAdd() {
    // this.newCar = true;
    // this.car = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    console.log(event);
    this.displayDialog = true;
    const selectedRow = { ...event.data };
    // this.newCar = false;
    // this.car = this.cloneCar(event.data);
    const telephoneList = selectedRow.telephone !== null ? selectedRow.telephone.split(/\s*\,\s*/) : null;

    selectedRow.telephone = telephoneList;
    //เอา telephone ลบออกด้วย length FormArray
    const loop = telephoneList.length - this.form.telephoneFormArray.length;
    for (let i = 0; i < Math.abs(loop); i++) {
      if (loop < 0) {
        //ลบ formControl ใน FormArrary 
        this.form.telephoneFormArray.removeAt(0);
      } else {
        this.form.telephoneFormArray.push(new FormControl());
      }

    }
    console.log(',,,,,,,,, ', selectedRow);
    setTimeout(() => {
      this.form.departmentForm.patchValue(selectedRow);
    }, 500);

  }
  updataSelectedRow(payload: any) {
    const department = {
      departmentCode: payload.departmentCode,
      departmentName: payload.departmentName,
      telephone: payload.telephone.join(','),
      province: payload.province,
      budget: payload.budget,
      status: payload.status
    };
    if (department.departmentCode) {
      this.service.editDepartment(department).subscribe(respone => {
        this.displayDialog = false;
        this.query();
      });
    } else {
      this.service.addDepartment(department).subscribe(repone => {
        this.departmentList.push(repone);
        this.displayDialog = false;
      });
    }
  }
  deleteDepartment(code: string) {
    //สร้าง request delete ไปลบ
    this.service.deleteDepartment(code).subscribe(response => {
      // ลบข้อมูลที่แสดงในตาราง หลังลบ
      const index = this.departmentList.findIndex(department => department.departmentCode === code);
      this.departmentList.splice(index, 1);
    });
  }
  addITem() {
    this.displayDialog = true;
    this.form.departmentForm.reset({status: 'Y', remark: {value: '', disabled: true}});
  }


}
