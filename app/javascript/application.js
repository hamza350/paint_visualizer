// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"


// let overlays= [];
let hex;
let colors=[];



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

var canvas = document.getElementById("overlaycanvas");
var ctx = canvas.getContext("2d");


// Create new Image objects
var image = new Image();
image.src = "assets/paint/main.png";


const image1 = new Image();
image1.src = "assets/paint/1.png";


var image2 = new Image();
image2.src = "assets/paint/2.png";

const image3 = new Image();
image3.src = "assets/paint/3.png";


var image4 = new Image();
image4.src = "assets/paint/4.png";

const image5 = new Image();
image5.src = "assets/paint/5.png";


var image6 = new Image();
image6.src = "assets/paint/6.png";


// Wait for the image and mask data to load
image.onload = function() {
// Set the canvas size to match the image
canvas.width = image.width;
canvas.height = image.height;

// Set the composite operation of the main canvas to "source-in"
ctx.drawImage(image, 0, 0);
}

var offscreenCanvas1 = new OffscreenCanvas(image1.width, image1.height);
var offscreenContext1 = offscreenCanvas1.getContext("2d");

offscreenContext1.drawImage(image1, 0, 0);

var offscreenCanvas2 = new OffscreenCanvas(image2.width, image2.height);

var offscreenContext2 = offscreenCanvas2.getContext("2d");

offscreenContext2.drawImage(image2, 0, 0);


var offscreenCanvas3 = new OffscreenCanvas(image3.width, image3.height);
  var offscreenContext3 = offscreenCanvas3.getContext("2d");

  offscreenContext3.drawImage(image3, 0, 0);

  var offscreenCanvas4 = new OffscreenCanvas(image4.width, image4.height);

  var offscreenContext4 = offscreenCanvas4.getContext("2d");

  offscreenContext4.drawImage(image4, 0, 0);

  var offscreenCanvas5 = new OffscreenCanvas(image5.width, image5.height);
  var offscreenContext5 = offscreenCanvas5.getContext("2d");

  offscreenContext5.drawImage(image5, 0, 0);


  var offscreenCanvas6 = new OffscreenCanvas(image6.width, image6.height);

  var offscreenContext6 = offscreenCanvas6.getContext("2d");

  offscreenContext6.drawImage(image6, 0, 0);


canvas.addEventListener("mousemove", function(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
//   var pixelData = ctx.getImageData(x, y, 1, 1).data;
//   var [r, g, b, a] = pixelData;
 
  var pixelData = offscreenContext1.getImageData(x, y, 1, 1).data;
  var [r1, g1, b1, a1] = pixelData;

//   console.log(`The color at (${x}, ${y}) is RGB(${r}, ${g}, ${b}) with opacity ${a}`);
  
  var pixelData = offscreenContext2.getImageData(x, y, 1, 1).data;
  var [r2, g2, b2, a2] = pixelData;

  // 3 and 4 images 

 
  var pixelData = offscreenContext3.getImageData(x, y, 1, 1).data;
  var [r3, g3, b3, a3] = pixelData;

//   console.log(`The color at (${x}, ${y}) is RGB(${r}, ${g}, ${b}) with opacity ${a}`);
  
  var pixelData = offscreenContext4.getImageData(x, y, 1, 1).data;
  var [r4, g4, b4, a4] = pixelData;


  // 5 and 6 images

 
  var pixelData = offscreenContext5.getImageData(x, y, 1, 1).data;
  var [r5, g5, b5, a5] = pixelData;

//   console.log(`The color at (${x}, ${y}) is RGB(${r}, ${g}, ${b}) with opacity ${a}`);
 
  var pixelData = offscreenContext6.getImageData(x, y, 1, 1).data;
  var [r6, g6, b6, a6] = pixelData;



  if (a1 == 255){
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // Draw the mask canvas on top of the main canvas
    ctx.drawImage(image1, 0, 0);
  }

  else if (a2 == 255){
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // Draw the mask canvas on top of the main canvas
    ctx.drawImage(image2, 0, 0);
  }

  else if (a3 == 255){
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // Draw the mask canvas on top of the main canvas
    ctx.drawImage(image3, 0, 0);
  }

  else if (a4 == 255){
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // Draw the mask canvas on top of the main canvas
    ctx.drawImage(image4, 0, 0);
  }

  else if (a5 == 255){
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // Draw the mask canvas on top of the main canvas
    ctx.drawImage(image5, 0, 0);
  }

  else if (a6 == 255){
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // Draw the mask canvas on top of the main canvas
    ctx.drawImage(image6, 0, 0);
  }

  else {
    ctx.drawImage(image, 0, 0);
  }
});

canvas.addEventListener("click", function(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
  //   var pixelData = ctx.getImageData(x, y, 1, 1).data;
  //   var [r, g, b, a] = pixelData;
   
    var pixelData = offscreenContext1.getImageData(x, y, 1, 1).data;
    var [r1, g1, b1, a1] = pixelData;
  
  //   console.log(`The color at (${x}, ${y}) is RGB(${r}, ${g}, ${b}) with opacity ${a}`);
    
    var pixelData = offscreenContext2.getImageData(x, y, 1, 1).data;
    var [r2, g2, b2, a2] = pixelData;
  
    // 3 and 4 images 
  
   
    var pixelData = offscreenContext3.getImageData(x, y, 1, 1).data;
    var [r3, g3, b3, a3] = pixelData;
  
  //   console.log(`The color at (${x}, ${y}) is RGB(${r}, ${g}, ${b}) with opacity ${a}`);
    
    var pixelData = offscreenContext4.getImageData(x, y, 1, 1).data;
    var [r4, g4, b4, a4] = pixelData;
  
  
    // 5 and 6 images
  
   
    var pixelData = offscreenContext5.getImageData(x, y, 1, 1).data;
    var [r5, g5, b5, a5] = pixelData;
  
  //   console.log(`The color at (${x}, ${y}) is RGB(${r}, ${g}, ${b}) with opacity ${a}`);
   
    var pixelData = offscreenContext6.getImageData(x, y, 1, 1).data;
    var [r6, g6, b6, a6] = pixelData;
  
  
  
    if (a1 == 255){
        debugger
      var imageData = offscreenContext1.getImageData(0, 0, image1.width, image1.height);
      var pixels = imageData.data;
      if(!hex) alert('please select color first')
      var rgb = hexToRgb(hex);

        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i] = rgb.r; //red
            pixels[i + 1] = rgb.g; //green
            pixels[i + 2] = rgb.b; //blue
        }
        offscreenContext1.putImageData(imageData, 0, 0);
    }
  
    else if (a2 == 255){
      
    }
  
    else if (a3 == 255){
     
    }
  
    else if (a4 == 255){
      
    }
  
    else if (a5 == 255){
  
    }
  
    else if (a6 == 255){
     
    }
  
    else {
    }
    // Check if the pixel at the click coordinates is part of the first image
        // Get the image data of the entire canvas

});


//   var canvas = document.getElementById("overlaycanvas");
//   var maskCanvas = document.getElementById("mask-canvas");
//   maskCanvas.style.cursor = 'grab';  
//   // Create new Image objects
//   var image = new Image();
//   image.src = "assets/1.jpg";
//   var maskData = new Image();
//   maskData.src = "assets/2.png";
//   var maskData1 = new Image();
//   maskData1.src = "assets/3.png";

//   // Wait for the image and mask data to load
//   image.onload = maskData.onload = maskData1.onload = function() {
//     var ctx = canvas.getContext("2d");
//     var maskCtx = maskCanvas.getContext("2d");

//     // Set the canvas size to match the image
//     canvas.width = image.width;
//     canvas.height = image.height;
//     maskCanvas.width = image.width;
//     maskCanvas.height = image.height;
//     maskCtx.globalAlpha = 0.1;
//     // // Draw the mask data on the mask canvas
//     maskCtx.drawImage(maskData, 0, 0);

//     maskCtx.globalAlpha = 0.2;
//     maskCtx.drawImage(maskData1, 0, 0);

//     // Set the composite operation of the main canvas to "source-in"
//     maskCtx.globalCompositeOperation = "source-over";
//     ctx.drawImage(image, 0, 0);
// }

// var isFirstLighter = false;
// var isSecondLighter = false;
// var isFirstCliked = false;
// var isSecondCliked = false;
// var isSecondColored = false
// var isFirstColored = false
// var firstImageColor;
// var secondImageColor;
// let prevColor = {r: 1, g: 3, b: 0};


// function colorImages(pixels, rgb , firstImageColor, secondImageColor, isFirstCliked, isSecondCliked) {
//     for (var i = 0; i < pixels.length; i += 4) {
       

//         if((pixels[i + 3] === 179) && !firstImageColor && !isSecondCliked) {
    
//             pixels[i] = rgb.r; //red
//             pixels[i + 1] = rgb.g; //green
//             pixels[i + 2] = rgb.b; //blue
//             isFirstCliked = true;
//         }

//         if((pixels[i + 3] === 179) && firstImageColor) {
    
//             pixels[i] = firstImageColor.r; //red
//             pixels[i + 1] = firstImageColor.g; //green
//             pixels[i + 2] = firstImageColor.b; //blue
//         }

//         if((pixels[i + 3] === 153) && !secondImageColor && !isFirstCliked) {
    
//             pixels[i] = rgb.r; //red
//             pixels[i + 1] = rgb.g; //green
//             pixels[i + 2] = rgb.b; //blue
//             isSecondCliked = true;
//         }

//         if((pixels[i + 3] === 153) && secondImageColor) {
    
//             pixels[i] = secondImageColor.r; //red
//             pixels[i + 1] = secondImageColor.g; //green
//             pixels[i + 2] = secondImageColor.b; //blue
//         }
//     // }
//     } 
// }


// maskCanvas.addEventListener("click", function(event) {
//     var x = event.clientX;
//     var y = event.clientY;
//     var ctx = maskCanvas.getContext("2d");
//     var pixelData = ctx.getImageData(x, y, 1, 1).data;
//     // Check if the pixel at the click coordinates is part of the first image
//         // Get the image data of the entire canvas
//     var imageData = ctx.getImageData(0, 0, maskData.width, maskData1.height);
//     var pixels = imageData.data;
//     if(!hex) alert('please select color first')
//     var rgb = hexToRgb(hex);


//     if(firstImageColor && (firstImageColor.r == pixelData[0] || firstImageColor.r == pixelData[0] + 1 || firstImageColor.r == pixelData[0] - 1)  && 
//     (firstImageColor.g == pixelData[1] || firstImageColor.g == pixelData[1] - 1 || firstImageColor.g == pixelData[1] + 1) && (firstImageColor.b == pixelData[2] || firstImageColor.b == pixelData[2] - 1 ||
//         firstImageColor.b == pixelData[2] + 1) && pixelData[3] == 179 ){
//         firstImageColor.r = rgb.r;
//         firstImageColor.g = rgb.g;
//         firstImageColor.b = rgb.b;
//     }

//     if(secondImageColor && (secondImageColor.r == pixelData[0] || secondImageColor.r == pixelData[0] + 1 || secondImageColor.r == pixelData[0] - 1)  && 
//     (secondImageColor.g == pixelData[1] || secondImageColor.g == pixelData[1] - 1 || secondImageColor.g == pixelData[1] + 1) && (secondImageColor.b == pixelData[2] || secondImageColor.b == pixelData[2] - 1 ||
//         secondImageColor.b == pixelData[2] + 1) && pixelData[3] == 153 ){
//         secondImageColor.r = rgb.r;
//         secondImageColor.g = rgb.g;
//         secondImageColor.b = rgb.b;
//     }

//     for (var i = 0; i < pixels.length; i += 4) {
//             if((pixels[i + 3] === 179) && !firstImageColor && !isSecondCliked) {
        
//                 pixels[i] = rgb.r; //red
//                 pixels[i + 1] = rgb.g; //green
//                 pixels[i + 2] = rgb.b; //blue
//                 isFirstCliked = true;
//             }

//             if((pixels[i + 3] === 179) && firstImageColor) {
        
//                 pixels[i] = firstImageColor.r; //red
//                 pixels[i + 1] = firstImageColor.g; //green
//                 pixels[i + 2] = firstImageColor.b; //blue
//             }

//             if((pixels[i + 3] === 153) && !secondImageColor && !isFirstCliked) {
//                 pixels[i] = rgb.r; //red
//                 pixels[i + 1] = rgb.g; //green
//                 pixels[i + 2] = rgb.b; //blue
//                 isSecondCliked = true;
//             }

//             if((pixels[i + 3] === 153) && secondImageColor) {
        
//                 pixels[i] = secondImageColor.r; //red
//                 pixels[i + 1] = secondImageColor.g; //green
//                 pixels[i + 2] = secondImageColor.b; //blue
//             }
//     }
    
//     if(isSecondCliked) secondImageColor = {r: rgb.r, g: rgb.g, b: rgb.b};
//     if(isFirstCliked) firstImageColor = {r: rgb.r, g: rgb.g, b: rgb.b};
//     isFirstCliked = false;
//     isSecondCliked = false;
//     prevColor = rgb;
//     ctx.putImageData(imageData, 0, 0);
// });

// window.imagesHighlighted = [];

// maskCanvas.addEventListener("mousemove", function(event) {
//     var x = event.clientX;
//     var y = event.clientY;
//     var ctx = maskCanvas.getContext("2d");
//     var mainCtx = canvas.getContext("2d");
//     var pixelData = ctx.getImageData(x, y, 1, 1).data;
    
//     if((pixelData[3] == 26 || pixelData[3] == 179)) {
//         var ctx = canvas.getContext("2d");
//         var maskCtx = maskCanvas.getContext("2d");
//         // if(!secondImageColor){
//             // Set the canvas size to match the image
//             canvas.width = image.width;
//             canvas.height = image.height;
//             maskCanvas.width = image.width;
//             maskCanvas.height = image.height;
//             maskCtx.globalAlpha = 0.1;
//             // Draw the mask data on the mask canvas
//             maskCtx.drawImage(maskData, 0, 0);
//             maskCtx.globalAlpha = 0.2;
//             maskCtx.drawImage(maskData1, 0, 0);
        
//             // Set the composite operation of the main canvas to "source-in"
//             maskCtx.globalCompositeOperation = "source-in";
        
//             // Draw the mask canvas on top of the main canvas
//             ctx.drawImage(maskCanvas, 0, 0);
//             ctx.drawImage(image, 0, 0);

//         // }

//         for (let index = 0; index < 3; index++) {
//             maskCtx.globalCompositeOperation = "lighter";
//             maskCtx.fillStyle = "red";
//             maskCtx.drawImage(maskData, 0, 0); 
//         }

//         if(secondImageColor){
//             for (let index = 0; index < 2; index++) {
//                 maskCtx.globalCompositeOperation = "lighter";
//                 maskCtx.drawImage(maskData1, 0, 0); 
//             }
        
//             var imageData = maskCtx.getImageData(0, 0, maskData1.width, maskData1.height);
//             var pixels = imageData.data;
        
//             for (var i = 0; i < pixels.length; i += 4) {
//                 if((pixels[i + 3] === 153)) {
            
//                     pixels[i] = secondImageColor.r; //red
//                     pixels[i + 1] = secondImageColor.g; //green
//                     pixels[i + 2] = secondImageColor.b; //blue
//                 }
//             }
//             maskCtx.putImageData(imageData, 0, 0);
//         }
//         isFirstLighter = true;
//         isSecondLighter = false;
//     }

//     if((pixelData[3] == 51 || pixelData[3] == 153)) {
//         var ctx = canvas.getContext("2d");
//         var maskCtx = maskCanvas.getContext("2d");
//         // if(!firstImageColor){
//         // Set the canvas size to match the image
//             canvas.width = image.width;
//             canvas.height = image.height;
//             maskCanvas.width = image.width;
//             maskCanvas.height = image.height;
//             maskCtx.globalAlpha = 0.1;
//             // Draw the mask data on the mask canvas
//             maskCtx.drawImage(maskData, 0, 0);
//             maskCtx.globalAlpha = 0.2;
//             maskCtx.drawImage(maskData1, 0, 0);
        
//             // Set the composite operation of the main canvas to "source-in"
//             maskCtx.globalCompositeOperation = "source-in";
        
//             // Draw the mask canvas on top of the main canvas
//             ctx.drawImage(maskCanvas, 0, 0);
//             ctx.drawImage(image, 0, 0);
//         // }

       
//         for (let index = 0; index < 2; index++) {
//             maskCtx.globalCompositeOperation = "lighter";
//             maskCtx.drawImage(maskData1, 0, 0); 
//         }

//         if(firstImageColor){
//             for (let index = 0; index < 3; index++) {
//                 maskCtx.globalCompositeOperation = "lighter";
//                 maskCtx.drawImage(maskData, 0, 0); 
//             }
        
//             var imageData = maskCtx.getImageData(0, 0, maskData.width, maskData.height);
//             var pixels = imageData.data;
        
//             for (var i = 0; i < pixels.length; i += 4) {
//                 if((pixels[i + 3] === 179)) {
//                     pixels[i] = firstImageColor.r; //red
//                     pixels[i + 1] = firstImageColor.g; //green
//                     pixels[i + 2] = firstImageColor.b; //blue
//                 }
//             }
//             maskCtx.putImageData(imageData, 0, 0);
//         }

//         isSecondLighter = true;
//         isFirstLighter = false;
//     }


//     // when mouse is not on image 1 or image 2 
//     if(pixelData[3] == 0){
//         if(!firstImageColor && !secondImageColor){
//             var ctx = canvas.getContext("2d");
//             var maskCtx = maskCanvas.getContext("2d");
        
//             // Set the canvas size to match the image
//             canvas.width = image.width;
//             canvas.height = image.height;
//             maskCanvas.width = image.width;
//             maskCanvas.height = image.height;
//             maskCtx.globalAlpha = 0.1;
//             // Draw the mask data on the mask canvas
//             maskCtx.drawImage(maskData, 0, 0);
//             maskCtx.globalAlpha = 0.2;
//             maskCtx.drawImage(maskData1, 0, 0);
        
//             // Set the composite operation of the main canvas to "source-in"
//             maskCtx.globalCompositeOperation = "source-in";
        
//             // Draw the mask canvas on top of the main canvas
//             ctx.drawImage(maskCanvas, 0, 0);
//             ctx.drawImage(image, 0, 0);
//             isFirstLighter = false;
//             isSecondLighter = false;
//         }

//         if (firstImageColor || secondImageColor){
//             var ctx = canvas.getContext("2d");
//             var maskCtx = maskCanvas.getContext("2d");
        
//             // Set the canvas size to match the image
//             canvas.width = image.width;
//             canvas.height = image.height;
//             maskCanvas.width = image.width;
//             maskCanvas.height = image.height;
//             maskCtx.globalAlpha = 0.1;
//             // // Draw the mask data on the mask canvas
//             maskCtx.drawImage(maskData, 0, 0);
//             maskCtx.globalAlpha = 0.2;
//             maskCtx.drawImage(maskData1, 0, 0);
        
//             // Set the composite operation of the main canvas to "source-in"
//             maskCtx.globalCompositeOperation = "source-over";
//             ctx.drawImage(image, 0, 0);
//         }
        
//         // color again the image two if color exists
//         if(secondImageColor){            
//             for (let index = 0; index < 2; index++) {
//                 maskCtx.globalCompositeOperation = "lighter";
//                 maskCtx.drawImage(maskData1, 0, 0); 
//             }
        
//             var imageData = maskCtx.getImageData(0, 0, maskData1.width, maskData1.height);
//             var pixels = imageData.data;
            
//             for (var i = 0; i < pixels.length; i += 4) {
//                 if((pixels[i + 3] === 153)) {
//                     pixels[i] = secondImageColor.r; //red
//                     pixels[i + 1] = secondImageColor.g; //green
//                     pixels[i + 2] = secondImageColor.b; //blue
//                 }
//             }
//             maskCtx.putImageData(imageData, 0, 0);
//         }

//         if(firstImageColor){
//             for (let index = 0; index < 3; index++) {
//                 maskCtx.globalCompositeOperation = "lighter";
//                 maskCtx.drawImage(maskData, 0, 0); 
//             }
        
//             var imageData = maskCtx.getImageData(0, 0, maskData.width, maskData.height);
//             var pixels = imageData.data;
        
//             for (var i = 0; i < pixels.length; i += 4) {
//                 if((pixels[i + 3] === 179)) {
            
//                     pixels[i] = firstImageColor.r; //red
//                     pixels[i + 1] = firstImageColor.g; //green
//                     pixels[i + 2] = firstImageColor.b; //blue
//                 }
//             }
//             maskCtx.putImageData(imageData, 0, 0);
//         }
//     }
// });
    
// maskCanvas.addEventListener("mouseout", function() {
// // Change the composite operation back to "source-in" when the mouse leaves the canvas
//     if(!firstImageColor && !secondImageColor){
//         var ctx = canvas.getContext("2d");
//         var maskCtx = maskCanvas.getContext("2d");
//         canvas.width = image.width;
//         canvas.height = image.height;
//         maskCanvas.width = image.width;
//         maskCanvas.height = image.height;
//         maskCtx.globalAlpha = 0.1;
//         // Draw the mask data on the mask canvas
//         maskCtx.drawImage(maskData, 0, 0);
//         maskCtx.globalAlpha = 0.2;
//         maskCtx.drawImage(maskData1, 0, 0);

//         // Set the composite operation of the main canvas to "source-in"
//         maskCtx.globalCompositeOperation = "source-in";

//         // Draw the mask canvas on top of the main canvas
//         ctx.drawImage(maskCanvas, 0, 0);
//         ctx.drawImage(image, 0, 0);
//         isSecondLighter = false;
//         isFirstLighter = false;
//     }

//     if (firstImageColor || secondImageColor){
//         var ctx = canvas.getContext("2d");
//         var maskCtx = maskCanvas.getContext("2d");
    
//         // Set the canvas size to match the image
//         canvas.width = image.width;
//         canvas.height = image.height;
//         maskCanvas.width = image.width;
//         maskCanvas.height = image.height;
//         maskCtx.globalAlpha = 0.1;
//         // // Draw the mask data on the mask canvas
//         maskCtx.drawImage(maskData, 0, 0);
//         maskCtx.globalAlpha = 0.2;
//         maskCtx.drawImage(maskData1, 0, 0);
    
//         // Set the composite operation of the main canvas to "source-in"
//         maskCtx.globalCompositeOperation = "source-over";
//         ctx.drawImage(image, 0, 0);
//     }
    
//     // color again the image two if color exists
//     if(secondImageColor){            
//         for (let index = 0; index < 2; index++) {
//             maskCtx.globalCompositeOperation = "lighter";
//             maskCtx.drawImage(maskData1, 0, 0); 
//         }
    
//         var imageData = maskCtx.getImageData(0, 0, maskData1.width, maskData1.height);
//         var pixels = imageData.data;
        
//         for (var i = 0; i < pixels.length; i += 4) {
//             if((pixels[i + 3] === 153)) {
//                 pixels[i] = secondImageColor.r; //red
//                 pixels[i + 1] = secondImageColor.g; //green
//                 pixels[i + 2] = secondImageColor.b; //blue
//             }
//         }
//         maskCtx.putImageData(imageData, 0, 0);
//     }

//     if(firstImageColor){
//         for (let index = 0; index < 3; index++) {
//             maskCtx.globalCompositeOperation = "lighter";
//             maskCtx.drawImage(maskData, 0, 0); 
//         }
    
//         var imageData = maskCtx.getImageData(0, 0, maskData.width, maskData.height);
//         var pixels = imageData.data;
    
//         for (var i = 0; i < pixels.length; i += 4) {
//             if((pixels[i + 3] === 179)) {
        
//                 pixels[i] = firstImageColor.r; //red
//                 pixels[i + 1] = firstImageColor.g; //green
//                 pixels[i + 2] = firstImageColor.b; //blue
//             }
//         }
//         maskCtx.putImageData(imageData, 0, 0);
//     }
// });
