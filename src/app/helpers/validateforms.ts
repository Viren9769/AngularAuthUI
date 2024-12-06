import { FormControl, FormGroup } from "@angular/forms";

export default class Validateform { 
   static validateForm(form: FormGroup){
        Object.keys(form.controls).forEach(field => {
          const control = form.get(field);
          if (control instanceof FormControl) {
            control.markAsDirty({ onlySelf: true });
          } else if (control instanceof FormGroup) {
            this.validateForm(control);
          }
        });
    }
}
