import { Contacts } from './components/contacts/contacts.component';
import { RobotList } from './components/portfolio/components/robot-list/robot-list.component';
import { Portfolio } from './components/portfolio/views/portfolio-overview/portfolio-overview.component';
import { RandomColors } from './components/portfolio/random-colors/random-colors-overview/random-colors-overview.component';
import { Routes } from '@angular/router';
import { InnerWrapper } from './components/inner-wrapper/inner-wrapper.component';
import { Main } from './components/main/views/main.component';
import { TodoList } from './components/portfolio/components/todo-list/todo-list.component';

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
                path: 'contacts',
                component: Contacts
            }
        ]
    }

]


