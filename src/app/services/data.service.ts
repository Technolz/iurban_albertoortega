import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private PER_PAGE = 3;

    private originalEventList: Array<UrbanEvent> = [];

    private pointOfInterestList: BehaviorSubject<Array<UrbanCategory>> = new BehaviorSubject<Array<UrbanCategory>>([]);
    private eventsList: BehaviorSubject<Array<UrbanEvent>> = new BehaviorSubject<Array<UrbanEvent>>([]);
    private pdfsList: BehaviorSubject<Array<UrbanPdf>> = new BehaviorSubject<Array<UrbanPdf>>([]);

    constructor(private http: HttpClient) { }

    loadData(): Observable<Object> {
        const url = 'https://cicerone.cms-iurban.com/api/getCityData/8';
        const params = {
            'categories': JSON.stringify([40, 39, 148, 35, 36, 34, 38, 41])
        };

        const request = this.http.post(url, params);

        request.subscribe((response: any) => {
            if (!response || !response.data) throw new Error('Unable to load data');

            this.formatData(response.data);
        }, (err: any) => {
            console.error(err);
        });

        return request;
    }

    setPointsOfInterest(list: Array<UrbanCategory>) {
        this.pointOfInterestList.next(list);
    }

    getPointsOfInterest(): BehaviorSubject<Array<UrbanCategory>> {
        return this.pointOfInterestList;
    }

    setEventList(list: Array<UrbanEvent>) {
        this.eventsList.next(list);
    }

    getEvents(): BehaviorSubject<Array<UrbanEvent>> {
        return this.eventsList;
    }

    getNextEventPage(init: boolean, page: number) {
        if (init) {
            this.setEventList(this.originalEventList.slice(0, this.PER_PAGE));
            return;
        }

        const currentList = this.getEvents().getValue();

        const pageStart = this.PER_PAGE * (page - 1);
        const pageEnd = this.PER_PAGE * page;

        const nextPage = this.originalEventList.slice(pageStart, pageEnd);

        this.setEventList([...currentList, ...nextPage]);
    }

    setPdfList(list: Array<UrbanPdf>) {
        this.pdfsList.next(list);
    }

    getPdfs(): BehaviorSubject<Array<UrbanPdf>> {
        return this.pdfsList;
    }

    private formatData(data: UrbanResponse) {
        this.setPointsOfInterest(data.homePoints);
        this.setPdfList(data.pdfs);

        this.originalEventList = data.events;
        this.setEventList(data.events.slice(0, this.PER_PAGE));
    }
}

export interface UrbanEvent {
    id: string | number;
    cover_image: string;
    durationc: string;
    name: any;
};

export interface UrbanCategory {
    id: string | number;
    data: Array<UrbanLocation>;
    name: any;
}


export interface UrbanLocation {
    id: string | number;
    bg_image: string;
    cover_image: string;
    durationc: string;
    name: any;
};

export interface UrbanPdf {
    id?: string | number;
    description: any;
    name: any;
    url: string;
};

export interface UrbanResponse {
    events: Array<UrbanEvent>;
    homePoints: Array<UrbanCategory>;
    pdfs: Array<UrbanPdf>
}
