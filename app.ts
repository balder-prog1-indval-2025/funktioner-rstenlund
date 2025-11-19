import ProgramManager from "./ProgramManager";
import Box from "./box";
import Box3 from "./Box3";
import Ray3 from "./Ray3";

const app = new ProgramManager();

app.addProgram("sum3()", async () => {
  function sum3(x, y, z) {
    return x + y + z;
  }
  write(sum3(1, 3, 5));
  write(sum3(2, 4, 6));
});

app.addProgram("dist()", async () => {
  const dist = (x: number, y: number) => {
    return x < y ? y - x : x - y;
  };
  write(dist(2, 5));
  write(dist(6, 1));
});

app.addProgram("dist2D()", async () => {
  const dist2D = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  write(dist2D(1, 2, 4, 6));
  write(dist2D(1, 2, 13, 7));
});

app.addProgram("ascending()", async () => {
  const ascending = (x, y, z, v) => v >= z && z >= y && y >= x;
  write(ascending(1, 2, 3, 4)); // true
  write(ascending(5, 6, 8, 7)); // false
  write(ascending(3, 3, 4, 4)); // true
  write(ascending(3, 4, 4, 3)); // false
});

app.addProgram("min()", async () => {
  const min = (list: Array<number>) => {
    let m = Math.max(...list);
    for (let n of list) {
      if (n < m) m = n;
    }
    return m;
  };
  write(min([23, 45, 18, 67])); // 18
});

app.addProgram("min2()", async () => {
  const min2 = (...ns: Array<number>) => {
    let m = Math.max(...ns);
    for (let n of ns) {
      if (n < m) m = n;
    }
    return m;
  };
  write(min2(23, 45, 18, 67)); // 18
});

app.addProgram("prod()", async () => {
  const prod = (l: Array<number>) => l.reduce((n, f) => n * f, 1);
  write(prod([3, 6, 2])); // 36
});

app.addProgram("includes()", async () => {
  const includes = (n: number, l: number[]) => {
    let h = false;
    for (const e of l) {
      if (e == n) h = true;
    }
    return h;
  };
  write(includes(3, [5, 7, 2])); // false
  write(includes(3, [5, 7, 3])); // true
});

app.addProgram("textverktyg", async () => {
  const visaRepeterat = (t: string, n: number) => {
    for (let i = 0; i < n; i++) {
      write(t);
    }
  };
  const visaUppdelat = (t: string, denominator: string) => {
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      write(c == denominator ? "\n" : c, "");
    }
    write();
  };

  const antalMellanslag = (t: string) => {
    let n = 0;
    for (const c of t) {
      if (c == " ") {
        n++;
      }
    }
    return n;
  };

  visaRepeterat("Hej!", 3); // Hej!
  // Hej!
  // Hej!

  visaRepeterat("Balder", 2); // Balder
  // Balder

  visaUppdelat("Apple/Microsoft/Google", "/"); // Apple
  // Microsoft
  // Google

  visaUppdelat("a-b-c-d", "-"); // a
  // b
  // c
  // d

  let antal1 = antalMellanslag("Hej på dig!");
  write(antal1); // 2

  let antal2 = antalMellanslag("Balder");
  write(antal2);
});

app.addProgram("sameChar()", async () => {
  const sameChar = (t: string) => {
    const fc = t[0];
    let same = true;
    for (let c of t) {
      if (c != fc) {
        same = false;
      }
    }
    return same;
  };
  write(sameChar("aaaaaaaaaa")); // true
  write(sameChar("bbbbcc")); // false
});

app.addProgram("isPrime()", async () => {
  const isPrime = (n: number) => {
    let p = true;
    for (let i = n; i > 0; i--) {
      if (i != n && i > 1 && n % i == 0) {
        p = false;
      }
    }
    return p;
  };
  write(isPrime(3)); // false
  write(isPrime(17)); // true
});

app.addProgram(
  "grafritare",
  async () => {
    clearIO();
    let grad = +(await read("Grad: "));
    let koefficienter = [];
    let alfabet = "abcdefghijklmnopqrstuvwxyzåäö";
    for (let i = 0; i < grad + 1; i++) {
      let v = +(await read(alfabet[i] + "="));
      koefficienter.push(v);
    }
    write("f(x)=", "");
    for (let i = 0; i < koefficienter.length; i++) {
      let exp = koefficienter.length - i - 1;
      if (exp == 0) {
        write(koefficienter[i]);
      } else {
        write(koefficienter[i] + "x^" + exp + "+", "");
      }
    }
    await sleep(2000);
    app.enterGraphicsMode();

    let x_res = 10;
    let y_max = 5;

    line(0, H / 2, W, H / 2, "black", 2);
    line(W / 2, 0, W / 2, H, "black", 2);
    ctx.translate(W / 2, H / 2);

    let points = [];

    for (let i = -W / 2; i < W / 2; i++) {
      //await sleep(0.5);

      let x_val = i * (x_res / W);
      let y_sum = 0;
      for (let i = 0; i < koefficienter.length; i++) {
        let exp = koefficienter.length - i - 1;
        y_sum += koefficienter[i] * x_val ** exp;
      }
      let x_coord = i;
      let y_coord = -0.5 * y_sum * (H / y_max);
      points.push([x_coord, y_coord]);
      //circle(x_coord, y_coord, 1, "red");
    }

    for (let i = 1; i < points.length; i++) {
      await sleep(0.5);
      let x1 = points[i - 1][0];
      let y1 = points[i - 1][1];
      let x2 = points[i][0];
      let y2 = points[i][1];
      line(x1, y1, x2, y2, "red", 2);
    }

    return true;
  },
  true
);

app.addProgram("bounce", async () => {
  function bounce(n: number) {
    write(n);
    if (n > 0) {
      bounce(n - 1);
      write(n);
    }
  }
  clearIO();

  bounce(2);

  return true;
});

app.addProgram(
  "gejm",
  () => {
    const area_size = 400;
    const fov = 50;
    const angle_step = 0.1;
    const tracing_radius = 400;
    const step = 5;

    let boxes: Box[] = [];

    boxes.push(new Box(0, 50, 0, 0, 50, 50));
    boxes.push(new Box(140, 140, 0, 0, 20, 20));

    let px = 250;
    let py = 250;

    let a = 0;

    const dtr = (d: number): number => d * (Math.PI / 180);

    document.addEventListener("keydown", (e) => {
      if (e.key == "a") {
        a--;
      } else if (e.key == "d") {
        a++;
      } else if (e.key == "w") {
        let x_term = Math.cos(dtr(a)) * step;
        let y_term = Math.sin(dtr(a)) * step;
        px += x_term;
        py += y_term;
      } else if (e.key == "s") {
        let x_term = Math.cos(dtr(a)) * step;
        let y_term = Math.sin(dtr(a)) * step;
        px -= x_term;
        py -= y_term;
      }
    });

    const ray_result = (
      x: number,
      y: number,
      r: number,
      angle: number
    ): number[] => {
      let dist = [-1, 0];
      let dists = [];
      for (let b of boxes) {
        for (let i: number = 0; i < r; i++) {
          let dx = x + Math.cos(dtr(angle)) * i;
          let dy = y + Math.sin(dtr(angle)) * i;
          //console.log(boxes[0].pointIntersects(10, 40));

          if (
            dx < 0 ||
            dx > area_size ||
            dy < 0 ||
            dy > area_size ||
            b.pointIntersects(dx, dy)
          ) {
            if (b.pointIntersects(dx, dy)) {
              dists.push([i, 1]);
            } else {
              dists.push([i, 0]);
            }
            break;
          }
        }
      }
      if (dists.length > 0) {
        dist = dists.reduce((min, curr) => (curr[0] < min[0] ? curr : min));
      }
      return dist;
    };

    update = () => {
      fill("black");
      const rays = fov / angle_step;
      for (let i = 0; i < rays; i++) {
        const ray_angle = a + i * angle_step - fov / 2;
        const ray_trace = ray_result(px, py, tracing_radius, ray_angle);
        const dist = ray_trace[0];
        const id = ray_trace[1];

        const intensity =
          dist > 0 ? (tracing_radius - dist) / tracing_radius : 0;

        const bar_x = (i * W) / rays;
        const bar_y = H / 2 + -intensity * (H / 2);
        const bar_w = W / rays;
        const bar_h = intensity * H;

        let color = `rgb(${intensity * 255},0,0)`;
        if (id == 1) {
          color = `rgb(0,0,${intensity * 255})`;
        }

        rectangle(bar_x, bar_y, bar_w, bar_h, color);
        rectangle(bar_x, H - bar_y, bar_w, bar_y, "rgb(0,100,0)");
      }
    };
    return true;
  },
  true
);

app.addProgram(
  "3d",
  () => {
    return true;
  },
  true
);

while (true) {
  let res = await app.queryPrograms();
  if (res) {
    break;
  }
}

export {};
