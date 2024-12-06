import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Validateform from '../../helpers/validateforms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

type: string = 'password';  
isText: boolean = false;
eyeIcon: string = "fa-eye-slash";
loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
hideShowPass() {
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.type = this.isText? 'text' : 'password';  // toggle password visibility
  }
  OnSubmit() {
    if(this.loginForm.valid){
      //send the obj to database
      console.log(this.loginForm.value);
    }
    else{
      // throw the error using toaster  and with required fields
        
        Validateform.validateForm(this.loginForm);  // validate form before submitting  // use toaster or other notification library  for error messages  if required  else throw the error  directly in console for now  // show error message in UI  for each field  if not valid  else keep it as it is  // if you want to show error message only if field is touched or dirty then use this  control.markAsTouched({ onlySelf: true });  control   
        alert("your form is invalid");
    }
    }

    // create a privatemethod for validate form 




}


