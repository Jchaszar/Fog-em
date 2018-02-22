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

    //calendar html variables
    calendar={
      mode: 'month',
      currentDate: new Date(),
      eventLabel: 'No Jobs Today'
    };


  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public authProvider: AuthProvider) {
  }

  //logout function, sets rootpage to Login page and logs out user
  logOut(): void{
	this.authProvider.logoutUser().then(() => {
		this.navCtrl.setRoot("LoginPage");
	});
}

  //function for adding job, creates a jobModal and sends data to eventSource for calendar after completion
  addJob(){
    let modal = this.modalCtrl.create('JobModalPage',{selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if(data){
        let eventData = data;
        var jobsRef = firebase.database().ref("jobs/");
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        //pushs newly made job to firebase database /jobs/
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

        //Timeout is important otherwise wont update calendar correctly
        setTimeout(() => {
          this.eventSource = events;
          console.log(this.eventSource);

        });
      }
    });
  }

  //function to add client to client database /clients/
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

  //changes month title when changing to new month
  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  //function for when event is clicked
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

  //sets initial times to the day the user selected
  onTimeSelected(ev){
    this.selectedDay = ev.selectedTime;
  }

  //on first load, instantiates calendar objects through loadJobs() function
  ionViewDidLoad() {

    this.loadJobs();
    console.log(this.eventSource);   
    
  }

  //method to load pre-existing jobs through the "/jobs/" firebase database
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
