import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, UrbanCategory } from 'src/app/services/data.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-poi-list',
    templateUrl: './poi-list.page.html',
    styleUrls: ['./poi-list.page.scss'],
})
export class PoiListPage implements OnInit, OnDestroy {
    private dataSubscription: Subscription | undefined;
    private languageSubscription: Subscription | undefined;

    language: string;

    list: Array<UrbanCategory> = [];

    constructor(private dataService: DataService, private languageService: LanguageService) {
        this.language = 'es';
    }

    ngOnInit() {
        this.languageSubscription = this.languageService.getCurrentLanguage().subscribe((lang: string) => this.language = lang);

        this.dataSubscription = this.dataService.getPointsOfInterest().subscribe((list: Array<UrbanCategory>) => {
            this.list = list
        });
    }

    ngOnDestroy() {
        if (this.dataSubscription) this.dataSubscription.unsubscribe();
        if (this.languageSubscription) this.languageSubscription.unsubscribe();
    }

    /**
     * Return card image depending on the category
     * @param {*} category
     */
    getCardImage(category: any) {
        // Return bg_image for "Información de interes" category
        if (category.id === 41) return 'bg_image';

        return 'cover_image';
    }
}
