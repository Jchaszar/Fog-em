import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import * as moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    eventSource = [];
    //eventSource: FirebaseListObservable<any[]>;

    viewTitle: string;
    selectedDay = new Date();

    calendar={
      mode: 'month',
      currentDate: new Date()
    };
    string;
    date;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public authProvider: AuthProvider) {
  }

  logOut(): void{
	this.authProvider.logoutUser().then(() => {
		this.navCtrl.setRoot("LoginPage");
	});
}

  addJob(){
    let modal = this.modalCtrl.create('JobModalPage',{selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if(data){
        let eventData = data;
        var jobsRef = firebase.database().ref("jobs/");
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        jobsRef.push({
          title: eventData.title,
          name: eventData.name,
          address: eventData.address,
          startTime: eventData.startTime.toString(),
          endTime: eventData.endTime.toString()
          });

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log(this.eventSource);

        });
      }
    });
  }
  addClient(){
    let modal = this.modalCtrl.create('ClientModalPage');
    modal.present();
    modal.onDidDismiss(client =>  {
      if (client){
        var clientsRef = firebase.database().ref("clients/");

        let clientData = client;
        var clientName = clientData.name;


        clientsRef.push({  
            name: clientData.name,        
            address: clientData.address
        });
      }
    });
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onEventSelected(event){
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.name,
      subTitle: 'Address: ' + event.address + '<br>From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present()
  }

  onTimeSelected(ev){
    this.selectedDay = ev.selectedTime;
  }

  ionViewDidLoad() {

    this.loadJobs();
    console.log(this.eventSource);   
    
  }

  loadJobs(){
    var jobsRef = firebase.database().ref("jobs/");

    jobsRef.once('value', (snapshot) => {
      let events = this.eventSource;
      snapshot.forEach( snap => {
        //changing from String back to date format
        snap.val().startTime = new Date(snap.val().startTime);
        snap.val().endTime = new Date(snap.val().endTime);
        let eventData = {title: snap.val().title, name: snap.val().name, address: snap.val().address,
                          startTime: new Date(snap.val().startTime), endTime: new Date(snap.val().endTime)};
        //console.log(eventData);
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
        return false;
      });
    });
  }


}
