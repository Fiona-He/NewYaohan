import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HomeService } from "./home.service";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers: [HomeService]
})
export class History {

  QRScaning = false;
  scanContent = '';
  scanReference = '';
  scanSub :any;
  showData:any
  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              private homeService: HomeService,
              private alertCtrl: AlertController,
              public  modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public params: NavParams,) {
    this.showData = this.params.get('data');
    console.log('showData: ',this.showData);
    console.log('showData[0]',this.showData[0].date);

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
      //this.showData = ....
      this.dismiss();
    });
  }

}
