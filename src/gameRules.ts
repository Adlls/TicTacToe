import {Cell, paramsCell} from "./cell";

export enum paramsGrid {
    countRectBasic = 5,
    contRectExtended = 8
}

export class GameRules {

   private static countAcceptWin: number = 5;
   public static currentCountRectPerimeter = paramsGrid.countRectBasic;

   private static checkCrossOrCircle(forWhom: string, cell: Cell, countBound: number): number {
       if (forWhom == 'circle') {
           if (cell.isCircle) {
               countBound++;
           } else {
               countBound = 0;

           }
       } else if (forWhom == 'cross') {
           if (cell.isCross) {
               countBound++;
           } else {
               countBound = 0;
           }
       }
       return countBound;
   }

   private static expandGrid(cells: Array<Cell>): Array<Cell> {
       this.currentCountRectPerimeter = paramsGrid.contRectExtended;
       let newCells: Array<Cell> = new Array<Cell>();

       let indexOldCells: number = 0;
       let rectX: number = paramsCell.startX;
       let rectY: number = paramsCell.startY;
       for (let i = 1; i <= GameRules.currentCountRectPerimeter; i++) {
           for (let j = 1; j <= GameRules.currentCountRectPerimeter; j++) {
               rectX += paramsCell.sizeCell;
               let cell: Cell;

              if (typeof cells[indexOldCells] !== 'undefined') {
               if (cells[indexOldCells].isCross || cells[indexOldCells].isCircle) {
                   cells[indexOldCells].setCellX = rectX;
                   cells[indexOldCells].setCellY = rectY;
                   cell = cells[indexOldCells];
               } else {
                   cell = new Cell(rectX, rectY);
               }
              } else {
                   cell = new Cell(rectX, rectY);
               }
               newCells.push(cell);
               indexOldCells++;
           }
           rectX = paramsCell.startX;
           rectY += paramsCell.sizeCell;
       }
       return newCells;
   }

   public static checkForExtensionInitCells(cells: Array<Cell>): Array<Cell> {
       let countFilledCells = 0;
       for (let cell of cells) {
           if (cell.isCircle || cell.isCross) countFilledCells++;
       }

       let fillIndex = countFilledCells/cells.length;

       if (fillIndex > 0.6) {
           return this.expandGrid(cells);
       } else {
           return cells;
       }
   }

   public static playerWin(cells: Array<Cell>,
                           forWhom: string,
                           countHorizontally: number,
                           countVertical: number,
                           countDiagonal: number): boolean {

       let boundRows: Array<[number, number]> = GameRules.shapeBoundsRows(cells);
       let boundCols: Array<[number, number]> = GameRules.shapeBoundsCols(cells);
       let boundDiagonals: Array<[number, number]> = GameRules.shapeBoundsDiagonals(cells, boundRows);



       for (let cellOfBoundRow of boundRows) {
           for (let i = cellOfBoundRow[0]; i <= cellOfBoundRow[1]; i++) {
               countHorizontally =  this.checkCrossOrCircle(forWhom, cells[i], countHorizontally);
               if (countHorizontally == GameRules.countAcceptWin)  {
                   return true;
               }
           }
       }

       for (let cellOfBoundColl of boundCols) {
           for (let i = cellOfBoundColl[0]; i <= cellOfBoundColl[1]; i = i + GameRules.currentCountRectPerimeter) {
               countVertical = this.checkCrossOrCircle(forWhom, cells[i], countVertical);
               if (countVertical == GameRules.countAcceptWin) {
                   return true;
               }
           }
       }

       for (let i = 0; i < boundDiagonals.length; i++) {
           let indexDiagonal: number = -1;
           if (i % 2 == 0) indexDiagonal = 1;
           for (let j = boundDiagonals[i][0]; j <= boundDiagonals[i][1]; j = j + GameRules.currentCountRectPerimeter + indexDiagonal) {
               countDiagonal = this.checkCrossOrCircle(forWhom, cells[j], countDiagonal);
               if (countDiagonal == GameRules.countAcceptWin) {
                   return true;
               }
           }
       }

       return false;
   }

   //формируем отдельные класстеры по горизонтали, вертикали и диагонали
   public static shapeBoundsRows(cells: Array<Cell>): Array<[number, number]> {

       let boundRows: Array<[number, number]> = new Array<[number, number]>(GameRules.currentCountRectPerimeter);
       let indexBound: number = 0;

       for (let j = 0; j < cells.length; j = j + GameRules.currentCountRectPerimeter) {
           boundRows[indexBound] = [j, j + GameRules.currentCountRectPerimeter - 1];
           indexBound++;
       }
       return boundRows;
   }

   public static shapeBoundsCols(cells: Array<Cell>): Array<[number, number]> {

       let boundCols: Array<[number, number]> = new Array<[number, number]>(GameRules.currentCountRectPerimeter);
       let indexBound: number = 0;

       for (let j = 0; j < GameRules.currentCountRectPerimeter; j++) {
           boundCols[indexBound] = [j, cells.length - GameRules.currentCountRectPerimeter + j];
           indexBound++;
       }
       return boundCols;
   }

   public static shapeBoundsDiagonals(cells: Array<Cell>,
                                      boundRows: Array<[number, number]>): Array<[number, number]> {

       let boundDiagonals: Array<[number, number]> = new Array<[number, number]>();

       let indexBound: number = 0;
       let deltaDiagonalIncrement: number = GameRules.currentCountRectPerimeter - this.countAcceptWin;
       for (let j = 0; j <= deltaDiagonalIncrement; j++) {

           boundDiagonals[indexBound] = [j, boundRows[boundRows.length - 1 - j][1]];
           indexBound++;

           boundDiagonals[indexBound] = [
               boundRows[0][1],
               boundRows[boundRows.length - 1 - j][0]
           ];
           indexBound++;
       }

       return boundDiagonals;
   }
}
