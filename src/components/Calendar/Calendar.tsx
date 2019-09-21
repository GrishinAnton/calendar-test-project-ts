import { Component, Vue, Prop} from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import {
  startOfMonth,
  lastDayOfMonth,
  getDay,
  addDays,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  getMonth,
  setMonth,
  format
} from "date-fns";
  
import "./style.sass";
import "./../../assets/styles/elements/_arrow-button.sass";

const DAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTH_LABELS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

// interface Props {
//   startDate: Date
// }
   
  
@Component
export default class Calendar extends VueComponent<Props> {

  // @Prop()
  // private startDate!: string;


  today: Date = new Date()
  selectedDate = this.today
  currDateCursor = this.today
  dayLabels = DAY_LABELS.slice()

  // created() {
  //   this.dayLabels = DAY_LABELS.slice();
  //   // this.today = new Date() || this.startDate;
  //   this.today = new Date();
  //   this.selectedDate = this.today;
  //   this.currDateCursor = this.today;
  // }

  get currentMonth() {
    return this.currDateCursor.getMonth();
  }

  get currentYear() {
    return this.currDateCursor.getFullYear();
  }
  
  get currentMonthLabel() {
    return MONTH_LABELS[this.currentMonth];
  }

  get dates() {
    const cursorDate = this.currDateCursor;
    let startDate = startOfMonth(cursorDate),
      endDate = lastDayOfMonth(cursorDate);
    const daysNeededForLastMonth = getDay(startDate),
      daysNeededForNextMonth =
        7 - (getDay(endDate) + 1) > 6 ? 0 : 7 - getDay(endDate) - 1;
    startDate = addDays(startDate, -daysNeededForLastMonth);
    endDate = addDays(endDate, daysNeededForNextMonth);

    return eachDayOfInterval({ start: startDate, end: endDate }).map(
      (date, index) => ({
        date,
        isCurrentMonth: isSameMonth(cursorDate, date),
        isToday: isToday(date),
        isSelected: isSameDay(this.selectedDate, date),
        // isActive: this.tasks.some(x => isSameDay(x.date, date)),
        id: index
      })
    );
  }

  // mounted() {
  //   if (this.startDate) {
  //     this.currDateCursor = this.startDate;
  //     this.selectedDate = this.startDate;
  //   }
  // },


  dayClassObj(day) {
    return {
      day: true,
      today: day.isToday,
      current: day.isCurrentMonth,
      selected: day.isSelected,
      active: day.isActive
    };
  }

  nextMonth() {
    this.currDateCursor = addMonths(this.currDateCursor, 1);
    this.$emit("changeMonth", this.currDateCursor);
  }

  previousMonth() {
    this.currDateCursor = addMonths(this.currDateCursor, -1);
    this.$emit("changeMonth", this.currDateCursor);
  }

  setSelectedDate(day) {
    this.selectedDate = day.date;
    this.$emit("changeDay", this.selectedDate);
    if (!day.isCurrentMonth) {
      const selectedMonth = getMonth(this.selectedDate);
      this.currDateCursor = setMonth(this.currDateCursor, selectedMonth);
      this.$emit("changeMonth", selectedMonth);
    }
  }

  formatDateToDay(val) {
    return format(val, "d");
  }


  render() {
    const headersJSX = this.dayLabels.map((item, index) => {
      return <p class="calendar__headings" 
      key={index}
      > { item }</p>
    })

    const calendarJSX = this.dates.map(item => {      
      return <div
            class={this.dayClassObj(item)}
            key={item.id}
          >
            <button onClick={ () => this.setSelectedDate(item) }>
              <span>{ this.formatDateToDay(item.date)  }</span>
            </button>
          </div >
    })
    return (
      <div class="calendar">
        <header class="calendar__header">
          <p class="title title_bold">{ this.currentMonthLabel } { this.currentYear }</p>
          <div class="calendar__header-buttons">
            <button class="button-arrow" onClick={ this.previousMonth }>
              <span>&lt;</span>
            </button>
            <button class="button-arrow" onClick={ this.nextMonth }>
              <span>&gt;</span>
            </button>
          </div>
        </header >
        { headersJSX }
        { calendarJSX }
      </div >
    )
  }
}
