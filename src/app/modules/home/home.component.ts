import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isUsuarioLogado: boolean = false;

  constructor(private store: Store<{ auth: any }>) {
    this.store.select('auth').subscribe((authState) => {
      this.isUsuarioLogado = !!authState.token; // Se o token existir, o usuário está logado
    });
  }
}
