Ionic2 Datepicker
======================
#Under Development

This is an ionic-datepicker component, which can be used in any Ionic v2 framework's applications. No additional plugins required, in order to use this component. This is an open source project.


##Prerequisites.

* node, npm
* ionic
* gulp
* type script

##How to use:

1) In your project folder, please install this plugin using npm

`npm install ionic2-datepicker --save`

This will install the latest version of this plugin and also it will save the plugin name in package.json, as we are using `--save`. If you wish to install any specific version then

`npm install ionic2-datepicker#0.1.0 --save`

2) Add IonicDatepicker to your app modules

````ts
import { IonicDatepicker } from 'ionic2-datepicker'
````

3) Add a button to launch the calendar in your view (for example, `launch-calendar.html`)

````html
<button (click)="launchDatepicker($event)">Show Calendar</button>
````

4) Add the function to launch your datepicker from the associated typescript file (for example, `launch-calendar.ts`)

````ts
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { IonicDatepicker } from 'ionic2-datepicker';

@Component({
  templateUrl: 'launch-calendar.html'
)}

export class LaunchCalendar {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController){

  }

  launchDatepicker(ev){
    let dp = this.modalCtrl.create(this.datepicker, {
      callback: function(val) {
        console.log('Return value from the datepicker popup is: ' + val, new Date(val));
      }
    });
    dp.present();
  }

}

````



