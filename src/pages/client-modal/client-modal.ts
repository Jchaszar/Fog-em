import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-client-modal',
  templateUrl: 'client-modal.html',
})
export class ClientModalPage {
	client = {name: "", address: ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientModalPage');
  }
 cancel(){
  	this.viewCtrl.dismiss();
  }

  save(){
  	this.viewCtrl.dismiss(this.client);
  }

}
