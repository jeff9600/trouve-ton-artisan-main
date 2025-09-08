import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArtisanService, Artisan } from '../../../core/artisan.service';
import { FormsModule } from '@angular/forms';
import { ArtisanCardComponent } from '../../../shared/artisan-card.component';

@Component({
  selector: 'app-artisan-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ArtisanCardComponent],
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.scss']
})
export class ArtisanDetailComponent implements OnInit {
  artisan?: Artisan;

  // Form fields
  nom = '';
  objet = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('🔍 ID récupéré depuis URL :', idParam);
    const id = idParam ? Number(idParam) : null;
  
    if (id !== null && !isNaN(id)) {
      this.artisanService.getArtisanById(id).subscribe((a) => {
        this.artisan = a;
        console.log('✅ Artisan chargé :', this.artisan);
      });
    } else {
      console.error('❌ ID invalide dans l’URL :', idParam);
    }
  }
  

  onSubmit() {
    console.log('Formulaire envoyé !');
    console.log({
      destinataire: this.artisan?.name,
      nom: this.nom,
      objet: this.objet,
      message: this.message
    });
    alert('Message envoyé localement (maildev)');
  }
}
