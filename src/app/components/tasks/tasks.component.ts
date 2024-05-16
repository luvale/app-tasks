import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../interfaces/note';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  newTask:string = '';
  allTasks:Task[] = [];

  ngOnInit(): void {
    this.getMyTasks();
  }
  getMyTasks(){
    const myTasksString = localStorage.getItem("myTasks");
    if (myTasksString !== null) {
      const myTasks: Task[] = JSON.parse(myTasksString);
      this.allTasks = myTasks;
    }
  }
  saveForm(){
    const myTasks = localStorage.getItem("myTasks");
    const task = {
      name: this.newTask,
      checked: false
    }
    if (myTasks) {
      const newTasks = JSON.parse(myTasks);
      newTasks.push(task);
      localStorage.setItem("myTasks", JSON.stringify(newTasks));
    } else {
      localStorage.setItem("myTasks", JSON.stringify([task]));  
    }
    this.newTask = '';
    this.getMyTasks();
  }
  updateTasks(index:number) {
    this.allTasks[index].checked = !this.allTasks[index].checked;
    this.setItemInLocalStorage(this.allTasks);
  }
  deleteTask(index:number){
    this.allTasks.splice(index, 1);
    this.setItemInLocalStorage(this.allTasks);
  }
  setItemInLocalStorage(tasks:Task[]) {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }
}
