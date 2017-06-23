import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  providers: [Ui, DataService]
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public errors: any[] = [];

  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router ) { 
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

     var token = localStorage.getItem('lpa.token');
     if(token) {
       this.router.navigateByUrl('/home');
     }
     var username = localStorage.getItem('lpa.username');
  }

  ngOnInit() { }

  showModal() {
    this.ui.setActive('modalTermos');
  }

  hideModal() {
    this.ui.setInactive('modalTermos');
  }

  submit() {
    this.dataService
      .authenticate(this.form.value)
      .subscribe(result=>{
        localStorage.setItem('lpa.token', result.token);
        localStorage.setItem('lpa.user', JSON.stringify(result.user));
        this.router.navigateByUrl('/home');
      }, error=>{
        this.errors = JSON.parse(error._body).errors;
      });
  }

}