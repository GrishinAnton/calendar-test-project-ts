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

@Component
export default class Tasks extends VueComponent<Props> {

  public tasksStore: TasksModule = useModule(this.$store, ['tasks']);

  @Prop()
  public readonly currentDayTasks!: [];

  @Prop()
  public readonly currentDate!: Date;

  get getCurrentDateTasks() {
    return this.currentDayTasks.filter((task) => isSameDay(task.date, this.currentDate));
  }
  get getAddTaskState() {
    return this.tasksStore.getAddTaskState;
  }

  public btnHandler({ event, time, text }) {
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

  public change(task) {
    this.tasksStore.fetchChangeTask(task);
  }

  public render() {

    const itemTaskJSX = this.getCurrentDateTasks.map((item) => {
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
