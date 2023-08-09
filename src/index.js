import { imageLink } from "../images/ImageBase64.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx);
const image1 = new Image();

// image1.src = imageLink;
image1.src = "/images/Linux.png";
// console.log(image1);

class Cell {
  constructor(x, y, symbol, color) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillText(this.symbol, this.x, this.y);
  }
}
class AsciiEffect {
  // # - private methods
  // hold array of pixels
  #imageCellArray = [];
  #symbols = [];
  #pixels = [];
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.#ctx.drawImage(image1, 0, 0, this.#width, this.#height);

    // work with base64 array
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
  }

  #convertToSymbol(g) {
    if (g > 250) return "@";
    else if (g > 240) return "*";
    else if (g > 230) return "+";
    else if (g > 220) return "-";
    else if (g > 210) return "=";
    else if (g > 200) return "1";
    else if (g > 190) return "2";
    else if (g > 180) return "3";
    else return "";
  }

  #scanImage(cellSize) {
    this.#imageCellArray = [];
    for (let y = 0; y < this.#pixels.height; y += cellSize) {
      for (let x = 0; x < this.#pixels.width; x += cellSize) {
        const posX = x * 4;
        const posY = y * 4;
        const pos = posY * this.#pixels.width + posX;
        if (this.#pixels.data[pos + 3] > 128) {
          const red = this.#pixels.data[pos];
          const green = this.#pixels.data[pos + 1];
          const blue = this.#pixels.data[pos + 2];
          const total = red + green + blue;
          const averageColorValue = total / 3;
          const color = "rgb(" + red + "," + green + "," + blue + ")";
          const symbol = this.#convertToSymbol(averageColorValue);
          if (total > 200)
            this.#imageCellArray.push(new Cell(x, y, symbol, color));
        }
      }
    }
    console.log(this.#imageCellArray);
  }
  #drawAscii() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    for (let i = 0; i < this.#imageCellArray.length; i++) {
      this.#imageCellArray[i].draw(this.#ctx);
    }
  }
  draw(cellSize) {
    this.#scanImage(cellSize);
    this.#drawAscii();
  }
}

let effect;
image1.onload = function initialize() {
  canvas.width = image1.width;
  canvas.height = image1.height;
  // ctx.drawImage(image1, 0, 0);

  effect = new AsciiEffect(ctx, image1.width, image1.height);
  effect.draw(50);
};
