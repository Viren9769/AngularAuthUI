import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Validateform from '../../helpers/validateforms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  type: string = 'password';  
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupform!:  FormGroup;
  
    constructor(private fb: FormBuilder) { }
    ngOnInit() {
      this.signupform = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.type = this.isText? 'text' : 'password';  // toggle password visibility
    }

    onSubmit(){
      if(this.signupform.valid){
        //send the obj to database
        console.log(this.signupform.value);
      }
      else{
        // throw the error using toaster  and with required fields
          
          Validateform.validateForm(this.signupform);  // validate form before submitting  // use toaster or other notification library  for error messages  if required  else throw the error  directly in console for now  // show error message in UI  for each field  if not valid  else keep it as it is  // if you want to show error message only if field is touched or dirty then use this  control.markAsTouched({ onlySelf: true });  control   
          alert("your form is invalid");
      }

    }
 
}