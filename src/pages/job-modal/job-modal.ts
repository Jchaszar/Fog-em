import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-job-modal',
  templateUrl: 'job-modal.html',
  
})
export class JobModalPage {
	event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();
  modalClientName;
  modalClientAddress;

  public clientList:Array<any>;
  public loadedClientList:Array<any>;
  public clientRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	let preselectedDate = moment(this.navParams.get('selectedDay')).format();
  	this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.clientRef = firebase.database().ref('/clients');
  
    this.clientRef.on('value', clientList => {
      let clients = [];
      clientList.forEach( client => {
        clients.push(client.val());
        return false;
      });

      this.clientList = clients;
      this.loadedClientList = clients;
    });

  }
  submitClient(client){
    this.modalClientName = client.name;
    this.modalClientAddress = client.address;
    console.log("Submit Client:");
    console.log(this.modalClientName);
    console.log(this.modalClientAddress);
  }

  initializeItems(): void{
    this.clientList = this.loadedClientList;
  }

  getItems(searchbar){
    this.initializeItems();

    var q = searchbar.srcElement.value;

    if(!q){
      return;
    }

    this.clientList = this.clientList.filter((v) => {
      if(v.name && q){
        if(v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.clientList.length);
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
