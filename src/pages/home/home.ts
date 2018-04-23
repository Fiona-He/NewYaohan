import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HomeService } from "./home.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {

  QRScaning = false;
  constructor(public navCtrl: NavController,private qrScanner: QRScanner,private homeService: HomeService) {

  }

  scanner(): void{
    console.info("scanner start!");

    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted


        // show camera preview
        this.QRScaning = true;
        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          //console.log('Scanned something', text);
          alert('succeed:'+text);
          this.homeService.useCoupon(text).then(data=>{
            if(data == 1){
              alert("使用成功，开始打印...");
              this.qrScanner.hide(); // hide camera preview
              this.QRScaning = false;
              scanSub.unsubscribe(); // stop scanning
            }
            else{
              alert("失败，请重新尝试！");
            }
          });
          // this.homeService.useCoupon2(text);
          // alert("使用成功，开始打印...");
          // this.qrScanner.hide(); // hide camera preview
          // this.QRScaning = false;
          // scanSub.unsubscribe(); // stop scanning
        });

        this.qrScanner.show();

        //this.QRScaning = true;
        // wait for user to scan something, then the observable callback will be called

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
      .catch((e: any) => console.log('Error is', e));
  }




  EndScan():void {
    this.qrScanner.hide();
    this.qrScanner.destroy();
    this.QRScaning = false;
  }

}
