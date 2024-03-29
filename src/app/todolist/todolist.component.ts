import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  taskArray = [
    { taskName: 'review 3 - angular', isCompleted: false, isEditable: false },
  ];

  constructor(private cdr: ChangeDetectorRef, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false,
    });

    this.toastr.success('task added succesfully!');

    form.reset();
  }

  onDelete(index: number) {
    console.log(index);

    this.taskArray.splice(index, 1);
    this.toastr.info('task deleted');
  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;
  }

  onSave(index: number, newtask: string) {
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
  }
  onClearAll() {
    console.log('Clearing completed tasks...');
    this.taskArray = this.taskArray.filter((task) => !task.isCompleted);
    this.taskArray = this.taskArray.filter((task) => task.isCompleted);
    console.log('Updated taskArray:', this.taskArray);

    // Manually trigger change detection to update the view
    this.cdr.detectChanges();
  }
}
