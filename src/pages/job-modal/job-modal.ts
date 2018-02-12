import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-job-modal',
  templateUrl: 'job-modal.html',
  
})
export class JobModalPage {
	event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	let preselectedDate = moment(this.navParams.get('selectedDay')).format();
  	this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobModalPage');
  }

  cancel(){
  	this.viewCtrl.dismiss();
  }

  save(){
  	this.viewCtrl.dismiss(this.event);
  }

}
