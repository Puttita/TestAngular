import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @Input() topic = 'Search Department';
  @Output() search1 = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() active = new EventEmitter();
  @Output() deavetive = new EventEmitter();
  departmentForm = new FormGroup({
    departmentName: new FormControl(null, [this.badWordValidator('Fuck') , Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    province: new FormControl(null),
    budgetFrom: new FormControl(null, Validators.pattern(/^[0-9]+$/)),
    budgetTo: new FormControl(null, Validators.pattern(/^[0-9]+$/)),
    status: new FormControl('y'),
    telephone: new FormControl(null, Validators.pattern(/^\d+$/)),
    remark: new FormControl({ value: '', disabled: true },
      Validators.maxLength(10))
  });
  You = null;
  cities1: SelectItem[];

  constructor() {
    this.cities1 = [
      { label: 'None', value: '' },
      { label: 'Bangkok', value: { id: 1, name: 'Bankok', code: 'NY' } },
      { label: 'Chonburi', value: { id: 2, name: 'Chonburi', code: 'RM' } },
    ];
  }
  badWordValidator(word: string): ValidatorFn{
    // type ValidatorFn = (control: AbstractControl)=>ValidationErrors |null
    return (control: AbstractControl): ValidationErrors => {
      const departmentName: string = control.value;
      if (departmentName && departmentName.indexOf(word) !== -1) {
        return {Fuck: true};
      }
  // ถ้า return เป็น object จะหมายถึง validate ไม่ผ่าน
  // ถ้า return null หมายถึง validate ผ่าน
      return null;
    };
  }

  ngOnInit() {

  }
  pFlukValidator(control: AbstractControl): ValidationErrors {
    const departmentName: string = control.value;

    if (departmentName && departmentName.indexOf('Fuck') !== -1) {
      return {Fuck: true};
    }

// ถ้า return เป็น object จะหมายถึง validate ไม่ผ่าน
// ถ้า return null หมายถึง validate ผ่าน
    return null;
  }
  
  search() {
    if (this.departmentForm.valid) {
      const formGroupRawValue = this.departmentForm.getRawValue();
      const condition = {};
      Object.keys(formGroupRawValue).forEach(key => {
        if (formGroupRawValue[key]) {
          condition[key] = formGroupRawValue[key];
        }
      });
      this.search1.emit(condition);
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
    if (y === 'y') {
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
  // Deavetive(h:string){
  //   console.log('This',h)
  //   this.deavetive.emit('');
  // }



}
