import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/modules/shared/shared.module';

import { LocationPageRoutingModule } from './location-routing.module';

import { LocationPage } from './location.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        SharedModule,
        TranslateModule.forChild({
            defaultLanguage: 'es',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        IonicModule,
        LocationPageRoutingModule
    ],
    declarations: [LocationPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocationPageModule { }
