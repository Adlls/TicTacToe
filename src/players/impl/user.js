"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var gameRules_1 = require("../../gameRules");
var User = /** @class */ (function () {
    function User() {
        //пользователь идет первый
        this.isTurn = true;
        this.forWhom = "cross";
        this.countHorizontally = 0;
        this.countVertical = 0;
        this.countDiagonal = 0;
    }
    User.prototype.getTurn = function () {
        return this.isTurn;
    };
    User.prototype.setTurn = function (turn) {
        this.isTurn = turn;
    };
    User.prototype.doMove = function (enemy, cells, addImage, input) {
        var _this = this;
        input.on("pointerdown", function () {
            if (_this.getTurn()) {
                for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                    var cell = cells_1[_i];
                    if (cell.belongsCell(input.x, input.y)) {
                        if (cell.isCross || cell.isCircle)
                            return;
                        cell.drawCircleOrCrossByPlayer(_this, addImage);
                        _this.setTurn(false);
                        enemy.setTurn(true);
                        return;
                    }
                }
            }
        }, this);
    };
    User.prototype.isWinner = function (cells) {
        return gameRules_1.GameRules.playerWin(cells, this.forWhom, this.countHorizontally, this.countVertical, this.countDiagonal);
    };
    return User;
}());
exports.User = User;
