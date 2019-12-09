import { Component, OnInit } from '@angular/core';
import {DefiModel} from '../../../../../models/defi-model';
import {DefisService} from '../../../../../services/defis.service';

@Component({
  selector: 'app-defis-admin',
  templateUrl: './defis-admin.component.html',
  styleUrls: ['./defis-admin.component.css']
})
export class DefisAdminComponent implements OnInit {
  private def: DefiModel;
  private nomDef;
  private descDef;
  private infoDef;
  private idCat;
  addDefi: DefiModel;

  constructor(private defiService: DefisService) { }

  ngOnInit() {
  }

  ajouterDefi() {
    this.def = new DefiModel();
    this.def.nomDefi = this.nomDef;
    this.def.descDefi = this.descDef;
    this.def.infobulleDefi = this.infoDef;
    this.def.categorieId = this.idCat;
    this.defiService.createDefi(this.def).subscribe();
  }

  defiData(defi: DefiModel) {
    console.log(defi);
    this.addDefi = defi;
  }
}
