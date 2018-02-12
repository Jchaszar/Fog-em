import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobModalPage } from './job-modal';

@NgModule({
  declarations: [
    JobModalPage,
  ],
  imports: [
    IonicPageModule.forChild(JobModalPage),
  ],
})
export class JobModalPageModule {}
