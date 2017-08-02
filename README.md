Ionic2 Datepicker
======================
# Under Development

This is an ionic-datepicker component, which can be used in any Ionic v2 framework's applications. No additional plugins required, in order to use this component. This is an open source project.


## Prerequisites.

* node, npm
* ionic
* gulp
* type script

## How to use:

1) In your project folder, please install this plugin using npm

`npm install ionic2-datepicker --save`

This will install the latest version of this plugin and also it will save the plugin name in package.json, as we are using `--save`. If you wish to install any specific version then

`npm install ionic2-datepicker#0.1.0 --save`

2) Import IonicDatepicker and include in your module declarations and entryComponents:

````ts
import { IonicDatepicker } from 'ionic2-datepicker';

...

@NgModule({

declarations: [
    IonicDatepicker,
    LaunchCalendarPage
  ],
  
  ...
  
  entryComponents: [
    IonicDatepicker,
    LaunchCalendarPage
  ],

  ...

````
### OPTION A: Launch Datepicker in Modal window

3A) Add a button to launch the calendar in your view (for example, `launch-calendar.html`)

````html
<button (click)="launchDatepicker($event)">Show Calendar</button>
````

Or, like this:

````html
      <ion-item no-lines>
        <ion-label stacked>Date</ion-label>
        <ion-input (click)="launchDatepicker($event)" value="{{ this.selectedDate | date: config.dateFormat }}"></ion-input>
      </ion-item>
````

### OPTION B: Embed calendar in page WITHOUT modal window:

3B) Add the datepicker in your view (for example, `launch-calendar.html`)

````html
    <datepicker isModal="false" (click)="onDatepickerChange(selectedDatePicker.selectedDate)"></datepicker>
````

### OPTION A continued

4A) Add the function to launch your datepicker from the associated typescript file (for example, `launch-calendar.ts`)

````ts
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { IonicDatepicker } from 'ionic2-datepicker';

@Component({
  templateUrl: 'launch-calendar.html'
)}

export class LaunchCalendar {

  datepicker = IonicDatepicker;
  selectedDate: Date = new Date();
  config: any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController){
    this.selectedDate = new Date();
    this.config.dateFormat = 'MMM dd, yyyy';
  }

  launchDatepicker(ev){
    let val = ev.target.value;
    let dp = this.modalCtrl.create(this.datepicker);
    dp.onDidDismiss((data) => {
      // console.log(data);
      this.selectedDate = data;
    })
    dp.present();
  }

}

````

(We're actually not using navParams in this example, but you may want it to pass the date config, or something else.)

### Option B:

4B) Same as above, except define the `onDatepickerChange()` function instead of `launchDatepicker()`

````ts
  onDatepickerChange(selectedDate: Date) {
    //this.selectedDate = new Date(selectedDate);

  }
````

5) Adjust styles and settings as needed.

