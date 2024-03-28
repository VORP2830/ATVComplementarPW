import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {
  @Input() titulo: string = '';
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = '';
  @Input() link!: string;
  @Input() botaoListar = false;

  constructor(private router: Router) { }

  listar(): void {
    if(this.link != null) {
      this.router.navigate([`/${this.link.toLocaleLowerCase()}/lista`]);
    }
    else{
      this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
    }
  }

}
