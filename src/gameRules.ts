import {Cell} from "./cell";

export class GameRules {

   private static countAcceptWin: number = 5;


   private static checkCrossOrCircle(forWhome: string, cell: Cell, countBound: number): number {
       if (forWhome == 'circle') {
           if (cell.isCircle) {
               countBound++;
           } else {
               countBound = 0;

           }
       } else if (forWhome == 'cross') {
           if (cell.isCross) {
               countBound++;
           } else {
               countBound = 0;
           }
       }
       return countBound;
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
               if (countHorizontally == 5)  {

                   return true;
               }
           }
       }

       for (let cellOfBoundColl of boundCols) {
           for (let i = cellOfBoundColl[0]; i <= cellOfBoundColl[1]; i = i + 5) {
               countVertical = this.checkCrossOrCircle(forWhom, cells[i], countVertical);
               if (countVertical == 5) {
                   return true;
               }
           }
       }

       for (let i = 0; i < boundDiagonals.length; i++) {
           let indexDiagonal: number = -1;
           if (i % 2 == 0) indexDiagonal = 1;
           for (let j = boundDiagonals[i][0]; j <= boundDiagonals[i][1]; j = j + 5 + indexDiagonal) {
               countDiagonal = this.checkCrossOrCircle(forWhom, cells[j], countDiagonal);
               if (countDiagonal == 5) {
                   return true;
               }
           }
       }

       return false;
   }

   //формируем отдельные класстеры по горизонтали, вертикали и диагонали
   public static shapeBoundsRows(cells: Array<Cell>): Array<[number, number]> {

       let boundRows: Array<[number, number]> = new Array<[number, number]>(5);
       let indexBound: number = 0;

       for (let j = 0; j < cells.length; j = j + 5) {
           boundRows[indexBound] = [j, j + 5 - 1];
           indexBound++;
       }
       return boundRows;
   }

   public static shapeBoundsCols(cells: Array<Cell>): Array<[number, number]> {

       let boundCols: Array<[number, number]> = new Array<[number, number]>(5);
       let indexBound: number = 0;

       for (let j = 0; j < 5; j++) {
           boundCols[indexBound] = [j, cells.length - 5 + j];
           indexBound++;
       }
       return boundCols;
   }

   public static shapeBoundsDiagonals(cells: Array<Cell>,
                                      boundRows: Array<[number, number]>): Array<[number, number]> {

       let boundDiagonals: Array<[number, number]> = new Array<[number, number]>();

       let indexBound: number = 0;
       let deltaDiagonalIncrement: number = 5 - this.countAcceptWin;
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
