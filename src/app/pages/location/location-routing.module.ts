import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationPage } from './location.page';

const routes: Routes = [
    {
        path: '',
        component: LocationPage,
        children: [
            {
                path: 'points-of-interest',
                loadChildren: () => import('./poi-list/poi-list.module').then(m => m.PoiListPageModule)
            },
            {
                path: 'events',
                loadChildren: () => import('./event-list/event-list.module').then(m => m.EventListPageModule)
            },
            {
                path: 'pdfs',
                loadChildren: () => import('./pdf-list/pdf-list.module').then(m => m.PdfListPageModule)
            },
            {
                path: '',
                redirectTo: '/valencia/points-of-interest',
                pathMatch: 'full'
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationPageRoutingModule { }
