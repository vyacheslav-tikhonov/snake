import { Coordinate, Direction, Points } from "../field/types";
import { GameField } from "../field/field";

class SnakeNode {
  private route: Coordinate[];
  private currentCoordinate: Coordinate;

  public constructor(coordinate: Coordinate, route?: Coordinate[]) {
    this.currentCoordinate = coordinate;
    this.route = route || [];
  }

  public addNewCoordinate(coordinate: Coordinate): void {
    this.route.push(coordinate);
  }

  public getNextCoordinate(): Coordinate | undefined {
    const routePart = this.route.splice(0, 1);
    if (routePart) {
      this.currentCoordinate = routePart[0];
      return routePart[0];
    }
  }

  public getCurrentCoordinate(): Coordinate {
    return this.currentCoordinate;
  }

  public getRoute(): Coordinate[] {
    return this.route;
  }
}

class Snake {
  private body: SnakeNode[] = [];

  public constructor(coordinate: Coordinate) {
    this.addTailNode(coordinate);
  }

  public crawl(direction: Direction, field: GameField) {
    const newCoordinate = this.calculateNewCoordinate(direction, field);
    if (newCoordinate) {
      const point = field.getPointValue(newCoordinate);

      let coordinate: Coordinate | undefined = undefined;
      let route: Coordinate[] | undefined = undefined;

      this.addNewCoordinateToNodes(newCoordinate);

      if (point === Points['Food']) {
        const lastNode = this.body[this.body.length - 1];
        coordinate = lastNode.getCurrentCoordinate()
        route = lastNode.getRoute();
      }

      this.moveNodes(field);

      if (coordinate && route) {
        this.addTailNode(coordinate, route);
      }
    } else {
      throw Error('death');
    } 
  }

  private moveNodes(field: GameField) {
    const coordinates: [Coordinate, Coordinate][] = [];
    this.body.forEach((snakeNode: SnakeNode) => {
        const nextCoordinate = snakeNode.getNextCoordinate();
        const currentCoordinate = snakeNode.getCurrentCoordinate();
        if (nextCoordinate) {
          coordinates.push([currentCoordinate, nextCoordinate]);
        }
    })
    field.movePoints(coordinates);
  }

  private addNewCoordinateToNodes(coordinate: Coordinate) {
    this.body.forEach((node: SnakeNode) => {
      node.addNewCoordinate(coordinate);
    })
  }

  private addTailNode(coordinate: Coordinate, route?: Coordinate[]) {
    const node = new SnakeNode(coordinate, route);
    this.body.push(node);
  } 

  private calculateNewCoordinate(direction: Direction, field: GameField) {
    const head = this.body[0];
    const currentCoordinate = head.getCurrentCoordinate();

    return field.getNewCoordinate(currentCoordinate, direction);
  }
}

export { SnakeNode, Snake };