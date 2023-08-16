import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoiListPage } from './poi-list.page';

const routes: Routes = [
    {
        path: '',
        component: PoiListPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PoiListPageRoutingModule { }
