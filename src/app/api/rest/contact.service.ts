import {Inject, Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {Contact} from "../../shared/models/contact.model";
import {Response} from "@angular/http/src/static_response";


@Injectable()
export class ContactService {

  constructor(@Inject('API_URL') private url: string, private http: AuthHttp) {
  }

  public getAll(): Observable<Contact[]> {
    return this.http.get(`${this.url}/contacts`)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  public get(id: number): Observable<Contact> {
    return this.http.get(`${this.url}/contacts/${id}`)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  public create(object: Contact): Observable<string> {

    return this.http.post(`${this.url}/contacts`, JSON.stringify(object))
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  public update(object: Contact): Observable<string> {
    return this.http.put(`${this.url}/contacts/${object.id}`, JSON.stringify(object))
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete(`${this.url}/contacts/${id}`)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  protected handleError(error: any) {
    return Observable.throw(error);
  }


}
