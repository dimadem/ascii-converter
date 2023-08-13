import { AsciiEffect } from "./asciiEffect.js";

//  холст в формате 2d
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx);

// изображение
const image1 = new Image();
// image1.src = imageLink;
image1.src = "/images/Linux.png";
// console.log(image1);

// слайдер
const inputSlider = document.getElementById("resolution");
const inputLabel = document.getElementById("resolutionLabel");
inputSlider.addEventListener("change", handleSlider);
console.log(inputLabel);
let effect;

function handleSlider() {
  if (inputSlider.value == 1) {
    inputLabel.innerHtml = "Original Image";
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  } else {
    inputLabel.innerHtml = inputSlider.value;
    ctx.font = parseInt(inputSlider.value) * 1.5 + "px Veranda";
    effect.draw(parseInt(inputSlider.value));
  }
}

image1.onload = function initialize() {
  canvas.width = image1.width;
  canvas.height = image1.height;
  // ctx.drawImage(image1, 0, 0);

  effect = new AsciiEffect(ctx, image1.width, image1.height);
  effect.draw(10);
};

export { image1 };
