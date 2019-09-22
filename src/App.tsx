import { Component, Vue } from 'vue-property-decorator';
import Calendar from './components/Calendar/Calendar';
import Tasks from './components/Tasks/Tasks';
import { useModule } from 'vuex-simple';
import { TasksModule } from './store/modules/tasks';

@Component
export default class App extends Vue {

  public currentDate = new Date();
  public tasksStore: TasksModule = useModule(this.$store, ['tasks']);

  get getTasks() {
    return this.tasksStore.getTasks;
  }

  get getCurrentDayTasks() {
    return this.tasksStore.getCurrentDayTasks;
  }

  public changeMonth(date: Date) {
    this.tasksStore.fetchTasks(date);
  }

  public changeDay(date: Date) {
    this.currentDate = date;
    this.tasksStore.fetchTask(date);
  }

  public created() {
    this.tasksStore.fetchTasks(this.currentDate);
    this.tasksStore.fetchTask(this.currentDate);
  }


  public render() {
    return (
      <div id='app'>
        <div class='container container_tasks'>
          <Calendar
            startDate={ new Date() }
            onChangeMonth={ this.changeMonth }
            onChangeDay={ this.changeDay }
            tasks={ this.getTasks }
          ></Calendar>
          <Tasks
            currentDate={ this.currentDate }
            currentDayTasks={ this.getCurrentDayTasks } />
        </div>
      </div>
    );
  }
}
