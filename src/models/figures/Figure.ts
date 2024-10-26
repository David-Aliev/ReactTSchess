import { Colors } from "../Colors";
import logo from "../../assets/black-king.png";
import { Cell } from "../Cell";

export enum FigureNames {
  FIGURE = "Фігура",
  KING = "Король",
  KNIGHT = "Кінь",
  PAWN = "Пішак",
  QUEEN = "Королева",
  ROOK = "Тура",
  BISHOP = "Слон",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
    this.logo = null;
  }

  canMove(target: Cell): boolean {
    // заборона ходьби на фігуру свого ж кольору
    if (target.figure?.color == this.color) return false;
    if (target.figure?.name == FigureNames.KING) return false;

    return true;
  }

  moveFigure(target: Cell) {}
}
