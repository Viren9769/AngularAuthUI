import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Validateform from '../../helpers/validateforms';
import { AuthserviceService } from '../../services/authservice.service';
import { ToastrService } from 'ngx-toastr';

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
  
    constructor(private fb: FormBuilder,
       private auth: AuthserviceService,
       private route: Router,
       private toast: ToastrService) { }
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

    onSignup(){
      if(this.signupform.valid){
        //send the obj to database
        console.log(this.signupform.value);
        
        this.auth.signup(this.signupform.value).subscribe({
          next:(res) => {
            //alert(res.message);
            this.signupform.reset(); 
            this.toast.success('User registered successfully!', 'Success');  // use toaster or other notification library  for success messages  if required  else throw the error  directly in console for now  // navigate to login page or dashboard  if you want to keep it open for next signup then use this  this.route.navigate(['dashboard']); // keep it open for next signup  else use this  this.signupform.reset(); // reset the form after successful submission  //
            this.route.navigate(['login']);// reset the form after successful submission  // if you want to keep it open for next signup then use this  this.signupform.patchValue({ firstname: '', lastname: '', email: '', username: '', password: '' }); // keep it open for next signup  else use this  this.signupform.reset(); // reset the form after successful submission  // if you want to keep it open for next signup then use this  this.
          },
          error:(err) => {
            this.toast.error('Error occurred while registering user!', 'Error');  // use toaster or other notification library  for error messages  if required  else throw the error  directly in console for
          }
        });
      }
      else{
        // throw the error using toaster  and with required fields
          
          Validateform.validateForm(this.signupform);  // validate form before submitting  // use toaster or other notification library  for error messages  if required  else throw the error  directly in console for now  // show error message in UI  for each field  if not valid  else keep it as it is  // if you want to show error message only if field is touched or dirty then use this  control.markAsTouched({ onlySelf: true });  control   
          alert("your form is invalid");
      }

    }
 
}