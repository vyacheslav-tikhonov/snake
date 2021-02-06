import { GameField } from '../utils/field/field';
import { Point } from '../utils/field/types';

test('generate field and objects', () => {
  const gameField = new GameField({xLenght: 15, yLenght: 15});
  const field = gameField.getField();
  let points: Point[] = [];

  field.forEach((pointArr: Point[]) => {
    points = points.concat(pointArr);
  })

  const sum = points.reduce((sum: number, point: Point) => {
    return sum + point;
  }, 0);
  expect(sum).toBe(15 * 15);
});

test('get point value', () => {
  const gameField = new GameField({xLenght: 15, yLenght: 15});
  const value = gameField.getPointValue({x: 7, y: 7});
  expect(value).toBe(0)
});

test('get new coordinate', () => {
  const gameField = new GameField({xLenght: 15, yLenght: 15});

  let coordinate = gameField.getNewCoordinate({x: 7, y: 7}, 'Top');
  expect(coordinate).toEqual({x: 7, y: 6})

  coordinate = gameField.getNewCoordinate({x: 7, y: 7}, 'Right');
  expect(coordinate).toEqual({x: 8, y: 7})

  coordinate = gameField.getNewCoordinate({x: 7, y: 7}, 'Down');
  expect(coordinate).toEqual({x: 7, y: 8})

  coordinate = gameField.getNewCoordinate({x: 7, y: 7}, 'Left');
  expect(coordinate).toEqual({x: 6, y: 7})

  coordinate = gameField.getNewCoordinate({x: 17, y: 7}, 'Left');
  expect(coordinate).toBeUndefined()

  coordinate = gameField.getNewCoordinate({x: 7, y: 16}, 'Left');
  expect(coordinate).toBeUndefined()

  coordinate = gameField.getNewCoordinate({x: 7, y: 0}, 'Top');
  expect(coordinate).toBeUndefined()

  coordinate = gameField.getNewCoordinate({x: 15, y: 5}, 'Right');
  expect(coordinate).toBeUndefined()
});