import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faFlag } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: 'app-sapper',
    templateUrl: './sapper.component.html',
    styleUrls: ['./sapper.component.scss'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule]
})

export class Sapper implements OnInit {
    rows = 10;
    cols = 10;
    mines = 20;
    gameBoard: any[][] = [];
    isGameOver = false;
    faFlag = faFlag;

    ngOnInit() {
        this.resetGame();
    }

    get flagsCount() {
        let count = 0;
        this.gameBoard.forEach(row => {
           row.forEach(col => {
            if(col.isFlag){
                count ++;
            }
           })
        })
        return count
    }

    getMineClass(i:number, j: number) {
      return  this.gameBoard[i][j].isMine && !this.gameBoard[i][j].isHidden &&  this.gameBoard[i][j].isChoosenMine ? 'mine' : this.gameBoard[i][j].isMine && !this.gameBoard[i][j].isHidden &&  !this.gameBoard[i][j].isChoosenMine ? 'gray-mine' : ''
    }

    resetGame() {
        this.isGameOver = false;
        this.gameBoard = Array.from({ length: this.rows }, () =>
            Array.from({ length: this.cols }, () => ({ isHidden: true, isMine: false, isRevealed: false, isChoosenMine: false, isFlag: false }))
        );

        this.placeMines();
    }

    handleRightClick(event: MouseEvent,i:number, j: number) {
        event.preventDefault()
       this.gameBoard[i][j].isFlag = !this.gameBoard[i][j].isFlag;

    }

    placeMines() {
        let placedMines = 0;

        while (placedMines < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);

            if (!this.gameBoard[row][col].isMine) {
                this.gameBoard[row][col].isMine = true;
                placedMines++;
            }
        }
    }

    countAdjacentMines(row: number, col: number): number {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        let count = 0;

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (this.isValidCell(newRow, newCol) && this.gameBoard[newRow][newCol].isMine) {
                count++;
            }
        }

        return count;
    }

    isValidCell(row: number, col: number): boolean {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    revealCell(row: number, col: number) {
        this.gameBoard[row][col].isFlag = false;
        this.gameBoard[row][col].isHidden = false;
        if (this.isGameOver || this.gameBoard[row][col].isRevealed) {
            return;
        }

        if (this.gameBoard[row][col].isMine) {
            this.isGameOver = true;
            this.gameBoard[row][col].isChoosenMine = true;
            this.gameBoard.forEach(row => row.map(col => {
                col.isHidden = false
                col.isFlag = false
            }))
            setTimeout(() => {
                alert('Game Over! You hit a mine.');
            },200) 
            return;
        }

        this.gameBoard[row][col].isRevealed = true;

        const adjacentMines = this.countAdjacentMines(row, col);

        if (adjacentMines === 0) {
            this.revealAdjacentCells(row, col);
        }
    }

    revealAdjacentCells(row: number, col: number) {
        const directions = [
            [-1, 0], [1, 0],
            [0, -1], [0, 1]
        ];

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (this.isValidCell(newRow, newCol)) {
                this.revealCell(newRow, newCol);
            }
        }
    }
}