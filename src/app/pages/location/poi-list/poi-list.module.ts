import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { PoiListPageRoutingModule } from './poi-list-routing.module';

import { PoiListPage } from './poi-list.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from 'src/app/modules/shared/shared.module';

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
        PoiListPageRoutingModule,
    ],
    declarations: [PoiListPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PoiListPageModule { }
