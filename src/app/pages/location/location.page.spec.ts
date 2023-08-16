import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LocationPage } from './location.page';

describe('AppComponent', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocationPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(LocationPage);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

});
