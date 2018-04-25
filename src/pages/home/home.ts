import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HomeService } from "./home.service";
import { AlertController } from 'ionic-angular';
import { History} from "./history";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {

  QRScaning = false;
  scanContent = '';
  scanReference = '';
  scanMobile = '';
  scanSub :any;
  scanType = '';
  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              private homeService: HomeService,
              private alertCtrl: AlertController,
              public  modalCtrl: ModalController) {

  }

  reScan() {
    let alert = this.alertCtrl.create({
      title: '重新扫描',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.EndScan;
            this.scanner();
            console.log('reScan clicked');
          }
        }
      ]
    });
    alert.present();
  }


  print() {
    let alert = this.alertCtrl.create({
      title: '打印中...',
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('print clicked');
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirm(text: any) {
    let couponCode = text;
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: '本次扣减优惠券共：'+couponCode+' 元',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.qrScanner.hide();
            this.QRScaning = false;
            this.scanSub.unsubscribe();
            this.EndScan();
            this.scanner();
          }
        },
        {
          text: '确认',
          handler: () => {
            this.homeService.useCoupon(this.scanContent,this.scanReference).then( data => {
              let data1 = JSON.stringify(data);
              let data2 = JSON.parse(data1.toString());
              if(data2.retcode == '1'){
                this.print();
                this.qrScanner.hide();
                this.QRScaning = false;
                this.scanSub.unsubscribe();
                this.EndScan();
              }
              else {
                console.log('失败');
                this.reScan();
              }
            });
            console.log('Buy clicked');

          }
        }
      ]
    });
    alert.present();
  }

  scanner(): void{
    console.info("scanner start!");
    this.scanType = '掃描COUPON...';
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.QRScaning = true;
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          let data = JSON.parse(text.toString());
          this.scanContent = data.data.toString();
          this.scanReference = data.reference.toString();
          this.homeService.checkCouponTotal(this.scanContent,this.scanReference).then(
            data => {
              let data1 = JSON.stringify(data);
              let data2 = JSON.parse(data1.toString());
              let total = data2.total;
              this.presentConfirm(total);
            });

        });

        this.qrScanner.show();

      } else if (status.denied) {
      } else {
      }
    })
      .catch((e: any) => console.log('Error is', e));
  }

  EndScan():void {
    this.qrScanner.hide();
    this.qrScanner.destroy();
    this.QRScaning = false;
  }

  refund(){
    console.info("refund scanner start!");
    this.scanType = '退COUPON...';
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.QRScaning = true;
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.scanMobile = text.toString();
          //alert(this.scanMobile);
          let modal = this.modalCtrl.create(History,{content:this.scanMobile});
          modal.onDidDismiss(() => {
            //this.reScanRefund();
            this.qrScanner.hide();
            this.QRScaning = false;
            this.scanSub.unsubscribe();
            this.EndScan();
          });
          modal.present();
        });

        this.qrScanner.show();

      } else if (status.denied) {
      } else {
      }
    })
      .catch((e: any) => console.log('Error is', e));
  }



}
