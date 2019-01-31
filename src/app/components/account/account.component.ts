import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accountInfo: any = {
    fullName: '',
    email: '',
    mobile: ''
  };
  changePassword: any = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  };
  deliveryAddress: any = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  };
  billingAddress: any = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  };
  isError: any = false;
  isError1: any = false;
  isError2: any = false;
  isError3: any = false;
  isInvalid: any = false;
  isInvalid1: any = false;
  isInvalid2: any = false;
  isInvalid3: any = false;
  serverMessage: any = '';

  isTab: any = 1;
  constructor(private httpService: ApiServiceService, private router: Router) {}

  ngOnInit() {
    this.getAccountInfo();
    this.getAddress();
  }

  tabClick(type) {
    this.isTab = type;
  }

  getAccountInfo() {
    let params = {};
    this.httpService.get('api/profile', params).subscribe(
      res => {
        if (res.result) {
          let item = res.result;
          this.accountInfo.fullName = item.fullName;
          this.accountInfo.email = item.email;
          this.accountInfo.mobile = item.mobile;
        }
      },
      error => {
        this.isError = true;
        this.isInvalid = true;
        this.serverMessage = error.msg[0];
      }
    );
  }

  saveAccountInfo() {
    this.isError = false;
    this.isInvalid = false;
    if (
      this.isInValid(this.accountInfo.fullName) ||
      this.isInValid(this.accountInfo.email) ||
      this.isInValid(this.accountInfo.mobile)
    ) {
      this.isError = true;
      return;
    }

    if (!this.validateEmail(this.accountInfo.email)) {
      this.isError = true;
      return;
    }

    let params = {
      fullName: this.accountInfo.fullName,
      email: this.accountInfo.email,
      mobile: this.accountInfo.mobile
    };
    this.httpService.put('api/profile', params).subscribe(
      res => {
        if (res) {
        }
      },
      error => {
        this.isError = true;
        this.isInvalid = true;
        this.serverMessage = error.msg[0];
      }
    );
  }

  chnagePassword() {
    this.isError1 = false;
    this.isInvalid1 = false;
    if (
      this.isInValid(this.changePassword.password) ||
      this.isInValid(this.changePassword.newPassword) ||
      this.isInValid(this.changePassword.confirmPassword)
    ) {
      this.isError1 = true;
      return;
    }

    if (
      this.changePassword.newPassword.length < 6 ||
      this.changePassword.confirmPassword.length < 6
    ) {
      this.isError1 = true;
      return;
    }

    if (
      this.changePassword.newPassword != this.changePassword.confirmPassword
    ) {
      this.isError1 = true;
      return;
    }

    let params = {
      password: this.changePassword.password,
      newPassword: this.changePassword.newPassword,
      confirmPassword: this.changePassword.confirmPassword
    };
    this.httpService.post('api/change-password', params).subscribe(
      res => {
        if (res) {
        }
      },
      error => {
        this.isError1 = true;
        this.isInvalid1 = true;
        this.serverMessage = error.msg[0];
      }
    );
  }

  getAddress() {
    let params = {};
    this.httpService.get('api/address', params).subscribe(
      res => {
        if (res.result) {
          let itemDelivery = res.result.deliveryAddress;
          let itemBilling = res.result.billingAddress;
          if (itemDelivery != null) {
            this.deliveryAddress.name = itemDelivery.name;
            this.deliveryAddress.address1 = itemDelivery.address1;
            this.deliveryAddress.address2 = itemDelivery.address2;
            this.deliveryAddress.state = itemDelivery.state;
            this.deliveryAddress.city = itemDelivery.city;
            this.deliveryAddress.pincode = itemDelivery.pincode;
          }
          if (itemBilling != null) {
            this.billingAddress.name = itemBilling.name;
            this.billingAddress.address1 = itemBilling.address1;
            this.billingAddress.address2 = itemBilling.address2;
            this.billingAddress.state = itemBilling.state;
            this.billingAddress.city = itemBilling.city;
            this.billingAddress.pincode = itemBilling.pincode;
          }
        }
      },
      error => {
        this.isError2 = true;
        this.isInvalid2 = true;
        this.serverMessage = error.msg[0];
      }
    );
  }

  saveDeliveryAddress() {
    this.isError2 = false;
    this.isInvalid2 = false;
    if (
      this.isInValid(this.deliveryAddress.name) ||
      this.isInValid(this.deliveryAddress.address1) ||
      this.isInValid(this.deliveryAddress.address2) ||
      this.isInValid(this.deliveryAddress.city) ||
      this.isInValid(this.deliveryAddress.state) ||
      this.isInValid(this.deliveryAddress.pincode)
    ) {
      this.isError2 = true;
      return;
    }

    let params = {
      name: this.deliveryAddress.name,
      address1: this.deliveryAddress.address1,
      address2: this.deliveryAddress.address2,
      city: this.deliveryAddress.city,
      state: this.deliveryAddress.state,
      pincode: this.deliveryAddress.pincode
    };
    this.httpService.post('api/delivery-address', params).subscribe(
      res => {
        if (res) {
        }
      },
      error => {
        this.isError2 = true;
        this.isInvalid2 = true;
        this.serverMessage = error.msg[0];
      }
    );
  }

  saveBillingAddress() {
    this.isError3 = false;
    this.isInvalid3 = false;
    if (
      this.isInValid(this.billingAddress.name) ||
      this.isInValid(this.billingAddress.address1) ||
      this.isInValid(this.billingAddress.address2) ||
      this.isInValid(this.billingAddress.city) ||
      this.isInValid(this.billingAddress.state) ||
      this.isInValid(this.billingAddress.pincode)
    ) {
      this.isError3 = true;
      return;
    }
    let params = {
      name: this.billingAddress.name,
      address1: this.billingAddress.address1,
      address2: this.billingAddress.address2,
      city: this.billingAddress.city,
      state: this.billingAddress.state,
      pincode: this.billingAddress.pincode
    };
    this.httpService.post('api/billing-address', params).subscribe(
      res => {
        if (res) {
        }
      },
      error => {
        this.isError3 = true;
        this.isInvalid3 = true;
        this.serverMessage = error.msg[0];
      }
    );
  }

  isInValid(outputValue) {
    if (!outputValue || outputValue == '' || outputValue == null) {
      return true;
    }
  }

  validateEmail(sEmail) {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    if (!sEmail.match(reEmail)) {
      return false;
    }
    return true;
  }

  onlyNumberKey(event) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }
}
