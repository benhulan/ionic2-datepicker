import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'datepicker.html',
  selector: 'datepicker'
})
export class Datepicker {
  weekdays;
  months;
  years;
  daysList;
  rows;
  cols;
  firstDay;
  selectedDate;
  tempDate;
  selectedMonth;
  selectedYear;
  today;
  config;
  prevDisabled;
  nextDisabled;

  constructor(public viewCtrl: ViewController, public params: NavParams) {
    this.selectedDate = new Date();
    this.tempDate = new Date();
    let weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.years = this.getYearsList();
    this.rows = [0, 7, 14, 21, 28, 35];
    this.cols = [0, 1, 2, 3, 4, 5, 6];

    this.config = this.params.data.datepickerConfig || {};
    this.config.inputDate = this.config.inputDate ? this.resetHMSM(new Date(this.config.inputDate)) : this.resetHMSM(new Date());
    this.config.fromDate = this.config.fromDate ? this.resetHMSM(new Date(this.config.fromDate)) : new Date();
    this.config.toDate = this.config.toDate ? this.resetHMSM(new Date(this.config.toDate)) : new Date(this.years[this.years.length-1], 12, 31, 11, 59, 59, 9999);
    this.config.disabledDates = this.config.disabledDates ? this.prepareDisabledDates(this.config.disabledDates) : [];
    this.config.setLabel = this.config.setLabel ? this.config.setLabel : 'Set';
    this.config.todayLabel = this.config.todayLabel ? this.config.todayLabel : 'Today';
    this.config.closeLabel = this.config.closeLabel ? this.config.closeLabel : 'Close';
    this.config.mondayFirst = this.config.mondayFirst ? this.config.mondayFirst : false;
    this.config.daysList = this.config.daysList ? this.config.daysList : weekdays;
    this.config.monthsList = this.config.monthsList ? this.config.monthsList : months;
    this.config.dateFormat = this.config.dateFormat ? this.config.dateFormat : 'dd MMMM yyyy';
    this.config.showTodayButton = this.config.showTodayButton ? this.config.showTodayButton : true;
    this.config.closeOnSelect = this.config.closeOnSelect ? this.config.closeOnSelect : false;
    this.today = this.resetHMSM(new Date());
    let currentDate = this.resetHMSM(new Date(this.config.inputDate));
    this.selectedMonth = this.config.monthsList[currentDate.getMonth()];
    this.selectedYear = currentDate.getFullYear();
    this.loadDaysList(currentDate);
  }

  prepareDisabledDates(disbaledDates) {
    disbaledDates.forEach((disbaledDate, i) => {
      disbaledDates[i] = this.resetHMSM(new Date(disbaledDate)).getTime();
    });
    return disbaledDates;
  }

  resetHMSM(currentDate) {
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    return currentDate;
  }

  getYearsList() {
    let yearsList = [];
    for (let year = 2017; year <= 2021; year++) {
      yearsList.push(year);
    }
    return yearsList;
  }

  loadDaysList(ipDate) {
    this.daysList = [];
    let firstDay = new Date(ipDate.getFullYear(), ipDate.getMonth() + 1, 1).getDate();
    let lastDay = new Date(ipDate.getFullYear(), ipDate.getMonth() + 1, 0).getDate();

    for (let i = firstDay; i <= lastDay; ++i) {
      let tempDate = new Date(ipDate.getFullYear(), ipDate.getMonth(), i);
      if (i === firstDay) this.prevDisabled = tempDate.getTime() < this.config.fromDate.getTime();
      if (i === lastDay) this.nextDisabled = tempDate.getTime() > this.config.toDate.getTime();
      
      let isEnabled = ((this.config.fromDate && this.config.toDate) ? (this.config.fromDate.getTime() <= tempDate.getTime() && this.config.toDate.getTime() >= tempDate.getTime()) : ((this.config.fromDate && !this.config.toDate) ? (this.config.fromDate.getTime() <= tempDate.getTime()) : this.config.toDate.getTime() >= tempDate.getTime())) && (this.config.disabledDates.indexOf(tempDate.getTime()) < 0);

      this.daysList.push({
        date: tempDate.getDate(),
        month: tempDate.getMonth(),
        year: tempDate.getFullYear(),
        day: tempDate.getDay(),
        epoch: tempDate.getTime(),
        enabled: isEnabled
      });
    }

    firstDay = this.daysList[0].day;
    for (let j = 0; j < firstDay; j++) {
      this.daysList.unshift({});
    }
  }

  monthSelected(event, selectedMonth) {
    this.selectedMonth = selectedMonth;
    this.tempDate.setMonth(this.config.monthsList.indexOf(this.selectedMonth));
    this.tempDate.setYear(this.selectedYear);
    this.loadDaysList(new Date(this.tempDate));
  }

  yearSelected(event, selectedYear) {
    this.selectedYear = selectedYear;
    this.tempDate.setMonth(this.config.monthsList.indexOf(this.selectedMonth));
    this.tempDate.setYear(this.selectedYear);
    this.loadDaysList(new Date(this.tempDate));
  }

  dateClicked(dateObj) {
    this.selectedDate = new Date(dateObj.epoch);
  }

  prevMonth(dateObj) {
    let date = new Date(dateObj.epoch);
    date.setDate(date.getDate() - dateObj.date);
    this.selectedMonth = this.config.monthsList[date.getMonth()];
    this.selectedYear = date.getFullYear();
    this.loadDaysList(new Date(date));
  }

  nextMonth(dateObj) {
    let date = new Date(dateObj.epoch);
    date.setDate(date.getDate() + 1);
    this.selectedMonth = this.config.monthsList[date.getMonth()];
    this.selectedYear = date.getFullYear();
    this.loadDaysList(new Date(date));
  }

  setDate() {
    // console.log(this.selectedDate);
    this.dismiss();
  }

  setToday() {
    this.loadDaysList(this.today);
    this.selectedMonth = this.config.monthsList[this.today.getMonth()];
    this.selectedYear = this.today.getFullYear();
    this.selectedDate = this.resetHMSM(new Date());
  }

  dismiss() {
    this.viewCtrl.dismiss(this.selectedDate);
  }

  ionViewWillLoad() {
    console.log('loading datepicker');
  }

  // ionViewDidLoad() {
  // }

  // ionViewDidUnload() {
  // }

}
