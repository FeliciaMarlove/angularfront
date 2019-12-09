import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DefiModel} from "../models/defi-model";
import {Observable} from "rxjs";
import {log} from "util";

const URI = 'http://localhost:8080/api/defis/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DefisService {
  public selection: DefiModel;
  public idDefi;
  public catNum;
  @Output() change: EventEmitter<DefiModel> = new EventEmitter();

  constructor(private http: HttpClient) { }

  select(defi) {
    this.selection = defi;
    this.idDefi = defi.idDefi;
    this.catNum = this.getIdCat();
    this.change.emit(this.selection);
  }

  listActiveDefis() {
    return this.http.get(URI);
  }
  listeAllDefis() {
    return this.http.get(URI + 'all');
  }

  setActiveDefi(defiId) {
    return this.http.post(URI + 'activer/' + defiId,
      httpOptions).subscribe();
  }

  setInactiveDefi(defiId) {
    return this.http.post(URI + 'desactiver/' + defiId,
      httpOptions).subscribe();
  }

  getIdCategorie(idDefi) {
    return this.http.get(URI + 'getcat/' + idDefi);
    //RETOURNE UN OBSERVABLE BC -> HTTP !
  }

  getIdCat(): number {
    this.getIdCategorie(this.idDefi).subscribe(
      data => this.catNum = data
    )
    return this.catNum;
  }

  createDefi(defi) {
    return this.http.post(URI + 'creer', JSON.stringify(defi), httpOptions);
  }

  updateDefi(idDefi, defi) {
    const defiDto = {};
    defiDto['id'] = defi.idDefi;
    defiDto['nomDefi'] = defi.nomDefi;
    defiDto['descDefi'] = defi.descDefi;
    defiDto['infobulleDefi'] = defi.infobulleDefi;
    defiDto['categorieId'] = defi.categorie.idCategorie;
    // ^ noms attributs du Dto en back
    return this.http.post(URI + 'update/' + idDefi, JSON.stringify(defiDto), httpOptions);
  }
}
