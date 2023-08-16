import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { register as SwiperRegister } from 'swiper/element/bundle';

SwiperRegister();

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(translate: TranslateService) {
        translate.setDefaultLang('es');
        translate.use('es');
    }
}
