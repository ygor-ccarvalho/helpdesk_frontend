import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tecnico-create.component',
  imports: [FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css',
})
export class TecnicoCreateComponent {}
       