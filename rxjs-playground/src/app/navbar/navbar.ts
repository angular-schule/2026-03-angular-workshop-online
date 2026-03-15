import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rxw-navbar',
  templateUrl: './navbar.html',
  styles: [],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {}
