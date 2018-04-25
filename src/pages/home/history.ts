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
    let content = {
          data:[
            {date:'20180101',time:'17:05:15',total:'200',reference:'180423154801286'},
            {date:'20180102',time:'17:05:15',total:'200',reference:'292929292929292'},
            {date:'20180103',time:'17:05:15',total:'200',reference:'292929292929292'},
            {date:'20180104',time:'17:05:15',total:'200',reference:'292929292929292'}
          ]
      };
    this.showData = content.data;
    // this.homeService.showHistory(this.mobile).then(
    //   data => {
    //     alert(data);
    //     console.log(data);
    //     let data1 = JSON.stringify(data);
    //     let content = JSON.parse(data1.toString());
    //     this.showData = content.data;
    //     console.log("this.showData:",content,this.showData);
    //   });

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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
