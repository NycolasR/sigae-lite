import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MainMenuComponent } from './modules/shared/components/main-menu/main-menu.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainMenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  deveExibirMainMenu = true; // Controla a exibição do componente

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Verifica se a rota inclui o caminho para a página de login
        // Se a página atual for a de login, o componente app-main-menu não deve ser exibido
        this.deveExibirMainMenu = !event.url.includes('/login');
      });
  }
}
