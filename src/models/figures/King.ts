import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    // якщо батьківський клас canMove повернув false,то ми теж повертаємо false
    if (!super.canMove(target)) return false;

    // MOVE FORWARD
    if (
      target.y === this.cell.y + 1 &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    // KILL FORWARD
    if (
      target.y === this.cell.y + 1 &&
      target.x === this.cell.x &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    // KILL right/left DIAG
    if (
      target.y === this.cell.y + 1 &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    // MOVE right/left diag BACK
    if (
      target.y === this.cell.y - 1 &&
      (target.x === this.cell.x - 1 || target.x === this.cell.x + 1) &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    // KILL right/left diag BACK
    if (
      target.y === this.cell.y - 1 &&
      (target.x === this.cell.x - 1 || target.x === this.cell.x + 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    // MOVE right/left diag FORWARD
    if (
      target.y === this.cell.y + 1 &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    // MOVE BEHIEND
    if (
      target.y === this.cell.y - 1 &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    // kill behiend
    if (
      target.y === this.cell.y - 1 &&
      target.x === this.cell.x &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    // MOVE right/left VERTICAL
    if (
      target.y === this.cell.y &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    // KILL right/left VERTICAL
    if (
      target.y === this.cell.y &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    return false;
  }
}
