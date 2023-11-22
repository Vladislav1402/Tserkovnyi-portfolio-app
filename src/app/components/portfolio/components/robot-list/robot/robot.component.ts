import { RequestService } from '../../../../../services/request.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Robot } from '../../../../../types/header';

@Component({
    selector: 'app-robot',
    templateUrl: './robot.component.html',
    styleUrls: ['./robot.component.scss'],
    standalone: true,
})

export class RobotComponent {

    @Input() robot!: Robot;
    @Output() onDeleteRobot: EventEmitter<number> = new EventEmitter()

    get robotImg() {
        return `https://robohash.org/${this.robot.id}20?200*200`
    }

    handleDelete() {
        this.onDeleteRobot.emit(this.robot.id)
    }

}