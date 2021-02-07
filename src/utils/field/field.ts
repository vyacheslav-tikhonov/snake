import { Point, Coordinate, Field, Direction, Directions, FieldSize } from './types';

class GameField {
  private field: Field = [];
  private size: FieldSize;
  private foodCoordinate: Coordinate = {x: 0, y: 0};
  private snackInitialCoordinate: Coordinate = {x: 0, y: 0};


  public constructor(size: FieldSize) {
    this.size = size;
    this.generateField();
    this.initObjects();
  }

  public getField(): Field {
    return this.field;
  }

  public getSnackInitialCoordinate(): Coordinate {
    return this.snackInitialCoordinate;
  }

  public movePoints(coordinates: [Coordinate, Coordinate][]) {
    for (const coordinate of coordinates) {
      this.movePoint(coordinate[0], coordinate[1]);
    }
    if (coordinates[0][0].y === this.foodCoordinate.y &&
      coordinates[0][0].x === this.foodCoordinate.x) {
        this.generateFood();
      }
  }

  public addPoint(coordinate: Coordinate): void {
    if (this.field[coordinate.y][coordinate.x] !== 0) {
      this.field[coordinate.y][coordinate.x] = 0;
    } else {
      throw Error('death');
    }
  }

  public movePoint(fromCoordinate: Coordinate, toCoordinate: Coordinate): void {
    this.field[fromCoordinate.y][fromCoordinate.x] = 1;
    this.field[toCoordinate.y][toCoordinate.x] = 0;
  }

  public getNewCoordinate(coordinate: Coordinate, direction: Direction): Coordinate | undefined {
    switch (Directions[direction]) {
      case 0:
        return this.getMovePointToTop(coordinate);
      case 1:
        return this.getMovePointToRight(coordinate);
      case 2:
        return this.getMovePointToDown(coordinate);
      case 3:
        return this.getMovePointToLeft(coordinate);
    }
  }

  public getPointValue(coordinate: Coordinate) {
    return this.field[coordinate.y][coordinate.x];
  }

  private initObjects() {
    this.generateSnake();
    this.generateFood();
  }

  private generateSnake() {
    const xAverage = Math.floor(this.size.xLenght / 2);
    const yAverage = Math.floor(this.size.yLenght / 2);
    this.field[yAverage][xAverage] = 0;
    this.snackInitialCoordinate = { y: yAverage, x: xAverage };
  }

  private generateFood() {
    const xIndex = Math.floor(Math.random()*(this.size.xLenght))
    const yIndex = Math.floor(Math.random()*(this.size.yLenght))
    if (this.field[yIndex][xIndex]) {
      this.field[yIndex][xIndex] = 2;
      this.foodCoordinate = { y: yIndex, x: xIndex };
    } else {
      this.generateFood();
    }
  }

  private getPoint(coordinate: Coordinate) {
    if ((coordinate.x >= 0 && coordinate.x < this.size.xLenght) &&
        (coordinate.y >= 0 && coordinate.y < this.size.yLenght)
      ) {
      return this.field[coordinate.y][coordinate.x];
    }
  }

  private getMovePointToTop(coordinate: Coordinate): Coordinate | undefined {
    const point = this.getPoint({y: coordinate.y - 1, x: coordinate.x});
    if (point) {
      return {
        y: coordinate.y -1,
        x: coordinate.x
      };
    }
  }

  private getMovePointToRight(coordinate: Coordinate): Coordinate | undefined {
    const point = this.getPoint({y: coordinate.y, x: coordinate.x + 1});
    if (point) {
      return {
        y: coordinate.y,
        x: coordinate.x + 1
      }
    }
  }

  private getMovePointToDown(coordinate: Coordinate): Coordinate | undefined {
    const point = this.getPoint({y: coordinate.y + 1, x: coordinate.x});
    if (point) {
      return {
        y: coordinate.y + 1,
        x: coordinate.x 
      }
    }
  }

  private getMovePointToLeft(coordinate: Coordinate): Coordinate | undefined {
    const point = this.getPoint({y: coordinate.y, x: coordinate.x - 1});
    if (point) {
      return {
        y: coordinate.y,
        x: coordinate.x - 1
      };
    }
  }

  private generateField() {
    /*
      Create matrix y*x
    */
    const field: Field = [];
    for (let i=0; i < this.size.yLenght; i++) {
      field[i] = [];
      for (let k=0; k < this.size.xLenght; k++) {
        field[i].push(1);
      }
    }
    this.field = field;
  }
}

export { GameField }