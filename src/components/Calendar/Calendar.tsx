import { Component, Prop, Emit} from 'vue-property-decorator';
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
  format,
} from 'date-fns';

import './style.sass';
import './../../assets/styles/elements/_arrow-button.sass';

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTH_LABELS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

interface Props {
  startDate?: Date;
  onChangeMonth?: () => void;
  changeDay?: () => void;
  // [tasks: string]: string
}


@Component
export default class Calendar extends VueComponent<Props> {

  @Prop()
  public readonly startDate!: Date;


  public today: Date = this.startDate || new Date();
  public selectedDate = this.today;
  public currDateCursor = this.today;
  public dayLabels: string[] = DAY_LABELS.slice();

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
    let startDate = startOfMonth(cursorDate);
    let endDate = lastDayOfMonth(cursorDate);
    const daysNeededForLastMonth = getDay(startDate);
    const daysNeededForNextMonth = 7 - (getDay(endDate) + 1) > 6 ? 0 : 7 - getDay(endDate) - 1;


    startDate = addDays(startDate, -daysNeededForLastMonth);
    endDate = addDays(endDate, daysNeededForNextMonth);

    return eachDayOfInterval({ start: startDate, end: endDate }).map(
      (date, index) => ({
        date,
        isCurrentMonth: isSameMonth(cursorDate, date),
        isToday: isToday(date),
        isSelected: isSameDay(this.selectedDate, date),
        // isActive: this.tasks.some(x => isSameDay(x.date, date)),
        id: index,
      }),
    );
  }


  public dayClassObj(
      day: {
        date: Date;
        isCurrentMonth: boolean;
        isToday: boolean;
        isSelected: boolean;
        id?: number;
        isActive: boolean;
      },
    ) {
    return {
      day: true,
      today: day.isToday,
      current: day.isCurrentMonth,
      selected: day.isSelected,
      active: day.isActive,
    };
  }

  // @Emit('changeMonth')
  // nextMonth() {
  //   this.currDateCursor = addMonths(this.currDateCursor, 1);
  // }

  public nextMonth() {
    this.currDateCursor = addMonths(this.currDateCursor, 1);
    this.$emit('changeMonth', this.currDateCursor);
  }

  public previousMonth() {
    this.currDateCursor = addMonths(this.currDateCursor, -1);
    this.$emit('changeMonth', this.currDateCursor);
  }

  public setSelectedDate(
      day: {
        date: Date;
        isCurrentMonth: boolean;
        isToday: boolean;
        isSelected: boolean;
        id?: number;
      },
    ) {
    this.selectedDate = day.date;
    this.$emit('changeDay', this.selectedDate);
    if (!day.isCurrentMonth) {
      const selectedMonth = getMonth(this.selectedDate);
      this.currDateCursor = setMonth(this.currDateCursor, selectedMonth);
      this.$emit('changeMonth', selectedMonth);
    }
  }

  public formatDateToDay(val: number | Date) {
    return format(val, 'd');
  }


  public render() {
    const headersJSX = this.dayLabels.map((item) => {
      return <p class='calendar__headings' key={item}> { item }</p>;
    });

    const calendarJSX = this.dates.map((item) => {
      return <div
            class={this.dayClassObj(item)}
            key={item.id}
          >
            <button onClick={ () => this.setSelectedDate(item) }>
              <span>{ this.formatDateToDay(item.date)  }</span>
            </button>
          </div >;
    });
    return (
      <div class='calendar'>
        <header class='calendar__header'>
          <p class='title title_bold'>{ this.currentMonthLabel } { this.currentYear }</p>
          <div class='calendar__header-buttons'>
            <button class='button-arrow' onClick={ this.previousMonth }>
              <span>&lt;</span>
            </button>
            <button class='button-arrow' onClick={ this.nextMonth }>
              <span>&gt;</span>
            </button>
          </div>
        </header >
        { headersJSX }
        { calendarJSX }
      </div >
    );
  }
}
