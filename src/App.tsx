import { Component, Vue } from 'vue-property-decorator';
import Calendar from './components/Calendar/Calendar';
// import Tasks from "./components/Tasks/Tasks";
import { useStore, useModule } from 'vuex-simple'
import { MyStore } from './store/store'
import { TasksModule } from './store/modules/tasks';

@Component
export default class App extends Vue {

  public currentDate = new Date();
  public tasks: TasksModule = useModule(this.$store, ['tasks']);

  mounted() {    

    console.log(this.tasks, 'typedStore');
  }

  get getTasks() {
    return this.tasks.getTasks;
  }

  get getCurrentDayTasks() {
    return this.tasks.getCurrentDayTasks
  }

  public changeMonth(date: Date) {
    this.tasks.fetchTasks(date);
  }

  public changeDay(date: Date) {
    this.currentDate = date;
    this.tasks.fetchTask(date);
  }

  public async created() {
    await this.tasks.fetchTasks(this.currentDate);
    this.tasks.fetchTask(this.currentDate);
  }


  public render() {
    return (
      <div id='app'>
        <div class='container container_tasks'>
          <Calendar
            startDate={ new Date() }
            onChangeMonth={ this.changeMonth }
            changeDay={ this.changeDay }
            tasks={ this.getTasks }
          ></Calendar>
          {/* <Tasks  tasks="getCurrentDayTasks" currentDate="currentDate" /> */}
        </div>
      </div>
    );
  }
}
