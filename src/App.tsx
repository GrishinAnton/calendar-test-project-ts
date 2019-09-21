import { Component, Vue } from 'vue-property-decorator';
import Calendar from './components/Calendar/Calendar';
// import Tasks from "./components/Tasks/Tasks";


@Component
export default class App extends Vue {

  public currentDate = new Date();

  get getTasks() {
    return this.$store.getters['tasks/getTasks'];
  }

  get getCurrentDayTasks() {
    return this.$store.getters['tasks/getCurrentDayTasks'];
  }

  public changeMonth(date: Date) {
    this.$store.dispatch('tasks/getTasks', date);
  }

  public changeDay(date: Date) {
    this.currentDate = date;
    this.$store.dispatch('tasks/getTask', date);
  }

  public async created() {
    await this.$store.dispatch('tasks/getTasks', this.currentDate);
    this.$store.dispatch('tasks/getTask', this.currentDate);
  }


  public render() {
    return (
      <div id='app'>
        <div class='container container_tasks'>
          <Calendar
            startDate={ new Date() }
            onChangeMonth={ this.changeMonth }
            changeDay={ this.changeDay }
            // tasks={ this.getTasks }
          ></Calendar>
          {/* <Tasks  tasks="getCurrentDayTasks" currentDate="currentDate" /> */}
        </div>
      </div>
    );
  }
}
