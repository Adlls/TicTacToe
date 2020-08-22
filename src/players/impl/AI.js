"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI = void 0;
var cell_1 = require("../../cell");
var gameRules_1 = require("../../gameRules");
var AI = /** @class */ (function () {
    function AI() {
        this.isTurn = false;
        this.forWhom = "circle";
        this.countHorizontally = 0;
        this.countVertical = 0;
        this.countDiagonal = 0;
    }
    AI.prototype.getTurn = function () {
        return this.isTurn;
    };
    AI.prototype.setTurn = function (turn) {
        this.isTurn = turn;
    };
    AI.prototype.doMove = function (enemy, cells, addImage, input) {
        if (this.getTurn()) {
            var randomX = Phaser.Math.Between(0, cells[cells.length - 1].getCellX + cell_1.paramsCell.sizeCell);
            var randomY = Phaser.Math.Between(0, cells[cells.length - 1].getCellY + cell_1.paramsCell.sizeCell);
            for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                var cell = cells_1[_i];
                if (cell.belongsCell(randomX, randomY)) {
                    if (cell.isCross || cell.isCircle)
                        return;
                    cell.drawCircleOrCrossByPlayer(this, addImage);
                    this.setTurn(false);
                    enemy.setTurn(true);
                    return;
                }
            }
        }
    };
    AI.prototype.isWinner = function (cells) {
        return gameRules_1.GameRules.playerWin(cells, this.forWhom, this.countHorizontally, this.countVertical, this.countDiagonal);
    };
    return AI;
}());
exports.AI = AI;
