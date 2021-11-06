export interface Series {
  name: string;
  color: string;
  data: Point[],
}

export interface Point {
  x: string | number;
  y: string | number;
}
