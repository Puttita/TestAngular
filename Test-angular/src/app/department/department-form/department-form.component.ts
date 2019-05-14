import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlDirective, FormArray } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  telephoneFormArray: FormArray;
  [x: string]: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() active = new EventEmitter();

  departmentForm = new FormGroup({
    departmentCode: new FormControl(),
    departmentName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.maxLength(50)]),
    telephone: new FormArray ([new FormControl('')]),
    province: new FormControl(null),
    budget: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(11)]),
    status: new FormControl(null),
    remark: new FormControl({ value: '', disabled: true },
      [Validators.required, Validators.maxLength(255)])
  });
  cities1: SelectItem[];
  constructor() {
    this.cities1 = [
      { label: 'None', value: '' },
      { label: 'Bangkok', value: 'Bangkok' },
      { label: 'Chonburi', value: 'Chonburi' },
    ];
  }
  departmenrCtrl = this.departmentForm.get('departmentName');
  // addedTelephoneFormArrayCtyl = this.departmentForm.get('addedTelephoneFormArray') as FormArray;
  budget = this.departmentForm.get('budget');
  remarkCtrl = this.departmentForm.get('remark');
  telephoneCtrl = this.departmentForm.get('telephone');
  provinceCtrl = this.departmentForm.get('province');
  provinceOptions = this.cities1;


  ngOnInit() {
  this.telephoneFormArray = this.departmentForm.get('telephone') as FormArray;
  }

  Save() {
    if (this.departmentForm.valid) {
      const formGroupRawValue = this.departmentForm.getRawValue();
      const condition = {};
      Object.keys(formGroupRawValue).forEach(key => {
        if (formGroupRawValue[key]) {
          condition[key] = formGroupRawValue[key];
        }
      });
      this.save.emit(condition);
      // console.log();
    } else {
      Object.values(this.departmentForm.controls).forEach(formControl => {
        formControl.markAsTouched();
      });
    }
  }
  Cancel() {
    console.log('Hello')
    this.cancel.emit('');
    this.departmentForm.reset();
  }
  Active(y: string, R3: HTMLInputElement) {
    if (y === 'Y') {
      // this.You = false;
      // R3.value = '';
      this.departmentForm.get('remark').setValue(null);
      this.departmentForm.get('remark').disable();
    } else {
      this.departmentForm.get('remark').enable();
      // this.You = null;
    }
    console.log('Love', y)
    this.active.emit('');
  }
  addTelephone() {
    this.telephoneFormArray
      .push(new FormControl('', [Validators.required]));
  }

  de(item: number){
    this.telephoneFormArray.removeAt(item);
  }
  }


