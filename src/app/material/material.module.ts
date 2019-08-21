import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatRadioModule,
    MatTooltipModule,
    MatChipsModule,
    MatCheckboxModule,
} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatIconModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatListModule,
        MatRadioModule,
        MatTooltipModule,
        MatChipsModule,
        MatCheckboxModule
    ]
})
export class MaterialModule { }
