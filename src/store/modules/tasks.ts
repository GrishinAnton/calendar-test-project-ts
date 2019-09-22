import { Mutation, State, Getter, Action } from 'vuex-simple';
import tasksData from '../../lib/data/tasks';
import { isSameDay, isSameMonth } from 'date-fns';

export class TasksModule {

  public tasksData: any = tasksData;

  @State()
  public tasks: any = [];
  public currentDayTasks: [] = [];
  public addTaskState: boolean = true;


  @Mutation()
  public setTasks(payLoad: []): void {
    this.tasks = payLoad;
  }

  @Mutation()
  public setCurrentDayTasks(payLoad: []): void {
    this.currentDayTasks = payLoad;
  }

  @Mutation()
  public setAddTaskState(payLoad: boolean): void {
    this.addTaskState = payLoad;
  }

  @Mutation()
  public changeTask({ id, checked }: {id: string, checked: boolean}) {
    this.tasks.map((item: { id: string; complete: boolean; }) => {
      if (item.id === id) {
        item.complete = checked;
      }
    });
  }

  @Action()
  public fetchTasks(payLoad: any) {
    this.setTasks(this.tasksData.tasks.filter((item: { date: Date; }) => isSameMonth(item.date, payLoad)));
  }

  @Action()
  public fetchTask(payLoad: any) {
    this.setCurrentDayTasks(this.tasks.filter((item: { date: Date; }) => isSameDay(item.date, payLoad)));
  }

  @Action()
  public fetchChangeTask(payLoad: any) {
    setTimeout(() => {
      this.changeTask(payLoad);
    }, 200);
  }

  @Action()
  public fetchAddTask(payLoad: any) {
    this.tasksData.tasks.push(taskFactory(payLoad));

    this.fetchTasks(payLoad.date);
    this.fetchTask(payLoad.date);
    this.setAddTaskState(true);
  }



  @Getter()
  public get getTasks(): [] {
    return this.tasks;
  }

  @Getter()
  public get getCurrentDayTasks(): [] {
    return this.currentDayTasks;
  }

  @Getter()
  public get getAddTaskState(): boolean {
    return this.addTaskState;
  }

}

function taskFactory({ time, text, date }: {time: string, text: string, date: Date}) {
  return {
    id: String(Math.floor(Math.random() * 100)),
    time,
    text,
    complete: false,
    date,
  };
}
