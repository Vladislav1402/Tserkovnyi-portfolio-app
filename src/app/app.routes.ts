import { SneakersRoutes } from './components/portfolio/components/snickers-market/sneakers.routes';
import { furnitureRoutes } from './components/portfolio/components/furniture-app/furniture.routes';
import { Contacts } from './components/contacts/contacts.component';
import { RobotList } from './components/portfolio/components/robot-list/robot-list.component';
import { Portfolio } from './components/portfolio/views/portfolio-overview/portfolio-overview.component';
import { RandomColors } from './components/portfolio/random-colors/random-colors-overview/random-colors-overview.component';
import { Routes } from '@angular/router';
import { InnerWrapper } from './components/inner-wrapper/inner-wrapper.component';
import { Main } from './components/main/views/main.component';
import { TodoList } from './components/portfolio/components/todo-list/todo-list.component';
import { Sapper } from './components/portfolio/components/sapper-app/sapper.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/main",
        pathMatch: "full",
    },
    {
        path: "",
        component: InnerWrapper,
        children: [
            {
                path: 'main',
                component: Main
            },
            {
                path: 'portfolio',
                component: Portfolio,
            },
            {
                path: 'portfolio/randomColor',
                component: RandomColors
            },
            {
                path: 'portfolio/robotList',
                component: RobotList
            },
            {
                path: 'portfolio/todo-list',
                component: TodoList
            },
            {
                path: 'portfolio/furniture-app',
                children: furnitureRoutes
            },
            {
                path: 'portfolio/sapper',
                component: Sapper
            },
            {
                path: 'portfolio/snickers',
                children: SneakersRoutes
            },
            {
                path: 'contacts',
                component: Contacts
            }
        ]
    }

]


