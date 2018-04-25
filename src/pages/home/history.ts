import {Component, OnInit} from '@angular/core';
import { NavController, ModalController, ViewController, NavParams} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HomeService } from "./home.service";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers: [HomeService]
})
export class History implements OnInit{

  showData:any;
  mobile :any;
  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              private homeService: HomeService,
              private alertCtrl: AlertController,
              public  modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public params: NavParams,) {
    this.mobile = this.params.get('content');
  }

  ngOnInit() {
    this.homeService.showHistory(this.mobile).then(
      data => {
        console.log(data);
        let data1 = JSON.stringify(data);
        let content = JSON.parse(data1.toString());
        this.showData = content;
        console.log("this.showData:",this.showData);
      });

  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  doRefund(item : any) {
    console.log('doRefund clicked!');
    console.log(item);
    this.homeService.refundCoupon('',item.reference).then( data => {
      console.log('data is :', data);
      alert('退回優惠券成功');
      this.dismiss();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   refresher.complete();
    // }, 2000);

    this.homeService.showHistory(this.mobile).then(
      data => {
        console.log(data);
        let data1 = JSON.stringify(data);
        let content = JSON.parse(data1.toString());
        this.showData = content;
        console.log("this.showData:",this.showData);
        refresher.complete();
      });
  }

}
