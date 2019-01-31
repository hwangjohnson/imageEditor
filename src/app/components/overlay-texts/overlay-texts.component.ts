import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EditableTextComponent } from '../editable-text/editable-text.component';
import { EditSettingsService } from '../../service/edit-settings.service';
import { MoveClampedToParentDirective } from '../../directives/move-clamped-to-parent.directive';
@Component({
  selector: 'app-overlay-texts',
  templateUrl: './overlay-texts.component.html',
  styleUrls: ['./overlay-texts.component.scss']
})
export class OverlayTextsComponent implements OnInit {

	@ViewChildren(EditableTextComponent) editableTexts: QueryList<EditableTextComponent>;
	@ViewChildren(MoveClampedToParentDirective) moveClampedToParents: QueryList<MoveClampedToParentDirective>;
	@Input() sizeSettings: any;
	@Input() textSettings: any;

  constructor(private editSettingsService: EditSettingsService) { }

  ngOnInit() {
  	this.editSettingsService.storeOverlays.subscribe((isClear) => this.onUpdateOverlays(isClear));
  }

  	private onUpdateOverlays(isClear: boolean) {

		//update
		if (this.moveClampedToParents) {
			this.moveClampedToParents.forEach(item => item.update());
		}

		//clear currently selected controls
		if(isClear) {

			//update selectedModel helper
			this.textSettings.selectedModelUniqueId = -1;

			//reset controls
			this.editableTexts.map(item => item.reset());
		}
	}

  	private onSelected(index) {

		//only one selected overlay at a time
		this.editSettingsService.updateOverlays(true);

		//update selectedModel helper
		this.textSettings.selectedModelUniqueId = index;

		//update edit text overlay
		let editableTextComponent = this.editableTexts.filter(item => this.textSettings.selectedModelUniqueId === item.model.uniqueId);
		if(editableTextComponent.length === 1) {
			this.editSettingsService.updateEditText(editableTextComponent[0]);
		}
	}

}
