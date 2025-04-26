import { AuthorizationService } from './../../core/services/authorization.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
// it is not private because we want to use it in the html file
   readonly authorizationService=inject(AuthorizationService)
}
