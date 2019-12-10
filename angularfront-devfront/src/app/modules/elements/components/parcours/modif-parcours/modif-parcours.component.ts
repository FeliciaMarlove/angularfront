import {Component, Input, OnInit} from '@angular/core';
import {ParcoursModel} from '../../../../../models/parcours-model';
import {ParcoursService} from '../../../../../services/parcours.service';

@Component({
  selector: 'app-modif-parcours',
  templateUrl: './modif-parcours.component.html',
  styleUrls: ['./modif-parcours.component.css']
})
export class ModifParcoursComponent implements OnInit {
  @Input() private parc: ParcoursModel;
  @Input() private nomParc;
  @Input() private descParc;
  @Input() private prixParc: number;
  @Input() private idCatParc: number;

  constructor(private parcoursService: ParcoursService) { }

  ngOnInit() {
    this.parcoursService.change.subscribe(select => {this.parc = select; this.nomParc = select.nomParcours; this.descParc = select.descParcours; this.prixParc = select.prix;})
  }
  mettreAJourParcours() {
    this.parcoursService.updateParcours(this.parc, this.parcoursService.parcoursId).subscribe();
  }
}
