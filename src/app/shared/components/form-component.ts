import "rxjs/add/operator/catch";
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";
import {Directive} from "@angular/core";
import {BaseComponent} from "./base-component";
import {ContactService} from "../../api/rest/contact.service";
import {Contact} from "../models/contact.model";

@Directive({
  selector: '[formControlName][phone]',
  host: {
    '(ngcontactChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})

export abstract class FormComponent extends BaseComponent {

  protected modeEdit = false;
  protected entityForm: FormGroup;
  protected form: any = this;
  protected id: number;
  protected contact: Contact;
  protected submitted = false;
  protected submitting = false;


  constructor(public restService: ContactService) {
    super();
  }

  //----------- FORM ---------------------

  public isOnEditMode() {
    return this.modeEdit;
  }

  protected saveSucceed() {
    this.submitting = false;
    this.showInfo("Enregistrement effectué avec succès");
    this.goToList();
  }


  protected updateSucceed() {
    this.submitting = false;
    this.showInfo("Modification effectué avec succès");
    this.goToList();
  }

  public goToList() {
    this.router.navigate(['contact/list']);
  }


  protected deleteSucceed() {
    this.showInfo("Suppression effectuée avec succès");
    this.goToList()
  }

  abstract createForm(contact?: Contact);

  protected getControlFromFormArray(formArray: FormArray, index: any, key: string): FormControl {
    if (formArray && formArray.controls[index]) {
      let formGroup = formArray.controls[index] as FormGroup;
      if (formGroup.controls) {
        let control = formGroup.controls[key];
        if (control) {
          return control as FormControl;
        }
      }
    }
    return null;
  }

  public submit($ev, contact: Contact, callback?: (param: any) => void) {
    $ev.preventDefault();
    if (!this.submitting) {
      this.submitting = true;
      for (let c in this.entityForm.controls) {
        this.entityForm.controls[c].markAsTouched();
        // I added a condition for disabled status to avoid validation warning
        if (!this.entityForm.controls[c].valid && this.entityForm.controls[c].status !== 'DISABLED') {
          console.log("WARN : " + c + " is not valid");
          this.submitting = false;
        }
      }

      if (this.entityForm.valid) {
        this.contact = contact;
        this.contact.id = this.isOnEditMode() ? this.id : null;
        if (this.modeEdit && this.contact.id) {
          this.restService.update(this.contact).subscribe(
            resp => {
              this.updateSucceed();
              if (callback) {
                callback(resp);
              }
            },
            error => {
              this.showError(error);
              this.submitting = false;
            }
          );
        } else {
          this.restService.create(this.contact).subscribe(
            resp => {
              this.saveSucceed();
              if (callback) {
                callback(resp);
              }
            },
            error => {
              this.showError(error);
              this.submitting = false;
            }
          );
        }

      } else {
        this.submitted = true;
        this.toasterService.pop('error', 'Erreur', 'Le formulaire est invalide')
      }
    }
  }

  public deleteContact(id:number) {
    if(!this.modeEdit){
      this.goBackHome();
    }
    this.swal({
      title: 'Suppression',
      text: "Êtes-vous sûr de vouloir supprimer définitivement ce contact ?",
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#24b145',
      cancelButtonColor: '#cbd0cf',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Retour'
    }).then(() => {
      this.restService.delete(id).subscribe(
        resp => {
          this.deleteSucceed();
        },
        error => {
          this.showError(error);
          this.submitting = false;
        }
      );
    }, (dismiss) => {
      if(!this.modeEdit){
        this.goToList()
      }
    });
  }

  //------------ Validators -----------------

  isNotValidRequired(control: any) {
    if (control)
      return (control.hasError('required') && (control.dirty || control.touched || this.submitted)) && !this.entityForm.valid
  }

  isValidRequired(control: any) {
    return !control.hasError('required') && (control.dirty || control.touched || this.submitted) && !this.entityForm.valid
  }

  isNotValidPattern(control: any) {
    if (this.isValidRequired(control)) {
      return control.hasError('pattern')
    }
    return false;
  }

  isNotValidMin(control: any) {
    if (control)
      return (control.hasError('min') && (control.dirty || control.touched || this.submitted)) && !this.entityForm.valid
  }


  isNotValid(key: string) {
    let control = this.entityForm.controls[key];
    if (control) {
      return this.isNotValidControl(control);
    } else {
      console.log("Error : Undefined control form " + key);
    }
  }

  isNotValidControl(control: AbstractControl) {
    return !control.valid && (control.dirty || control.touched || this.submitted) && !this.entityForm.valid;
  }

  isNotValidControlFromArray(formArray: FormArray, index: any, key: string) {
    let control = this.getControlFromFormArray(formArray, index, key);
    if (control) {
      return this.isNotValidControl(control);
    } else {
      console.log("Error : Undefined control form " + key);
    }
  }

  removeExtraSpaces(string) {
    if (string)
      return string.replace(/\s+/g, ' ').trim()
  }
}
