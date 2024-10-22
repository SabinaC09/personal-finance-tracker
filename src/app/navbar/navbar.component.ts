import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatList, MatListModule } from '@angular/material/list';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatDrawer, MatDrawerContainer, RouterOutlet, MatButtonModule, MatListModule, MatIconModule, RouterModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('drawer') drawer!: MatDrawer; 

  constructor(private router: Router) { }

  navigateTo(linkName: string) {
    this.drawer.close()
    this.router.navigate([linkName]);
  }
}
