import { Snake, SnakeNode } from '../utils/snake/snake';
import { GameField } from '../utils/field/field';
import { Point } from '../utils/field/types';

test('snake node test', () => {
  const initialCoordinate = {x: 0, y: 0};
  const node = new SnakeNode(initialCoordinate);
  const coordinate = node.getCurrentCoordinate();
  expect(coordinate).toEqual(initialCoordinate);

  let route = node.getRoute(); 
  expect(route.length).toBe(0);

  const firstRouteCoordinate = {x: 1, y: 1};
  node.addNewCoordinate(firstRouteCoordinate);
  route = node.getRoute();
  expect(route.length).toBe(1);

  node.addNewCoordinate({x: 2, y: 2});
  route = node.getRoute();
  expect(route.length).toBe(2);

  const nextCoordinatenode = node.getNextCoordinate();
  const currentCoordinate = node.getCurrentCoordinate();
  route = node.getRoute();
  expect(route.length).toBe(1);
  expect(nextCoordinatenode).toEqual(firstRouteCoordinate);
  expect(nextCoordinatenode).toEqual(currentCoordinate);
})



// test('snake init node', () => {
//   const field = new GameField({xLenght: 3, yLenght: 3})
//   const snake = new Snake({x: 1, y: 1});
//   snake.crawl('Top', field);

//   let fieldArr: Point[] = [];
//   field.getField().forEach((points: Point[]) => {
//     fieldArr = fieldArr.concat(points);
//   })
//   console.log(fieldArr);
// })