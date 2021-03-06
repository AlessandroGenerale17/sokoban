import { cellType } from "./cellTypes";

export const level = [
  [
    { x: 0, y: 0, cellType: cellType.empty, target: false },
    { x: 0, y: 1, cellType: cellType.empty, target: false },
    { x: 0, y: 2, cellType: cellType.wall, target: false },
    { x: 0, y: 3, cellType: cellType.wall, target: false },
    { x: 0, y: 4, cellType: cellType.wall, target: false },
    { x: 0, y: 5, cellType: cellType.wall, target: false },
    { x: 0, y: 6, cellType: cellType.wall, target: false },
    { x: 0, y: 7, cellType: cellType.empty, target: false },
  ],
  [
    { x: 1, y: 0, cellType: cellType.wall, target: false },
    { x: 1, y: 1, cellType: cellType.wall, target: false },
    { x: 1, y: 2, cellType: cellType.wall, target: false },
    { x: 1, y: 3, cellType: cellType.empty, target: false },
    { x: 1, y: 4, cellType: cellType.empty, target: false },
    { x: 1, y: 5, cellType: cellType.empty, target: false },
    { x: 1, y: 6, cellType: cellType.wall, target: false },
    { x: 1, y: 7, cellType: cellType.empty, target: false },
  ],
  [
    { x: 2, y: 0, cellType: cellType.wall, target: false },
    { x: 2, y: 1, cellType: cellType.empty, target: true },
    { x: 2, y: 2, cellType: cellType.player, target: false },
    { x: 2, y: 3, cellType: cellType.box, target: false },
    { x: 2, y: 4, cellType: cellType.empty, target: false },
    { x: 2, y: 5, cellType: cellType.empty, target: false },
    { x: 2, y: 6, cellType: cellType.wall, target: false },
    { x: 2, y: 7, cellType: cellType.empty, target: false },
  ],
  [
    { x: 3, y: 0, cellType: cellType.wall, target: false },
    { x: 3, y: 1, cellType: cellType.wall, target: false },
    { x: 3, y: 2, cellType: cellType.wall, target: false },
    { x: 3, y: 3, cellType: cellType.empty, target: false },
    { x: 3, y: 4, cellType: cellType.box, target: false },
    { x: 3, y: 5, cellType: cellType.empty, target: true },
    { x: 3, y: 6, cellType: cellType.wall, target: false },
    { x: 3, y: 7, cellType: cellType.empty, target: false },
  ],
  [
    { x: 4, y: 0, cellType: cellType.wall, target: false },
    { x: 4, y: 1, cellType: cellType.empty, target: true },
    { x: 4, y: 2, cellType: cellType.wall, target: false },
    { x: 4, y: 3, cellType: cellType.wall, target: false },
    { x: 4, y: 4, cellType: cellType.box, target: false },
    { x: 4, y: 5, cellType: cellType.empty, target: false },
    { x: 4, y: 6, cellType: cellType.wall, target: false },
    { x: 4, y: 7, cellType: cellType.empty, target: false },
  ],
  [
    { x: 5, y: 0, cellType: cellType.wall, target: false },
    { x: 5, y: 1, cellType: cellType.empty, target: false },
    { x: 5, y: 2, cellType: cellType.wall, target: false },
    { x: 5, y: 3, cellType: cellType.empty, target: false },
    { x: 5, y: 4, cellType: cellType.empty, target: true },
    { x: 5, y: 5, cellType: cellType.empty, target: false },
    { x: 5, y: 6, cellType: cellType.wall, target: false },
    { x: 5, y: 7, cellType: cellType.wall, target: false },
  ],
  [
    { x: 6, y: 0, cellType: cellType.wall, target: false },
    { x: 6, y: 1, cellType: cellType.box, target: false },
    { x: 6, y: 2, cellType: cellType.empty, target: false },
    { x: 6, y: 3, cellType: cellType.box, target: true },
    { x: 6, y: 4, cellType: cellType.box, target: false },
    { x: 6, y: 5, cellType: cellType.box, target: false },
    { x: 6, y: 6, cellType: cellType.empty, target: true },
    { x: 6, y: 7, cellType: cellType.wall, target: false },
  ],
  [
    { x: 7, y: 0, cellType: cellType.wall, target: false },
    { x: 7, y: 1, cellType: cellType.empty, target: false },
    { x: 7, y: 2, cellType: cellType.empty, target: false },
    { x: 7, y: 3, cellType: cellType.empty, target: false },
    { x: 7, y: 4, cellType: cellType.empty, target: true },
    { x: 7, y: 5, cellType: cellType.empty, target: false },
    { x: 7, y: 6, cellType: cellType.empty, target: false },
    { x: 7, y: 7, cellType: cellType.wall, target: false },
  ],
  [
    { x: 8, y: 0, cellType: cellType.wall, target: false },
    { x: 8, y: 1, cellType: cellType.wall, target: false },
    { x: 8, y: 2, cellType: cellType.wall, target: false },
    { x: 8, y: 3, cellType: cellType.wall, target: false },
    { x: 8, y: 4, cellType: cellType.wall, target: false },
    { x: 8, y: 5, cellType: cellType.wall, target: false },
    { x: 8, y: 6, cellType: cellType.wall, target: false },
    { x: 8, y: 7, cellType: cellType.wall, target: false },
  ],
];
export const targets = 7;
export const initialPlayerPos = { x: 2, y: 2, active: false };
