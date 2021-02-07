interface Coordinate { 
  x: number
  y: number
}

type Point = 0 | 1 | 2 // Snake | Field | Food 

enum Points {
  Snake,
  Field,
  Food
}

type Field = Array<Array<Point>>;
// [1,1,1,1,1], 
// [1,1,1,2,1], 
// [1,0,1,1,1], 
// [1,1,1,1,1], 
// [1,1,1,1,1], 

interface FieldSize { 
  xLenght: number
  yLenght: number
}

type Direction = 'Top' | 'Right' | 'Down' | 'Left';

enum Directions {
  Top,
  Right,
  Down,
  Left
}

export type { Coordinate, Point, Field, Direction, FieldSize };
export { Directions, Points };