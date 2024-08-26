import { SneakersMarket } from './overview/sneakers-market-overview.component';
import { Routes } from "@angular/router";

export const SneakersRoutes: Routes = [

    {
        path: "",
        redirectTo: "/snickers-main",
        pathMatch: "full",
    },
    {
        path: "snickers-main",
        component: SneakersMarket
    }
]