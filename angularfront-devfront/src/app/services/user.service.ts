import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user-model";
import {LoginModel} from "../models/login-model";

const URI = 'http://localhost:8080/api/utilisateurs/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  logged;

  constructor(private http: HttpClient) { }

  create(user): any {
    return this.http.post(URI + 'creer', JSON.stringify(user), httpOptions);
  }

  login(logins: LoginModel) {
    const loginDto = {};
    loginDto['email'] = logins.email;
    loginDto['password'] = logins.password;
    this.logged = true;
    return this.http.post(URI + 'login', JSON.stringify(logins), httpOptions);
  }

  getUserFromMail(email: string): any {
    return this.http.get(URI + email);
  }

  getDefiDuJour(idUtil): any {
    return this.http.get('http://localhost:8080/api/utilparc/defi/' + idUtil);
  }

  listAllUsers() {
    return this.http.get(URI);
  }

  setInactiveUser(id) {
    return this.http.post(URI + 'desactiver/' + id, httpOptions);
  }

  setActiveUser(id) {
    return this.http.post(URI + 'activer/' + id, httpOptions);
  }

  updateUser(user, id) {
    // user = userentity
    const userDto = {};
    userDto['idUtilisateur'] = user.idUtilisateur;
    userDto['nomUtilisateur'] = user.nomUtilisateur;
    userDto['prenomUtilisateur'] = user.prenomUtilisateur;
    userDto['email'] = user.email;
    userDto['motDePasse'] = user.motDePasse;
    userDto['newsletterOptIn'] = user.newsletterOptIn;
    userDto['roleId'] = user.roleId;
    userDto['isBusy'] = user.isBusy;
    // méthode màj en back prend un userdto
    return this.http.post(URI + 'update/' + id, JSON.stringify(userDto), httpOptions);
  }

}
