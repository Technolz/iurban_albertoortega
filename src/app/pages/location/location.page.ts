import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Language, LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
    styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
    selectedTab!: string;

    @ViewChild('tabs', { static: false })
    tabs!: IonTabs;

    languageList: Array<Language> = [{
        code: 'en',
        logo: '/assets/language-icons/en.png'
    }, {
        code: 'es',
        logo: '/assets/language-icons/es.png'
    }];

    inactiveLanguage: Language;

    constructor(
        private dataService: DataService,
        private langaugeService: LanguageService,
        private loadingService: LoadingController,
    ) {
        this.inactiveLanguage = this.languageList.find((l) => l.code !== 'es') || this.languageList[0];
    }

    ngOnInit() {
        this._prepareData();
    }

    onTabChange() {
        this.selectedTab = this.tabs.getSelected() || '';
    }

    onLanguageChange(lang: Language) {
        if (!lang || !lang.code) return;

        this.langaugeService.setCurrentLanguage(lang.code);
        this.inactiveLanguage = this.languageList.find((l) => l.code !== lang.code) || lang;
    }

    private async _prepareData() {
        const loadingSpinner = await this.loadingService.create();
        loadingSpinner.present();

        this.dataService.loadData().pipe(
            finalize(() => {
                loadingSpinner.dismiss();
            })
        ).subscribe(() => { });
    }
}
