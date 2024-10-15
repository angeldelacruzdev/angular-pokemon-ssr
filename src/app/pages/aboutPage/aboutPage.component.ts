import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './aboutPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent { }
