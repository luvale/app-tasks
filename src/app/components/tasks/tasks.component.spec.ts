import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TasksComponent } from './tasks.component';
import { Task } from '../../models/tasks.model';

class MockRouter {
  navigateByUrl(url: string) { return url; }
}

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'pipe').and.returnValue(of(true));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set allTasks when localStorage contains tasks', () => {
    const mockTasks: Task[] = [{ name: 'Task 1', checked: false }, { name: 'Task 2', checked: true }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockTasks));
    component.getMyTasks();

    expect(component.allTasks).toEqual(mockTasks);
  });

  it('should not set allTasks when localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.getMyTasks();

    expect(component.allTasks).toEqual([]);
  });

  it('should save new task when localStorage already contains tasks', () => {
    const existingTasks: Task[] = [{ name: 'Task 1', checked: false }, { name: 'Task 2', checked: true }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(existingTasks));
    spyOn(localStorage, 'setItem');
    component.newTask = 'New Task';
    component.saveForm();
    expect(localStorage.setItem).toHaveBeenCalledWith('myTasks', JSON.stringify([...existingTasks, { name: 'New Task', checked: false }]));
  });

  it('should save new task when localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    component.newTask = 'New Task';
    component.saveForm();
    expect(localStorage.setItem).toHaveBeenCalledWith('myTasks', JSON.stringify([{ name: 'New Task', checked: false }]));
  });

  it('should clear newTask after saving', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    component.newTask = 'New Task';
    component.saveForm();
    expect(component.newTask).toEqual('');
  });
  it('should update task status and save to localStorage', () => {
    const mockTasks: Task[] = [{ name: 'Task 1', checked: false }, { name: 'Task 2', checked: true }];
    component.allTasks = mockTasks;
    spyOn(component, 'setItemInLocalStorage');
    component.updateTasks(0);
    expect(component.allTasks[0].checked).toBe(true);
    expect(component.setItemInLocalStorage).toHaveBeenCalledWith(mockTasks);
  });

  it('should delete task and save to localStorage', () => {
    const mockTasks: Task[] = [{ name: 'Task 1', checked: false }, { name: 'Task 2', checked: true }];
    component.allTasks = mockTasks;
    spyOn(component, 'setItemInLocalStorage');
    component.deleteTask(0);
    expect(component.allTasks.length).toBe(1);
    expect(component.allTasks[0].name).toBe('Task 2');
    expect(component.setItemInLocalStorage).toHaveBeenCalledWith(mockTasks);
  });

  it('should set tasks in localStorage', () => {
    const mockTasks: Task[] = [{ name: 'Task 1', checked: false }, { name: 'Task 2', checked: true }];
    component.setItemInLocalStorage(mockTasks);
    const storedTasksString = localStorage.getItem('myTasks');
    expect(storedTasksString).toBeTruthy();
    const storedTasks = JSON.parse(storedTasksString!);
    expect(storedTasks).toEqual(mockTasks);
  });
});
