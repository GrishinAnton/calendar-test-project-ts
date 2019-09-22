import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import ItemTask from './ItemTask/ItemTask';
import AddTask from './AddTask/AddTask';
import { isSameDay } from 'date-fns';
import { useModule } from 'vuex-simple';
import { TasksModule } from '../../store/modules/tasks';

import './style.sass';

interface Props {
  currentDate: Date;
  currentDayTasks?: [];
}

interface Task { id: string; time: string; text: string; complete: boolean; date: Date; }

@Component
export default class Tasks extends VueComponent<Props> {

  public tasksStore: TasksModule | any = useModule(this.$store, ['tasks']);

  @Prop()
  public readonly currentDayTasks!: [];

  @Prop()
  public readonly currentDate!: Date;

  get getCurrentDateTasks() {
    return this.currentDayTasks.filter((task: {date: Date}) => isSameDay(task.date, this.currentDate));
  }
  get getAddTaskState() {
    return this.tasksStore.getAddTaskState;
  }

  public btnHandler({ event, time, text }: {event: string, time: string, text: string}) {
    switch (event) {
      case 'addTask':
        this.tasksStore.setAddTaskState(false);
        return;
      case 'cancelTask':
        this.tasksStore.setAddTaskState(true);
        return;
      case 'saveTask':
        this.tasksStore.fetchAddTask({
          time,
          text,
          date: this.currentDate,
        });
        return;
    }
  }

  public change(task: object) {
    this.tasksStore.fetchChangeTask(task);
  }

  public render() {

    const itemTaskJSX = this.getCurrentDateTasks.map((item: Task) => {
      return (
        <ItemTask
          task={item}
          key={item.id}
          onChange={this.change}
        ></ItemTask >
      );
    });
    return (
      <div class='tasks-container'>
        <p class='title title_bold tasks-container_title'>События</p>
        <ul class='task-items' data-cy='task-items'>
        { itemTaskJSX }
    </ul>
        <AddTask taskState={this.getAddTaskState} onBtnHandler={this.btnHandler} ></AddTask >
  </div >
    );
  }
}
