import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { increaseElementDepthCount } from '@angular/core/src/render3/state';
import { DepartmentTableComponent } from './department-table/department-table.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @Input() hg = 0;
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();
  @ViewChild('departmentTable')
  departmentTable: DepartmentTableComponent

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  incre() {
    console.log('text work');
    this.hg++;
    this.increase.emit(this.hg);
  }

  Union() {
    console.log('text work');
    this.hg -= 3;
    this.decrease.emit(this.hg);
  }
  Cisearch() {
    console.log('This button is Search');
  }
  onConditionSearch(condition: any) {
    console.log('Hello', condition);
    this.departmentTable.query(condition);
  }





}
