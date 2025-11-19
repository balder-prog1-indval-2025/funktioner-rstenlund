import Point from "./Point";

export default class Box3 {
  private x: number;
  private y: number;
  private z: number;
  private w: number;
  private h: number;
  private d: number;

  public debug_mode: boolean;

  constructor(
    x_pos: number,
    y_pos: number,
    z_pos: number,
    width: number,
    height: number,
    depth: number
  ) {
    this.x = x_pos;
    this.y = y_pos;
    this.z = z_pos;
    this.w = width;
    this.h = height;
    this.d = depth;

    this.debug_mode = false;
  }

  moveTo(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  debug(ctx: CanvasRenderingContext2D) {
    if (!this.debug_mode) return;
    //thinner stroke
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  intersectsWith(other_box: Box3): boolean {
    return (
      this.x + this.w > other_box.x &&
      this.x < other_box.x + other_box.w &&
      this.y + this.h > other_box.y &&
      this.y < other_box.y + other_box.h &&
      this.z + this.d > other_box.z &&
      this.z < other_box.z + other_box.d
    );
  }

  pointIntersects(mouse_x: number, mouse_y: number, mouse_z: number): boolean {
    return (
      mouse_x > this.x &&
      mouse_x < this.x + this.w &&
      mouse_y > this.y &&
      mouse_y < this.y + this.h &&
      mouse_z > this.z &&
      mouse_z < this.z + this.d
    );
  }

  PointIntersects(point: Point): boolean {
    let mouse_x = point.x;
    let mouse_y = point.y;
    let mouse_z = point.z;
    return (
      mouse_x > this.x &&
      mouse_x < this.x + this.w &&
      mouse_y > this.y &&
      mouse_y < this.y + this.h &&
      mouse_z > this.z &&
      mouse_z < this.z + this.d
    );
  }
}
