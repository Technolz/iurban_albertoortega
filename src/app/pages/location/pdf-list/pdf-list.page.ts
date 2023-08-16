import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Browser } from '@capacitor/browser';
import { LanguageService } from 'src/app/services/language.service';
import { DataService, UrbanPdf } from 'src/app/services/data.service';

@Component({
    selector: 'app-pdf-list',
    templateUrl: './pdf-list.page.html',
    styleUrls: ['./pdf-list.page.scss'],
})
export class PdfListPage implements OnInit {
    private dataSubscription: Subscription | undefined;
    private languageSubscription: Subscription | undefined;

    language: string;

    list: Array<UrbanPdf> = [];

    constructor(private dataService: DataService, private languageService: LanguageService) {
        this.language = 'es';
    }

    ngOnInit() {
        this.languageSubscription = this.languageService.getCurrentLanguage().subscribe((lang: string) => this.language = lang);

        this.dataSubscription = this.dataService.getPdfs().subscribe((list: Array<UrbanPdf>) => {
            this.list = list
        });
    }

    ngOnDestroy() {
        if (this.dataSubscription) this.dataSubscription.unsubscribe();
        if (this.languageSubscription) this.languageSubscription.unsubscribe();
    }

    async onOpenPdf(pdf: any) {
        await Browser.open({
            url: pdf.url[this.language],
        });
    }
}
