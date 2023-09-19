import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;
  errMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.onFormValueChanges();
  }

  submitForm() {
    this.showErrorMessage = false;
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.signupService.signup(formData).subscribe(
        (response) => {
          if (response.status == 200) {
            this.showSuccessMessage = true;
            this.signUpForm.reset();
          } else {
            this.showErrorMessage = true;
            this.errMsg =
              'Sorry, form submission failed, please try again after some time';
          }
        },
        (error) => {
          this.showErrorMessage = true;
          this.errMsg =
            'Sorry, form submission failed, please try again after some time';
        }
      );
    } else {
      this.showErrorMessage = true;
      this.errMsg = 'Error submitting the form.';
    }
  }

  onFormValueChanges() {
    this.signUpForm.valueChanges.subscribe(() => {
      if (this.signUpForm.valid) {
        this.showErrorMessage = false;
        this.errMsg = '';
      }
    });
  }
}
