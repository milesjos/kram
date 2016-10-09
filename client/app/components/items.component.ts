import { Component } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  moduleId: module.id,
  selector: 'items',
  templateUrl: 'items.component.html',
  styleUrls: ['items.component.css'],
  providers: [ItemsService]
})
export class ItemsComponent {
  constructor(private itemsService: ItemsService) { }
}
