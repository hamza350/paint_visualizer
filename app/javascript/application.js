// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// Two values one the folder name and the second is number of images 

import "@hotwired/turbo-rails"
import "controllers"
 
window.buildCanvas = function (id) {

  var canvas = document.getElementById("overlaycanvas");
  var ctx = canvas.getContext("2d");
  let hex;
  let colors=[];
  let prevColor = {};
  let imagesCount;


  if(id == 'One'){
    imagesCount = 9;
  }else if(id == 'Two'){
    imagesCount = 2;
  }

  var image = new Image();
  image.src = 'assets/' + id + '/main.png';
  image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
  }

  for (var i=0; i < imagesCount; i++){
      console.log(id)
      window['image'+i] = new Image();
      eval("image" + i + '.src = ' + `'assets/${id}/` + i + ".png';")
      window['offscreenCanvas' + i] = new OffscreenCanvas(window['image'+i].width, window['image'+i].height);
      window['offscreenContext' + i] = window['offscreenCanvas' + i].getContext("2d");
  }

  function changeColor(e) {
      if (hex) for (const color of colors) { color.classList.remove('checkmark') }
      hex = e.target.getAttribute("data-hex");
      e.target.classList.add('checkmark')
    // //   if (overlays ) for (const overlay of overlays) { overlay.style.fill = hex }
  }

  colors = document.getElementsByClassName("color");
  for (var i = 0; i < colors.length; i++) {
    colors[i].onclick = changeColor;
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

  canvas.addEventListener("mousemove", function(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    var pixelData = ctx.getImageData(x, y, 1, 1).data;
    var [r, g, b, a] = pixelData;
    var check_present = true;

    for (var i=0; i < imagesCount; i++){
      window['pixelData'+i] = window['offscreenContext' + i].getImageData(x, y, 1, 1).data;
      window['offscreenContext' + i].drawImage(window['image'+i], 0, 0);
      if (window['pixelData'+i][3] == 255){
          if (prevColor['image'+i] === undefined){
              ctx.globalCompositeOperation = "source-over";
              ctx.drawImage(window['image'+i], 0, 0);
          }
          else{
              var prevColorPixel = prevColor['image'+i]['pixel'];
              for (var i = 0; i < prevColorPixel.length; i += 4) {
                  ctx.fillStyle = 'blue';
                  ctx.fillRect(prevColorPixel[i]['x'], prevColorPixel[i]['y'], 1, 1);
              }
          }
          check_present = false;
          break;
      }
    }

    if (check_present){
      ctx.drawImage(image, 0, 0);
      fillColorCanvas()
    }
  });

  canvas.addEventListener("click", function(event) {
      console.log("hamza")
      var x = event.clientX - canvas.offsetLeft;
      var y = event.clientY - canvas.offsetTop;
      var pixelData = ctx.getImageData(x, y, 1, 1).data;
      var [r, g, b, a] = pixelData;
      var check_present = true;
    
      for (var i=0; i < imagesCount; i++){
        var currentCanvas = 'offscreenCanvas' + i
        var contextCanvas = 'offscreenContext' + i
        var pixelData = 'pixelData' + i
        window[pixelData] = window[contextCanvas].getImageData(x, y, 1, 1).data;
        window[contextCanvas].drawImage(window['image'+i], 0, 0);

        if (window[pixelData][3] == 255){
            check_present = false;
            var imageData = window[contextCanvas].getImageData(0, 0, window[currentCanvas].width, window[currentCanvas].height);
            var data = imageData.data;
            ctx.drawImage(image, 0, 0);
            console.log(hex)
            if(!hex) alert('please select color first')
            var rgb = hexToRgb(hex);
            var blackPixels = [];
            for (let y = 0; y < window[currentCanvas].height; y++) {
              for (let x = 0; x < window[currentCanvas].width; x++) {
                const index = (y * window[currentCanvas].width + x) * 4;
                if (data[index + 3] === 255) {
                  blackPixels.push({ x, y });
                }
              }
            }
            var imageName = "image" + i;
            if (prevColor[imageName] === undefined){
              prevColor[imageName] = {pixel: blackPixels, color: hex}
            }
            else
            {
              prevColor[imageName]['color'] = hex;
            }
            fillColorCanvas()
            break;
        }
      }
    
      if (check_present){
        ctx.drawImage(image, 0, 0);
      }
  });

  function fillColorCanvas(){
      Object.keys(prevColor).forEach(function (key) {
          var prevColorPixel = prevColor[key]['pixel'];
          for (var i = 0; i < prevColorPixel.length; i += 4) {
              ctx.fillStyle = prevColor[key]['color'];
              ctx.fillRect(prevColorPixel[i]['x'], prevColorPixel[i]['y'], 4, 4);
          }
      })
  } 

}


// const image1 = new Image();
// image1.src = "assets/paint/main.png";
// const canvas = document.getElementById("overlaycanvas");
// const context = canvas.getContext("2d");

// // Set the canvas size to match the image
// canvas.width = image1.width;
// canvas.height = image1.height;

// // Set the composite operation of the main canvas to "source-in"
// context.drawImage(image1, 0, 0);

// canvas.addEventListener("click", (event) => {
//   const x = event.clientX - canvas.offsetLeft;
//   const y = event.clientY - canvas.offsetTop;
//   const pixelData = context.getImageData(x, y, 1, 1).data;
//   const [r, g, b, a] = pixelData;

//   console.log(`The color at (${x}, ${y}) is RGB(${r}, ${g}, ${b}) with opacity ${a}`);
//   const image = new Image();
//   image.src = "assets/paint/1.png";

//   image.onload = function() {
//   const offscreenCanvas = new OffscreenCanvas(image.width, image.height);
//   const offscreenContext = offscreenCanvas.getContext("2d");

//   offscreenContext.drawImage(image, 0, 0);
//   //   const pixelData = offscreenContext.getImageData(x, y, 1, 1).data;
//   const [r, g, b, a] = pixelData;

//   console.log(`The color at (${x}, ${y}) is RGB(${r}, ${g}, ${b}) with opacity ${a}`);
//   };
// });

// const canvas1 = document.getElementById("overlaycanvas");
// const context1 = canvas1.getContext("2d");
// const imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
// const data = imageData.data;

// const blackPixels = [];
// for (let y = 0; y < canvas1.height; y++) {
//   for (let x = 0; x < canvas1.width; x++) {
//     const index = (y * canvas1.width + x) * 4;
//     if (data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0) {
//       blackPixels.push({ x, y });
//     }
//   }
// }

// console.log(blackPixels);


// let overlays= [];






//   var canvas2 = document.getElementById("overlaycanvas");
//   maskCanvas.style.cursor = 'grab';  
//   // Create new Image objects
//   var image = new Image();
//   image.src = "assets/1.jpg";

//   // Wait for the image and mask data to load
//   image.onload = function() {
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
