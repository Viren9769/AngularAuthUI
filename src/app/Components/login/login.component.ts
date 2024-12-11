import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Validateform from '../../helpers/validateforms';
import { AuthserviceService } from '../../services/authservice.service';
import { ToastrService } from 'ngx-toastr';



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

  constructor(private fb: FormBuilder,
     private auth: AuthserviceService,
      private route: Router,
    private toast: ToastrService) { }
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
  OnLogin() {
    if(this.loginForm.valid){
     
      console.log(this.loginForm.value);
       //send the obj to database
       this.auth.login(this.loginForm.value).subscribe({
        next:(res)=> {
          this.loginForm.reset();
          // alert(res.message);
          this.toast.success("Success");  // use ng-toast for success messages  // you can also use alert for success messages  // navigate to dashboard page after successful login  // use Angular router
          this.auth.storeToken(res.token);  // store token in local storage  // navigate to dashboard page after successful login  // use Angular router
          this.route.navigate(['/dashboard']);
       },
        error:(err)=> {
         
          this.toast.error("Error"); // use ng-toast for error messages
        }
    });
    }
    else{
      // throw the error using toaster  and with required fields
        
        Validateform.validateForm(this.loginForm);  // validate form before submitting  // use toaster or other notification library  for error messages  if required  else throw the error  directly in console for now  // show error message in UI  for each field  if not valid  else keep it as it is  // if you want to show error message only if field is touched or dirty then use this  control.markAsTouched({ onlySelf: true });  control   
        alert("your form is invalid");
    }
    }

    // create a privatemethod for validate form 




}


