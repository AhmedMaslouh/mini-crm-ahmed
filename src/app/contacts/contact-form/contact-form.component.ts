import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {ContactService} from "../../api/rest/contact.service";
import {Contact} from "../../shared/models/contact.model";
import {FormComponent} from "../../shared/components/form-component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent extends FormComponent implements OnInit {

  contacts: Contact[];
  contact: Contact;

  name: string;

  constructor(public fb: FormBuilder, public contactService: ContactService,
              public activatedRoute: ActivatedRoute) {
    super(contactService);
    this.createForm(this.contact);
  }

  ngOnInit() {
    this.loadContacts();
    this.activatedRoute.params.subscribe(
      params => {
        if (params['id']) {
          this.id = params['id'];
          this.modeEdit = true;
          this.contactService.get(params['id']).subscribe(
            res => {
              this.contact = res;
              this.createForm(this.contact);
            },
            err => this.showError(err)
          )
        }
      }
    );
  }

  private loadContacts() {
    this.contactService.getAll().subscribe(
      resp => {
        this.contacts = resp;
        if (this.contacts) {
          this.contacts.sort(function (a, b) {
            return b.id - a.id;
          });
          if (this.contacts.length > 4) {
            this.contacts = this.contacts.slice(0, 4);
          }
        }
      },
      error => this.showError(error)
    );
  }

  createForm(contactModel: Contact) {
    if (contactModel) {
      this.contact = contactModel;
      this.name = this.contact.name.toUpperCase();
    } else {
      this.contact = new Contact();
    }
    this.entityForm = this.fb.group({
      'name': [this.contact.name, Validators.required],
      'address': [this.contact.address, Validators.required],
      'email': [this.contact.email, Validators.required],
      'mobile': [this.contact.mobile, Validators.required],
      'favContact': [this.contact.favContact],
      'phone': [this.contact.phone],
      'company': [this.contact.company],
      'createdDate': [this.contact.createdDate],
      'website': [this.contact.website],
      'social': [this.contact.social],
    });

    this.entityForm.valueChanges.subscribe(data => {
      this.name = this.entityForm.get("name").value.toUpperCase();
    });
  }

  submitForm($ev, value: any) {
    let contact: Contact = new Contact(value);
    contact.createdDate = new Date();
    this.submit($ev, contact);
  }
}
