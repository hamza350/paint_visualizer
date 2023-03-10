// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"


// let overlays= [];
let hex;
let colors=[];
// document.querySelectorAll('#product-a, #product-b, #product-c').forEach(function(path) {
//   path.onclick = chooseProduct;
// })

// document.querySelectorAll('#product-a, #product-b, #product-c').forEach(function(path) {
//     path.onmouseover = hoverProduct;
// })

// document.querySelectorAll('#product-a, #product-b, #product-c').forEach(function(path) {
//     path.onmouseout = removeHoverProduct;
// })

// function removeHoverProduct(e) {
//     if (overlays)  for (const overlay of overlays) { overlay.classList.remove('highlight') }
// }

// function hoverProduct(e) {
//     if (overlays)  for (const overlay of overlays) { overlay.classList.remove('highlight') }
//     overlays = document.querySelectorAll("[id=" + e.target.id + "]");
//     for (const overlay of overlays) { overlay.classList.add('highlight') }
// }

// function chooseProduct(e) {
//   if (overlays)  for (const overlay of overlays) { overlay.classList.remove('highlight') }
//   overlays = document.querySelectorAll("[id=" + e.target.id + "]");
//   for (const overlay of overlays) { overlay.classList.add('highlight') }
//   if (!hex) { alert('Please choose color first')}
//   if (overlays ) for (const overlay of overlays) { overlay.style.fill = hex }
// }


colors = document.getElementsByClassName("color");
for (var i = 0; i < colors.length; i++) {
  colors[i].onclick = changeColor;
}

function changeColor(e) {
  if (hex) for (const color of colors) { color.classList.remove('checkmark') }
  hex = e.target.getAttribute("data-hex");
  e.target.classList.add('checkmark')
// //   if (overlays ) for (const overlay of overlays) { overlay.style.fill = hex }
}


function hoverProduct(e) {
    // if (overlays)  for (const overlay of overlays) { overlay.classList.remove('highlight') }
    // overlays = document.querySelectorAll("[id=" + e.target.id + "]");
    // for (const overlay of overlays) { overlay.classList.add('highlight') }
    e.target.classList.add('highlight')
}

function hexToRgb(color) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    color = color.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
}


// var c=document.getElementById("imagecanvas");
// var ctx=c.getContext("2d");
// var imageObj1 = new Image();
// var imageObj2 = new Image();
// imageObj1.src = "assets/1.jpg"
// imageObj1.onload = function() {
//    ctx.drawImage(imageObj1, 0, 0, 328, 526);
// };
  var canvas = document.getElementById("overlaycanvas");
  var maskCanvas = document.getElementById("mask-canvas");

  // Create new Image objects
  var image = new Image();
  image.src = "assets/1.jpg";
  var maskData = new Image();
  maskData.src = "assets/2.png";

  // Wait for the image and mask data to load
  image.onload = maskData.onload = function() {
    var ctx = canvas.getContext("2d");
    var maskCtx = maskCanvas.getContext("2d");

    // Set the canvas size to match the image
    canvas.width = image.width;
    canvas.height = image.height;
    maskCanvas.width = image.width;
    maskCanvas.height = image.height;
    maskCtx.globalAlpha = 0.1;
    // Draw the mask data on the mask canvas
    maskCtx.drawImage(maskData, 0, 0);

    // Set the composite operation of the main canvas to "source-in"
    maskCtx.globalCompositeOperation = "source-in";

    // Draw the mask canvas on top of the main canvas
    ctx.drawImage(maskCanvas, 0, 0);
    ctx.drawImage(image, 0, 0);
}

var isLighter = false;
var isCliked = false;


maskCanvas.addEventListener("click", function(event) {
    var x = event.clientX;
    var y = event.clientY;
    var ctx = maskCanvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    var pixelData = imageData.data;
    var rgb = hexToRgb(hex);
    for (var i = 0; i < pixelData.length; i += 4) {
        if(pixelData[i+3] > 0) {
            pixelData[i] = rgb.r;
            pixelData[i+1] = rgb.g;
            pixelData[i+2] = rgb.b;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    isCliked = true;
});




maskCanvas.addEventListener("mousemove", function(event) {
    var x = event.clientX;
    var y = event.clientY;
    var ctx = maskCanvas.getContext("2d");
    var pixelData = ctx.getImageData(x, y, 1, 1).data;
    if(pixelData[3] > 0 && !isLighter) {
        for (let index = 0; index < 5; index++) {
            ctx.globalCompositeOperation = "lighter";
            ctx.drawImage(maskCanvas, 0, 0);
            ctx.drawImage(maskData, 0, 0); 
        }
        isLighter = true;
    }
    if(isLighter && pixelData[3] == 0 && !isCliked){
        ctx.globalCompositeOperation = "source-in";
        ctx.drawImage(maskData, 0, 0);
        isLighter = false;
    }
});
    
// maskCanvas.addEventListener("mouseout", function() {
// // Change the composite operation back to "source-in" when the mouse leaves the canvas
// var ctx = maskCanvas.getContext("2d");
// var pixelData = ctx.getImageData(x, y, 1, 1).data;
// if(pixelData[3] == 0) {
//     ctx.globalCompositeOperation = "source-in";
//     ctx.drawImage(maskData, 0, 0);
// }
//     isLighter = false;
// });
// var c1=document.getElementById("overlaycanvas");
// var ctx1=c1.getContext("2d");
// var imageObj2 = new Image();
// imageObj2.src = "assets/2.png"
// imageObj2.onload = function() {
// ctx1.strokeStyle = 'yellow'
// ctx1.lineWidth = 5;
// ctx1.strokeRect(0, 0, 328, 526);
//         //Here magic happend 
// ctx1.globalCompositeOperation = "destination-in";
// ctx1.drawImage(imageObj2, 0, 0, 328, 526);

// };

// c1.addEventListener("mousemove", function(event){
//     var x = event.clientX;
//     var y = event.clientY;
//     var pixelData = ctx1.getImageData(x, y, 1, 1).data;
//     if(pixelData[3] > 0) {
//     for (var i = 0; i <= 328; i += 50){
//       for (var j = 0; j < 526; j += 50) {
//         ctx1 .beginPath();
//         ctx1.lineWidth = 5;
//         ctx1.strokColor = 'black'
//         ctx1.strokeRect(0, 0, 328, 526);
//       }
//     } 
// }// end draw
// });

// function highlightimage() {
//     ctx1.lineWidth = 20;
//     ctx1.strokColor = 'black'
//     ctx1.strokeRect(0, 0,328, 526);
// }







// const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d")
// const inputs = document.querySelectorAll("input");
// const xOffset = 30, yOffset = 10, width = canvas.width-60, height = canvas.height-20;

// var inputValues = {stroke:"#8db5c2",fill:"white",text:"Text",image:"https://i.stack.imgur.com/8eLMW.png",imageColor:"grey"}

// inputs.forEach(input => {
//   input.addEventListener("input", function() {
//     if(this.id === "image") {
//       if (!input.files || !input.files[0]) return;
//       const FR = new FileReader();
//       FR.onloadend = (evt) => {
//           inputValues = {...inputValues,[this.id]:FR.result};
//           DrawBadge(inputValues)
//       };
//       FR.readAsDataURL(input.files[0]);
//     } else {
//       inputValues = {...inputValues,[this.id]:this.value};
//       DrawBadge(inputValues)
//     }
//   })
// })

// DrawBadge(inputValues)

// function DrawBadge ({stroke, fill, text, image ,imageColor}) {
//   //Draw Badge
//   ctx.strokeStyle = stroke;
//   ctx.lineWidth = 15;
//   ctx.fillStyle = fill;
//   roundRect(ctx, xOffset, yOffset, width, height, {
//     tl: 1,
//     tr: 1,
//     bl: width/2,
//     br: width/2,
//   });
//   //Draw Text
//   ctx.font = "20px Arial";
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.fillStyle = "black";
//   ctx.fillText(text,width/2+xOffset,height*0.8);
//   //Draw Image
//   const firstImage = new Image();
//   const insideWidth = 80, insideHeight = 80;
//   firstImage.src = image;
//   // Because of the CORS issue just show image as it is
//   if(image === "https://i.stack.imgur.com/8eLMW.png") {
//     firstImage.onload = () => {
//       ctx.drawImage(firstImage, (width/2)-(insideWidth/2)+xOffset,height*0.2,insideWidth , insideHeight);
//     }
//   // you should use this function for changing image color
//   } else {
//     debugger
//     firstImage.onload = () => {
//         debugger
//       //Make new canvas for image
//       const imageCtx = document.createElement("canvas").getContext("2d");
//       const insideImage = new Image();
//       imageCtx.canvas.width = insideWidth;
//       imageCtx.canvas.height = insideHeight;
//       imageCtx.save();
//       imageCtx.fillStyle = imageColor;
//       imageCtx.fillRect(0, 0, insideWidth, insideHeight);
//       //Here magic happend 
//       imageCtx.globalCompositeOperation = "destination-in";
//       imageCtx.drawImage(firstImage,0,0,insideWidth,insideHeight);
//       //Then export our canvas to png image
//       insideImage.src = imageCtx.canvas.toDataURL("image/png");
//       insideImage.onload = () => {
//           ctx.drawImage(insideImage,(width/2)-(insideWidth/2)+xOffset,height*0.2,insideWidth,insideHeight);
//       }
//     }
//   }
// }

// function roundRect(ctx, x, y, width, height, radius, fill, stroke){
//   ctx.beginPath();
//   ctx.moveTo(x + radius.tl, y);
//   ctx.lineTo(x + width - radius.tr, y);
//   ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
//   ctx.lineTo(x + width, y + height - radius.br);
//   ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
//   ctx.lineTo(x + radius.bl, y + height);
//   ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
//   ctx.lineTo(x, y + radius.tl);
//   ctx.quadraticCurveTo(x, y, x + radius.tl, y);
//   ctx.closePath();
//   ctx.fill();
//   ctx.stroke();
// }
