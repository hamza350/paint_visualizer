// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"


// let overlays= [];
// let hex;
// let colors=[];
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


// colors = document.getElementsByClassName("color");
// for (var i = 0; i < colors.length; i++) {
//   colors[i].onclick = changeColor;
// }

// function changeColor(e) {
//   if (hex) for (const color of colors) { color.classList.remove('checkmark') }
//   hex = e.target.getAttribute("data-hex");
//   e.target.classList.add('checkmark')
// //   if (overlays ) for (const overlay of overlays) { overlay.style.fill = hex }
// }


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


var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
const xOffset = 30, yOffset = 10, width = 270, height = 0;
var imageObj1 = new Image();
var imageObj2 = new Image();
imageObj1.src = "assets/1.jpg"
imageObj1.onload = function() {
   ctx.drawImage(imageObj1, 0, 0, 328, 526);
   imageObj2.src = "assets/2.png";


   imageObj2.onload = () => {
    //Make new canvas for image
        const imageCtx = document.createElement("canvas").getContext("2d");
        const insideImage = new Image();
        imageCtx.canvas.width = 328;
        imageCtx.canvas.height = 526;
        imageCtx.save();
        imageCtx.fillStyle = 'yellow';
        imageCtx.fillRect(0, 0, 328, 526);
        //Here magic happend 
        imageCtx.globalCompositeOperation = "destination-in";
        imageCtx.drawImage(imageObj2,0,0,328,526);
        // Then export our canvas to png image
        insideImage.src = imageCtx.canvas.toDataURL("image/png");
        insideImage.onload = () => {
            ctx.drawImage(insideImage,(width/2)-(328/2)+xOffset,height*0.2,328,526);
        }
        //add event listener we need
        imageCtx.canvas.addEventListener('mousemove', move, false);
    }
//    imageObj2.onload = function(e) {
//     ctx.drawImage(imageObj2, 0, 0, 328, 526);
//     var imageData = ctx.getImageData(0,0,328,526);

//     var data = imageData.data;

//     // convert image to grayscale
//     var rgbColor = hexToRgb('#FFFF00');

//     for(var p = 0, len = data.length; p < len; p+=4) {
//         data[p + 0] = rgbColor.r;
//         data[p + 1] = rgbColor.g;
//         data[p + 2] = rgbColor.b;
//     }
//     ctx.putImageData(imageData, 0, 0);
//    }
};

function move(e) {
    var pos = getMousePos(canvas, e);
    ctx.drawImage(img, -pos.x, -pos.y, img.width, img.height);
}






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
