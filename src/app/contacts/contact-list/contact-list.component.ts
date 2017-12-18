import {Component, OnInit} from "@angular/core";
import {ContactService} from "../../api/rest/contact.service";
import {Contact} from "../../shared/models/contact.model";
import {FormComponent} from "../../shared/components/form-component";

@Component({
  selector: 'app-contacts',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})


export class ContactComponent extends FormComponent implements OnInit {

  contacts: Contact[];
  contactsMatrice: any[] = [];

  constructor(public contactService: ContactService) {
    super(contactService);
  }

  ngOnInit() {
    this.loadContacts();
  }

  private loadContacts() {
    this.contactService.getAll().subscribe(
      resp => {
        this.contacts = resp
        if (this.contacts) {
          this.contacts.sort(function (a, b) {
            return b.id - a.id;
          });
          let ind = 0;
          this.contactsMatrice[0] = [];
          this.contacts.forEach((contact, indice) => {
            if (indice != 0 && indice % 3 == 0) {
              ind++;
              this.contactsMatrice[ind] = []
            }
            this.contactsMatrice[ind].push(contact);
          });
        }
      },
      error => this.showError(error)
    );
  }

  goToForm(id?: number) {
    if (!id) {
      this.router.navigate(["contact/new"]);
    } else {
      this.router.navigate(["contact/" + id + "/edit"]);
    }
  }

  createForm() {

  }

}
