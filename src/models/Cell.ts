import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // чи можна перемістити фігуру
  id: number; // для ключів реакту

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      // якщо ячівка(по y) не пуста,то повертаємо false
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      // якщо ячівка(по y) не пуста,то повертаємо false
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyDiagonal(target: Cell): boolean {
    // різниця x і y завжди буде однакова
    // тому якщо різниця НЕ ОДНАКОВА
    // це не діагональ

    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) return false;

    // якщо dy  = 1,то треба рухатись вниз
    // якщо dy = -1,то треба рухатись вверх

    // якщо dx = 1,то треба рухатись вверх
    // якщо dx = -1,то треба рухатись вниз

    // визначають напрямок руху
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      // перевірка усіх діагональних клітинок
      // якщо початкова 2 2,а target 5 5,то будуть провірятись 3 3(при i = 1),4 4 і тд
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure.canMove(target)) {
      this.figure.moveFigure(target);
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
