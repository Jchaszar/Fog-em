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
    viewTitle: string;
    selectedDay = new Date();

    calendar={
      mode: 'month',
      currentDate: new Date()
    };

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

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;

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
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present()
  }

  onTimeSelected(ev){
    this.selectedDay = ev.selectedTime;
  }
}
