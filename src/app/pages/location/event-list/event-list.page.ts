import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService, UrbanEvent } from 'src/app/services/data.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.page.html',
    styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit, OnDestroy {
    private dataSubscription: Subscription | undefined;
    private languageSubscription: Subscription | undefined;
    private currentPage = 1;
    private currentLength = 0;

    language: string;

    list: Array<UrbanEvent> = [];

    canLoadMore = true;

    constructor(private dataService: DataService, private languageService: LanguageService) {
        this.language = 'es';
    }

    ngOnInit() {
        this.languageSubscription = this.languageService.getCurrentLanguage().subscribe((lang: string) => this.language = lang);

        this.dataService.getNextEventPage(true, this.currentPage);

        this.dataSubscription = this.dataService.getEvents().subscribe((list: Array<UrbanEvent>) => {
            this.list = list;

            if (this.currentLength && this.currentLength === this.list.length) {
                this.canLoadMore = false;
                return;
            }
            this.currentLength = this.list.length;
        });
    }

    ngOnDestroy() {
        if (this.dataSubscription) this.dataSubscription.unsubscribe();
        if (this.languageSubscription) this.languageSubscription.unsubscribe();
    }

    onScrollDetected(ev: any) {
        this.currentPage++;

        this.dataService.getNextEventPage(false, this.currentPage);

        setTimeout(() => {
            (ev as InfiniteScrollCustomEvent).target.complete();
        }, 500);
    }
}
