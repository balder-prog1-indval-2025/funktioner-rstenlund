export default class ProgramManager {
  private programs: Array<{ namn: string; run: Function; g: boolean }>;

  constructor() {
    this.programs = [];
  }

  addProgram(name: string, callback: Function, graphical: boolean = false) {
    this.programs.push({ namn: name, run: callback, g: graphical });
  }

  enterGraphicsMode() {
    _io.hidden = true;
    _canvas.hidden = false;
  }

  async queryPrograms() {
    write("Vilket program vill du köra?");
    let s = false;
    let i = 0;
    for (let p of this.programs) {
      write(i + ") " + p.namn);
      i++;
    }
    let n = +(await read("n: "));
    write(" ");
    if (n < 0 || n + 1 > this.programs.length || isNaN(n)) {
      write("Invalid program.");
    } else {
      const p = this.programs[n];
      if (p.g) this.enterGraphicsMode();
      s = await this.programs[n].run();
    }
    write(" ");
    if (s) {
      return s;
    }
  }
}
