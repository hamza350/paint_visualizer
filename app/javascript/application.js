var backgroundImage = new Image();
backgroundImage.src = 'assets/1.jpg';


var img1 = new Image();
img1.src = 'assets/2.png'
var img2 = new Image(); 
img2.src = 'assets/3.png'


var images = [
    {id: 1, img: img1},
    {id: 2, img: img2}
];


var stage = new Konva.Stage({
    container: 'container',
    width: backgroundImage.naturalWidth,
    height:  backgroundImage.naturalHeight
});

var background = new Konva.Image({
    image: backgroundImage,
    width: backgroundImage.naturalWidth,
    height: backgroundImage.naturalHeight
});


var backgroundLayer = new Konva.Layer();
backgroundLayer.add(background);


stage.add(backgroundLayer);  
var foregroundLayer = new Konva.Layer();


images.forEach(function(image) {
    var konvaImg = new Konva.Image({
        image: image.img,
        x: image.x,
        y: image.y,
        id:image.id,
        width: image.img.width,
        height: image.img.height
    });
    var imageData = image.getImageData();
    var hsv = new Konva.Filters.HSV();
    hsv.apply(imageData);
    image.setImageData(imageData);
    foregroundLayer.add(konvaImg);
});

stage.add(foregroundLayer);

foregroundLayer.on('mouseover', function(evt) {
    var shape = evt.target;
    document.body.style.cursor = 'pointer';
  });
  
  foregroundLayer.on('mouseout', function() {
    document.body.style.cursor = 'default';
  });
  


foregroundLayer.on('click', function(evt) {
    var shape = evt.target;
    var filter = shape.filters()[0];
    filter.hue(filter.hue() + 30);
    foregroundLayer.draw();
    // you can change the color of the image here
});

stage.draw();



