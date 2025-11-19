import Box3 from "./Box3";
import Point from "./Point";

export default class Ray3 {
  private x_origin: number;
  private y_origin: number;
  private z_origin: number;
  private theta: number;
  private phi: number;
  private range: number;

  constructor(
    x: number,
    y: number,
    z: number,
    t: number,
    p: number,
    r: number
  ) {
    this.theta = t;
    this.phi = p;
    this.range = r;
    this.x_origin = x;
    this.y_origin = y;
    this.z_origin = z;
  }

  distance(boxes: Box3[]) {
    let dist = this.range;
    for (let box of boxes) {
      for (let i = 0; i < this.range; i++) {
        let p = Point.fromSpherical(this.theta, this.phi, i);
        if (box.PointIntersects(p)) {
          if (i < dist) {
            dist = i;
          }
        }
      }
    }
  }
}
