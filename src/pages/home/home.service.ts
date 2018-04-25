import { Component,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  template: ''
})
@Injectable()

export class HomeService{

  constructor(private http: HttpClient) { }

  useCoupon(data: any, reference: any) :Promise<Object>{
    let myurl = 'http://202.175.74.44:11080/CardService/servlet/serviceservlet?'
                +'action=newyaohan.flowc&flowActionName=points&data='+data+'&reference='+reference ;
    return this.http.post(myurl, '').toPromise();
  }

  checkCouponTotal(data:any, reference: any) :Promise<Object> {
    let myurl = 'http://202.175.74.44:11080/CardService/servlet/serviceservlet?'
               +'action=newyaohanconfirm.flowc&flowActionName=confirm&data='+data+'&reference='+reference  ;
    return this.http.post(myurl, '').toPromise();
  }

  showHistory(mobile: any) :Promise<Object> {
    let myurl = 'http://202.175.74.44:11080/CardService/servlet/serviceservlet?'
      +'action=newyaohanfind.flowc&flowActionName=find&mobile='+mobile  ;
    return this.http.post(myurl, '').toPromise();
  }

  refundCoupon(data: any, reference: any) :Promise<Object> {
    let myurl = 'http://202.175.74.44:11080/CardService/servlet/serviceservlet?'
      +'action=newyaohanrefund.flowc&flowActionName=refund&data='+data+'&reference='+reference  ;
    return this.http.post(myurl, '').toPromise();
  }


}
