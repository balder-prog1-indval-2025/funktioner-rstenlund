export default class Box {
  private xorg: number;
  private yorg: number;
  private x_off: number;
  private y_off: number;
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  public debug_mode: boolean;

  constructor(
    x_origin: number,
    y_origin: number,
    x_off: number,
    y_off: number,
    width: number,
    height: number
  ) {
    this.xorg = x_origin;
    this.yorg = y_origin;
    this.x_off = x_off;
    this.y_off = y_off;
    this.x = this.xorg + this.x_off;
    this.y = this.yorg + this.y_off;
    this.w = width;
    this.h = height;
    this.debug_mode = false;
  }

  moveTo(x: number, y: number) {
    this.xorg = x;
    this.yorg = y;
    this.x = this.xorg + this.x_off;
    this.y = this.yorg + this.y_off;
  }

  debug(ctx: CanvasRenderingContext2D) {
    if (!this.debug_mode) return;
    //thinner stroke
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  intersectsWith(other_box: Box): boolean {
    return (
      this.x + this.w > other_box.x &&
      this.x < other_box.x + other_box.w &&
      this.y + this.h > other_box.y &&
      this.y < other_box.y + other_box.h
    );
  }

  pointIntersects(mouse_x: number, mouse_y: number): boolean {
    return (
      mouse_x > this.x &&
      mouse_x < this.x + this.w &&
      mouse_y > this.y &&
      mouse_y < this.y + this.h
    );
  }
}
