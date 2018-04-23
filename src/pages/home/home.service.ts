import { Component,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  template: ''
})
@Injectable()

export class HomeService{

  constructor(private http: HttpClient) { }

  useCoupon(data:any) :Promise<Object> {

    let myurl = 'http://202.175.74.44:11080/CardService/updatestat.jsp?data='+data ;
    return this.http.post(myurl, '').toPromise();
      // .subscribe(data=>{
      //console.log(data);
    //   return 1;
    // });
  }
  useCoupon2(data:any) :any {

    let myurl = 'http://202.175.74.44:11080/CardService/updatestat.jsp?data='+data ;
    this.http.post(myurl, '')
    .subscribe(data=>{
    console.log(data);
    });
  }
}
