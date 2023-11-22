import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-random-colors',
    templateUrl: './random-colors-overview.component.html',
    styleUrls: ['./random-colors-overview.component.scss'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule]
})

export class RandomColors {

    faLock = faLock;
    faLockOpen = faLockOpen;
    colors: any[] = [];
    copied = false;
    colorsToSave: any[] = [];
    copiedColors: boolean[] = [];

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.code === 'Space') {
            event.preventDefault()
            this.setRandomCollors()
        }
    }


    ngOnInit() {
        const savedColors = localStorage.getItem('colors')
        if (savedColors) {
            const savedCollorsArray = JSON.parse(savedColors);
                this.colors = savedCollorsArray.map((col:any) => {
                    return {
                      label: col.isLocked ? col.label : this.generateRandomColor(),
                      isLocked : col.isLocked ? col.isLocked : false
                    }
                  });
            
                console.log('colors', this.colors);
        } else {
            for (let i = 0; i < 6; i++) {
                this.colors.push({ label: this.generateRandomColor(), isLocked: false });
            }
        }
        this.copiedColors = new Array(this.colors.length).fill(false);
    }

    copyToClickBoard(index: number, color: string) {
        navigator.clipboard.writeText(color);
        this.copiedColors[index] = true;
        setTimeout(() => this.copiedColors[index] = false, 1000);
    }

    setRandomCollors() {
        this.colors.map(col => !col.isLocked ? col.label = this.generateRandomColor() : col.label)

    }

    handleTogleLock(index: number, isLocked: boolean) {
        this.colors[index].isLocked = !isLocked
        if(!this.colorsToSave.length){
            this.colorsToSave = this.colors
        }
        localStorage.setItem('colors', JSON.stringify(this.colorsToSave))
    }

    getTextColor(color: string) {
        return this.isLightColor(color) ? '#000' : "#fff"
    }

    isLightColor(hexColor: string): boolean {
        //RGB from HEX
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        //calculate the average brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        //true for bright and false for dark
        return brightness > 128;
    }

    generateRandomColor() {
        const hexCodes = '0123456789ABCDEF';
        let color = '';
        for (let i = 0; i < 6; i++) {
            color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
        }
        return '#' + color
    }

}