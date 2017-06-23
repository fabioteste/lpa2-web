import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  providers: [Ui, DataService]
})

export class SignUpPageComponent implements OnInit {

  public form: FormGroup;
  public errors: any[] = [];

  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['fabio', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],

      lastName: ['rezende', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],

      email: ['fabio.rezende@gmail.com', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],

      document: ['12345678901', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required
      ])],

      username: ['fabiorezende', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],

      password: ['senha', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.required
      ])],

      confirmPassword: ['senha', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  submit() {
    // console.log(this.form.value);
    this.dataService.createUser(this.form.value).subscribe(result => {
      alert('Bem vindo a loja pequenos arteiros');
      this.router.navigateByUrl('/');
    }, error => {
      this.errors = JSON.parse(error._body).errors;
    });
  }

}
