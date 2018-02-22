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
  //event variable used to create Array items for eventSource
	event = { title: "",name: "", address: "", startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
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

    //pushs clientlist info for searchbar integration
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

  //method for submitting client info for job db
  submitClient(client){
    this.event.name = client.name;
    this.event.address = client.address;
    this.event.title = client.name;
    console.log("Submit Client:");
    //console.log(this.event.name);
    console.log(this.event.address);
    console.log(this.event.title);
  }

  //sets list to the current loadedlist
  initializeItems(): void{
    this.clientList = this.loadedClientList;
  }

  //method run to filter search when user changes searchbar criteria
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
  //cancel method for modal
  cancel(){
  	this.viewCtrl.dismiss();
  }

  //saves event info and exits modal
  save(){
    console.log(this.event.startTime);
    console.log(this.event.endTime);
  	this.viewCtrl.dismiss(this.event);
  }

}
