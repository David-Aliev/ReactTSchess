import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    // якщо батьківський клас canMove повернув false,то ми теж повертаємо false
    if (!super.canMove(target)) return false;
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      // звичайний хід пішака
      (target.y === this.cell.y + direction ||
        // перевірка на перший крок
        (this.isFirstStep && target.y == this.cell.y + firstStepDirection)) &&
      // рух тільки по вертикалі
      target.x === this.cell.x &&
      // перевірка чи вільна цільова клітинка
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (
      // рухається вперед на одну клітинку по вертикалі
      target.y === this.cell.y + direction &&
      // перевірка чи знаходиться ціль на одну клітинку вправо/вліво від пішака по горизонталі
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    return false;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
