// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"


let overlays= [];
let hex;
let colors=[];
document.querySelectorAll('#product-a, #product-b, #product-c').forEach(function(path) {
  path.onclick = chooseProduct;
})

document.querySelectorAll('#product-a, #product-b, #product-c').forEach(function(path) {
    path.onmouseover = hoverProduct;
})

document.querySelectorAll('#product-a, #product-b, #product-c').forEach(function(path) {
    path.onmouseout = removeHoverProduct;
})

function removeHoverProduct(e) {
    if (overlays)  for (const overlay of overlays) { overlay.classList.remove('highlight') }
}

function hoverProduct(e) {
    if (overlays)  for (const overlay of overlays) { overlay.classList.remove('highlight') }
    overlays = document.querySelectorAll("[id=" + e.target.id + "]");
    for (const overlay of overlays) { overlay.classList.add('highlight') }
}

function chooseProduct(e) {
  if (overlays)  for (const overlay of overlays) { overlay.classList.remove('highlight') }
  overlays = document.querySelectorAll("[id=" + e.target.id + "]");
  for (const overlay of overlays) { overlay.classList.add('highlight') }
  if (!hex) { alert('Please choose color first')}
  if (overlays ) for (const overlay of overlays) { overlay.style.fill = hex }
}


colors = document.getElementsByClassName("color");
for (var i = 0; i < colors.length; i++) {
  colors[i].onclick = changeColor;
}

function changeColor(e) {
  if (hex) for (const color of colors) { color.classList.remove('checkmark') }
  hex = e.target.getAttribute("data-hex");
  e.target.classList.add('checkmark')
//   if (overlays ) for (const overlay of overlays) { overlay.style.fill = hex }
}