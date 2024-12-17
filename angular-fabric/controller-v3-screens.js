function getActiveStyle(styleName, object) {
  object = object || canvas.getActiveObject();
  if (!object) return '';

  return (object.getSelectionStyles && object.isEditing)
    ? (object.getSelectionStyles()[styleName] || '')
    : (object[styleName] || '');
}

function setActiveStyle(styleName, value, object) {
  object = object || canvas.getActiveObject();
  if (!object) return;

  if (object.setSelectionStyles && object.isEditing) {
    var style = { };
    style[styleName] = value;
    object.setSelectionStyles(style);
    object.setCoords();
  }
  else {
    object[styleName] = value;
  }

  object.setCoords();
  canvas.renderAll();
}

function getActiveProp(name) {
  var object = canvas.getActiveObject();
  if (!object) return '';

  return object[name] || '';
}

function setActiveProp(name, value) {
  var object = canvas.getActiveObject();
  if (!object) return;

  object.set(name, value).setCoords();
  canvas.renderAll();
}


function addAccessors($scope) {

  $scope.getOpacity = function() {
    return getActiveStyle('opacity') * 100;
  };
  $scope.setOpacity = function(value) {
    setActiveStyle('opacity', parseInt(value, 10) / 100);
  };

  $scope.getFill = function() {
    return getActiveStyle('fill');
  };
  $scope.setFill = function(value) {
    setActiveStyle('fill', value);
  };

  $scope.isBold = function() {
    return getActiveStyle('fontFamily') === 'BrandonGrotesqueRegular';
  };
  $scope.toggleBold = function() {
    setActiveStyle('fontFamily',
      getActiveStyle('fontFamily') === 'BrandonGrotesqueRegular' ? 'BrandonGrotesqueLight' : 'BrandonGrotesqueRegular');
  };

//　Original font weight
//  $scope.isBold = function() {
//    return getActiveStyle('fontWeight') === 'bold';
//  };
//  $scope.toggleBold = function() {
//    setActiveStyle('fontWeight',
//      getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
//  };

	$scope.isItalic = function() {
    return getActiveStyle('fontStyle') === 'italic';
  };
  $scope.toggleItalic = function() {
    setActiveStyle('fontStyle',
      getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
  };

  $scope.isUnderline = function() {
    return getActiveStyle('textDecoration').indexOf('underline') > -1;
  };
  $scope.toggleUnderline = function() {
    var value = $scope.isUnderline()
      ? getActiveStyle('textDecoration').replace('underline', '')
      : (getActiveStyle('textDecoration') + ' underline');

    setActiveStyle('textDecoration', value);
  };

  $scope.isLinethrough = function() {
    return getActiveStyle('textDecoration').indexOf('line-through') > -1;
  };
  $scope.toggleLinethrough = function() {
    var value = $scope.isLinethrough()
      ? getActiveStyle('textDecoration').replace('line-through', '')
      : (getActiveStyle('textDecoration') + ' line-through');

    setActiveStyle('textDecoration', value);
  };
  $scope.isOverline = function() {
    return getActiveStyle('textDecoration').indexOf('overline') > -1;
  };
  $scope.toggleOverline = function() {
    var value = $scope.isOverline()
      ? getActiveStyle('textDecoration').replace('overlin', '')
      : (getActiveStyle('textDecoration') + ' overline');

    setActiveStyle('textDecoration', value);
  };

  $scope.getText = function() {
    return getActiveProp('text');
  };
  $scope.setText = function(value) {
    setActiveProp('text', value);
  };

  $scope.getTextAlign = function() {
    return capitalize(getActiveProp('textAlign'));
  };
  $scope.setTextAlign = function(value) {
    setActiveProp('textAlign', value.toLowerCase());
  };

  $scope.getFontFamilygetStrokeColor = function() {
    return getActiveProp('fontFamily').toLowerCase();
  };
  $scope.setFontFamily = function(value) {
    setActiveProp('fontFamily', value.toLowerCase());
  };

  $scope.getBgColor = function() {
    return getActiveProp('backgroundColor');
  };
  $scope.setBgColor = function(value) {
    setActiveProp('backgroundColor', value);
  };

  $scope.getTextBgColor = function() {
    return getActiveProp('textBackgroundColor');
  };
  $scope.setTextBgColor = function(value) {
    setActiveProp('textBackgroundColor', value);
  };

  $scope.getStrokeColor = function() {
    return getActiveStyle('stroke');
  };
  $scope.setStrokeColor = function(value) {
    setActiveStyle('stroke', value);
  };

  $scope.getStrokeWidth = function() {
    return getActiveStyle('strokeWidth');
  };
  $scope.setStrokeWidth = function(value) {
    setActiveStyle('strokeWidth', parseInt(value, 10));
  };

  $scope.getFontSize = function() {
    return getActiveStyle('fontSize');
  };
  $scope.setFontSize = function(value) {
    setActiveStyle('fontSize', parseInt(value, 10));
  };

  $scope.getLineHeight = function() {
    return getActiveStyle('lineHeight');
  };
  $scope.setLineHeight = function(value) {
    setActiveStyle('lineHeight', parseFloat(value, 10));
  };

  $scope.getBold = function() {
    return getActiveStyle('fontWeight');
  };
  $scope.setBold = function(value) {
    setActiveStyle('fontWeight', value ? 'bold' : '');
  };

  $scope.getCanvasBgColor = function() {
    return canvas.backgroundColor;
  };
  $scope.setCanvasBgColor = function(value) {
    canvas.backgroundColor = value;
    canvas.renderAll();
  };

 	
//start message
	var strings = "Select the layout type to start!";
	var welcome = new fabric.Text(strings, {
        fontFamily: 'Arial',
        left:canvas.getWidth() / 3.7,
        top: canvas.getHeight() / 2.5,
        fontSize: 23,
        fontWeight: '300',
        fill: '#ccc',
        selectable: true
        });
    canvas.add(welcome);
	removewelcome = welcome;

//GW arrows	
	fabric.Image.fromURL('images/arrow.png', function(arrowLeft) {
    arrowLeft.scale(1).set({
        top: 0,
        left: 0,
        //hasControls: false,
    });
	fabric.Image.fromURL('images/arrow.png', function(arrowRight) {
    arrowRight.scale(1).set({
        top: 0,
        left: 624,
		flipX: true,
        //hasControls: false,
	});	
	var arrows = new fabric.Group([arrowLeft, arrowRight],{ top: 72, left: 5, selectable: false });
	canvas.add(arrows).bringToFront();
	ctlarrows = arrows;
	});	
    });


//Layout controll Single type
  $scope.addLayout1 = function() {
    // clear canvas
    canvas.clear();
    // remove currently selected object
    //canvas.remove(canvas.getActiveObject());

    fabric.Image.fromURL('images/kp-bg01.png', function(bgimage) {
    bgimage.scale(1).set({
        top: 1,
        left: 1,
        selectable: false
    });
	canvas.add(bgimage);
	canvas.sendToBack(bgimage);
	ctrbg = bgimage;
    });

    fabric.Image.fromURL('images/KP_front.png', function(dimage) {
	dimage.scale(1).set({
        top: 5,
        left: 500,
        hasControls: false,
        transparentCorners: false,
        lockMovementY: true,
        selectable: false
    });
   	canvas.add(dimage); 
	});

    fabric.Image.fromURL('images/screen-US.png', function(screen) {
	removeimg = screen;
    screen.scale(1).set({
        top: 27,
        left: 517,
        hasControls: false,
        lockMovementY: true,
        lockMovementX: true,
    });
	canvas.add(screen);		
    // Group
	//var dgroup = new fabric.Group([dimage, screen],{ top: 5, left: 500 })
	//canvas.add(dgroup);
	//canvas.sendBackwards(dgroup);
    });
	  
	var copy = "The World's Best-Selling E-reader";	
    var copydefault = new fabric.Text(copy, {
      left: 60,
      top:  110,
      fontFamily: 'BrandonGrotesqueLight',
      fill: '#000',
	  fontSize: 23,
      fontWeight: '',
      originX: 'left',
	  hasControls: false,
	  editable: false
      //hasRotatingPoint: false,
      //centerTransform: false
    });
    canvas.add(copydefault);
	ctlcopy = copydefault;
	  
	var ctr = "Shop now";
    var ctrdefault = new fabric.IText('>'+ctr, {
      left: 410,
      top:  120,
      fontFamily: 'Arial',
      fill: '#146eb4',
	  fontSize: 12,
      originX: 'left',
      hasControls: false,
	  textDecoration: 'underline',
      styles: {
        0 : {
          0: { textDecoration: 'none' },
        }
      },
	  editable: false
	});
    canvas.add(ctrdefault);	

	fabric.Image.fromURL('images/Kindle_Paperwhite_Logo_Inline.svg', function(logo) {
    removelogo = logo;
    logo.scale(0.5).set({
        top: 50,
        left: 58,
        hasRotatingPoint: false,
        transparentCorners: false,
		lockUniScaling: true
    });
	canvas.add(logo);
	});	
	  
	canvas.add(ctlarrows);
	canvas.bringToFront(ctlarrows);
	canvas.renderAll();
  };
 
	
	
//Layout controll Split type
  $scope.addLayout2 = function() {
    // clear canvas
    canvas.clear();
    // remove currently selected object
    //canvas.remove(canvas.getActiveObject());

//    fabric.Image.fromURL('images/kp-bg01.png', function(bgimage) {
//    bgimage.scale(1).set({
//        top: 1,
//        left: 1,
//        selectable: false
//    });
//	canvas.add(bgimage);
//	canvas.sendToBack(bgimage);
//	ctrbg = bgimage;
//    });
//
    fabric.Image.fromURL('images/KP_30L_US.png', function(d30Limage) {
	d30Limage.scale(1).set({
        top: 5,
        left: 525,
        hasControls: false,
        transparentCorners: false,
        lockMovementY: true,
        selectable: false
    });
   	canvas.add(d30Limage); 
	});

//    fabric.Image.fromURL('images/screen-US.png', function(screen) {
//	removeimg = screen;
//    screen.scale(1).set({
//        top: 27,
//        left: 517,
//        hasControls: false,
//        lockMovementY: true,
//        lockMovementX: true,
//    });
//	canvas.add(screen);		
//    // Group
//	//var dgroup = new fabric.Group([dimage, screen],{ top: 5, left: 500 })
//	//canvas.add(dgroup);
//	//canvas.sendBackwards(dgroup);
//    });
	  
	var copy = "The World's Best-Selling E-reader";	
    var copydefault = new fabric.Text(copy, {
      left: 60,
      top:  110,
      fontFamily: 'BrandonGrotesqueLight',
      fill: '#000',
	  fontSize: 23,
      fontWeight: '',
      originX: 'left',
	  hasControls: false,
	  editable: false
      //hasRotatingPoint: false,
      //centerTransform: false
    });
    canvas.add(copydefault);
	ctlcopy = copydefault;
	  
	var ctr = "Shop now";
    var ctrdefault = new fabric.IText('>'+ctr, {
      left: 410,
      top:  120,
      fontFamily: 'Arial',
      fill: '#146eb4',
	  fontSize: 12,
      originX: 'left',
      hasControls: false,
	  textDecoration: 'underline',
      styles: {
        0 : {
          0: { textDecoration: 'none' },
        }
      },
	  editable: false
	});
    canvas.add(ctrdefault);	

	fabric.Image.fromURL('images/Kindle_Paperwhite_Logo_Inline.svg', function(logo) {
    removelogo = logo;
    logo.scale(0.5).set({
        top: 50,
        left: 58,
        hasRotatingPoint: false,
        transparentCorners: false,
		lockUniScaling: true
    });
	canvas.add(logo);
	});	
	  
	canvas.add(ctlarrows);
	canvas.bringToFront(ctlarrows);
	canvas.renderAll();
  };
	
	
//Remove background
  $scope.removebg = function() {
    canvas.remove(ctrbg);
	canvas.renderAll();
    };
//Reset
  $scope.Reset = function() {
    canvas.clear();
    canvas.add(welcome, ctlarrows);
	canvas.renderAll();
    };

//Add Text
$scope.addText = function() {
	canvas.remove(removewelcome);
	var text = "Edit your text";	
    var txtdefault = new fabric.IText(text, {
     left: getRandomInt(0, 300),
     top: getRandomInt(0, 150),
      fontFamily: 'BrandonGrotesqueLight',
      fill: '#000',
	  fontSize: 23,
      hasControls: false,
      editable: false
    });
    canvas.add(txtdefault);
	canvas.setActiveObject(txtdefault); 
  };	


//Logo switch
  function addLogo(logoName, logoScale, logoTop) {
	var swaplogo = new fabric.Image.fromURL('images/' + logoName, function(logo) {
    removelogo = logo;
    logo.set({
        top: logoTop,
        left: 58,
        hasRotatingPoint: false,
        transparentCorners: false,
		lockUniScaling: true
      })
	.scale(logoScale);
	
	canvas.add(logo);
	canvas.renderAll();
    });
}
addLogo();

  $scope.addLogo1 = function() {
    canvas.remove(removelogo);     
    addLogo('Kindle_Paperwhite_Logo.svg', 0.35, 30);
  };

  $scope.addLogo2 = function() {
    canvas.remove(removelogo);     
    addLogo('Kindle_Paperwhite_Logo_Inline.svg', 0.5, 50);
  };
	
	
//Screen control
  function addImage(imageName) {
	var swapscreen = new fabric.Image.fromURL('images/screen-' + imageName, function(screen) {
    removeimg = screen;
    screen.scale(1).set({
        top: 27,
        left: 517,
        hasControls: false,
        lockMovementY: true,
        lockMovementX: true,
      });
	//canvas.getObjects(screen); 
	canvas.add(screen);
	//canvas.setActiveObject(screen); 
	canvas.renderAll();
    });
}
addImage();

  $scope.clearscreen = function() {
    canvas.remove(removeimg);     
  };

  $scope.addImage1 = function() {
    canvas.remove(removeimg);     
    addImage('US.png');
  };

  $scope.addImage2 = function() {
    canvas.remove(removeimg);     
    addImage('DE.png');
  };

  $scope.addImage3 = function() {
    canvas.remove(removeimg);     
    addImage('ES.png');
  };

  $scope.addImage4 = function() {
     canvas.remove(removeimg);     
   addImage('IT.png');
  };

  $scope.addImage5 = function() {
    canvas.remove(removeimg);     
    addImage('CN.png');
  };

  $scope.addImage6 = function() {
    canvas.remove(removeimg);     
    addImage('JP.png');
  };

	
//Jquery test
function random_color(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

$(document).on('click', '#add', function(){
    canvas.add(new fabric.Rect({
        left: 200,
        top: 100,
        height: 50,
        width: 50,
        fill: random_color()
    }));
});


$(document).on('click', '#test' , function(){
    var canvas_objects = canvas._objects;
    if(canvas_objects.length !== 0){
     var last = canvas_objects[canvas_objects.length -1]; //Get last object   
     canvas.remove(last);
     canvas.renderAll();
    }   
});	
	
	
//-------

  $scope.confirmClear = function() {
    if (confirm('Are you sure?')) {
      canvas.clear();
    }
  };

  $scope.rasterize = function() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
	  canvas.remove(ctlarrows);
	  canvas.deactivateAll();
      window.open(canvas.toDataURL('png'));
    }
  };

  $scope.rasterizeSVG = function() {
    window.open(
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(canvas.toSVG()));
  };

  $scope.rasterizeJSON = function() {
    alert(JSON.stringify(canvas));
  };

  $scope.getSelected = function() {
    return canvas.getActiveObject();
  };

  $scope.removeSelected = function() {
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();

    if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function(object) {
        canvas.remove(object);
      });
    }
    else if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  $scope.getHorizontalLock = function() {
    return getActiveProp('lockMovementX');
  };
  $scope.setHorizontalLock = function(value) {
    setActiveProp('lockMovementX', value);
  };

  $scope.getVerticalLock = function() {
    return getActiveProp('lockMovementY');
  };
  $scope.setVerticalLock = function(value) {
    setActiveProp('lockMovementY', value);
  };

  $scope.getScaleLockX = function() {
    return getActiveProp('lockScalingX');
  },
  $scope.setScaleLockX = function(value) {
    setActiveProp('lockScalingX', value);
  };

  $scope.getScaleLockY = function() {
    return getActiveProp('lockScalingY');
  };
  $scope.setScaleLockY = function(value) {
    setActiveProp('lockScalingY', value);
  };

  $scope.getRotationLock = function() {
    return getActiveProp('lockRotation');
  };
  $scope.setRotationLock = function(value) {
    setActiveProp('lockRotation', value);
  };

  $scope.getOriginX = function() {
    return getActiveProp('originX');
  };
  $scope.setOriginX = function(value) {
    setActiveProp('originX', value);
  };

  $scope.getOriginY = function() {
    return getActiveProp('originY');
  };
  $scope.setOriginY = function(value) {
    setActiveProp('originY', value);
  };

  $scope.sendBackwards = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendBackwards(activeObject);
    }
  };

  $scope.sendToBack = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendToBack(activeObject);
    }
  };

  $scope.bringForward = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringForward(activeObject);
    }
  };

  $scope.bringToFront = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringToFront(activeObject);
    }
  };

  var pattern = new fabric.Pattern({
    source: '/assets/escheresque.png',
    repeat: 'repeat'
  });

  $scope.patternify = function() {
    var obj = canvas.getActiveObject();

    if (!obj) return;

    if (obj.fill instanceof fabric.Pattern) {
      obj.fill = null;
    }
    else {
      if (obj instanceof fabric.PathGroup) {
        obj.getObjects().forEach(function(o) { o.fill = pattern; });
      }
      else {
        obj.fill = pattern;
      }
    }
    canvas.renderAll();
  };

  $scope.clip = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    if (obj.clipTo) {
      obj.clipTo = null;
    }
    else {
      var radius = obj.width < obj.height ? (obj.width / 2) : (obj.height / 2);
      obj.clipTo = function (ctx) {
        ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
      };
    }
    canvas.renderAll();
  };

  $scope.shadowify = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    if (obj.shadow) {
      obj.shadow = null;
    }
    else {
      obj.setShadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 10,
        offsetY: 10
      });
    }
    canvas.renderAll();
  };

  $scope.gradientify = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    obj.setGradient('fill', {
      x1: 0,
      y1: 0,
      x2: (getRandomInt(0, 1) ? 0 : obj.width),
      y2: (getRandomInt(0, 1) ? 0 : obj.height),
      colorStops: {
        0: '#' + getRandomColor(),
        1: '#' + getRandomColor()
      }
    });
    canvas.renderAll();
  };

  $scope.execute = function() {
    if (!(/^\s+$/).test(consoleValue)) {
      eval(consoleValue);
    }
  };

  var consoleSVGValue = (
    '<?xml version="1.0" standalone="no"?>' +
      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>' +
    '</svg>'
  );

  var consoleValue = (
    '// clear canvas\n' +
    'canvas.clear();\n\n' +
    '// remove currently selected object\n' +
    'canvas.remove(canvas.getActiveObject());\n\n' +
    '// add red rectangle\n' +
    'canvas.add(new fabric.Rect({\n' +
    '  width: 50,\n' +
    '  height: 50,\n' +
    '  left: 50,\n' +
    '  top: 50,\n' +
    "  fill: 'rgb(255,0,0)'\n" +
    '}));\n\n' +
    '// add green, half-transparent circle\n' +
    'canvas.add(new fabric.Circle({\n' +
    '  radius: 40,\n' +
    '  left: 50,\n' +
    '  top: 50,\n' +
    "  fill: 'rgb(0,255,0)',\n" +
    '  opacity: 0.5\n' +
    '}));\n'
  );

  $scope.getConsoleSVG = function() {
    return consoleSVGValue;
  };
  $scope.setConsoleSVG = function(value) {
    consoleSVGValue = value;
  };
  $scope.getConsole = function() {
    return consoleValue;
  };
  $scope.setConsole = function(value) {
    consoleValue = value;
  };

  $scope.loadSVGWithoutGrouping = function() {
    _loadSVGWithoutGrouping(consoleSVGValue);
  };
  $scope.loadSVG = function() {
    _loadSVG(consoleSVGValue);
  };

  var _loadSVG = function(svg) {
    fabric.loadSVGFromString(svg, function(objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      canvas.add(obj).centerObject(obj).renderAll();
      obj.setCoords();
    });
  };

  var _loadSVGWithoutGrouping = function(svg) {
    fabric.loadSVGFromString(svg, function(objects) {
      canvas.add.apply(canvas, objects);
      canvas.renderAll();
    });
  };

  function initCustomization() {
    if (typeof Cufon !== 'undefined' && Cufon.fonts.delicious) {
      Cufon.fonts.delicious.offsetLeft = 75;
      Cufon.fonts.delicious.offsetTop = 25;
    }

    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      fabric.Object.prototype.cornerSize = 30;
    }

    fabric.Object.prototype.transparentCorners = false;

    if (document.location.search.indexOf('guidelines') > -1) {
      initCenteringGuidelines(canvas);
      initAligningGuidelines(canvas);
    }
  }

  initCustomization();



/*
  function addTexts() {
    var iText = new fabric.IText('lorem ipsum\ndolor\nsit Amet\nconsectetur', {
      left: 100,
      top: 150,
      fontFamily: 'Helvetica',
      fill: '#333',
      styles: {
        0: {
          0: { fill: 'red', fontSize: 20 },
          1: { fill: 'red', fontSize: 30 },
          2: { fill: 'red', fontSize: 40 },
          3: { fill: 'red', fontSize: 50 },
          4: { fill: 'red', fontSize: 60 },

          6: { textBackgroundColor: 'yellow' },
          7: { textBackgroundColor: 'yellow' },
          8: { textBackgroundColor: 'yellow' },
          9: { textBackgroundColor: 'yellow' }
        },
        1: {
          0: { textDecoration: 'underline' },
          1: { textDecoration: 'underline' },
          2: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
          3: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
          4: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' }
        },
        2: {
          0: { fill: 'blue', fontWeight: 'bold' },
          1: { fill: 'blue', fontWeight: 'bold' },
          2: { fill: 'blue', fontWeight: 'bold' },

          4: { fontFamily: 'Courier', textDecoration: 'line-through' },
          5: { fontFamily: 'Courier', textDecoration: 'line-through' },
          6: { fontFamily: 'Courier', textDecoration: 'line-through' },
          7: { fontFamily: 'Courier', textDecoration: 'line-through' }
        },
        3: {
          0: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
          1: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
          2: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
          3: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
          4: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' }
        }
      }
    });

    var iText2 = new fabric.IText('foo bar\nbaz\nquux', {
      left: 400,
      top: 150,
      fontFamily: 'Helvetica',
      fill: '#333',
      styles: {
        0: {
          0: { fill: 'red' },
          1: { fill: 'red' },
          2: { fill: 'red' }
        },
        2: {
          0: { fill: 'blue' },
          1: { fill: 'blue' },
          2: { fill: 'blue' },
          3: { fill: 'blue' }
        }
      }
    });

    canvas.add(iText, iText2);
  }

  addTexts();
*/




  $scope.getFreeDrawingMode = function() {
    return canvas.isDrawingMode;
  };
  $scope.setFreeDrawingMode = function(value) {
    canvas.isDrawingMode = !!value;
    $scope.$$phase || $scope.$digest();
  };

  $scope.freeDrawingMode = 'Pencil';

  $scope.getDrawingMode = function() {
    return $scope.freeDrawingMode;
  };
  $scope.setDrawingMode = function(type) {
    $scope.freeDrawingMode = type;

    if (type === 'hline') {
      canvas.freeDrawingBrush = $scope.vLinePatternBrush;
    }
    else if (type === 'vline') {
      canvas.freeDrawingBrush = $scope.hLinePatternBrush;
    }
    else if (type === 'square') {
      canvas.freeDrawingBrush = $scope.squarePatternBrush;
    }
    else if (type === 'diamond') {
      canvas.freeDrawingBrush = $scope.diamondPatternBrush;
    }
    else if (type === 'texture') {
      canvas.freeDrawingBrush = $scope.texturePatternBrush;
    }
    else {
      canvas.freeDrawingBrush = new fabric[type + 'Brush'](canvas);
    }

    $scope.$$phase || $scope.$digest();
  };

  $scope.getDrawingLineWidth = function() {
    if (canvas.freeDrawingBrush) {
      return canvas.freeDrawingBrush.width;
    }
  };
  $scope.setDrawingLineWidth = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
    }
  };

  $scope.getDrawingLineColor = function() {
    if (canvas.freeDrawingBrush) {
      return canvas.freeDrawingBrush.color;
    }
  };
  $scope.setDrawingLineColor = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = value;
    }
  };

  $scope.getDrawingLineShadowWidth = function() {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.shadowBlur;
    }
  };
  $scope.setDrawingLineShadowWidth = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.shadowBlur = parseInt(value, 10) || 1;
    }
  };
   
  function initBrushes() {
    if (!fabric.PatternBrush) return;

    initVLinePatternBrush();
    initHLinePatternBrush();
    initSquarePatternBrush();
    initDiamondPatternBrush();
    initImagePatternBrush();
  }
  initBrushes();

  function initImagePatternBrush() {
    var img = new Image();
    img.src = '../assets/honey_im_subtle.png';

    $scope.texturePatternBrush = new fabric.PatternBrush(canvas);
    $scope.texturePatternBrush.source = img;
  }

  function initDiamondPatternBrush() {
    $scope.diamondPatternBrush = new fabric.PatternBrush(canvas);
    $scope.diamondPatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 5;
      var patternCanvas = fabric.document.createElement('canvas');
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color
      });

      var canvasWidth = rect.getBoundingRectWidth();

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext('2d');
      rect.render(ctx);

      return patternCanvas;
    };
  }

  function initSquarePatternBrush() {
    $scope.squarePatternBrush = new fabric.PatternBrush(canvas);
    $scope.squarePatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 2;

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext('2d');

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patternCanvas;
    };
  }

  function initVLinePatternBrush() {
    $scope.vLinePatternBrush = new fabric.PatternBrush(canvas);
    $scope.vLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };
  }

  function initHLinePatternBrush() {
    $scope.hLinePatternBrush = new fabric.PatternBrush(canvas);
    $scope.hLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };
  }
}

function watchCanvas($scope) {

  function updateScope() {
    $scope.$$phase || $scope.$digest();
    canvas.renderAll();
  }

  canvas
    .on('object:selected', updateScope)
    .on('group:selected', updateScope)
    .on('path:created', updateScope)
    .on('selection:cleared', updateScope);
}

kitchensink.controller('CanvasControls', function($scope) {

  $scope.canvas = canvas;
  $scope.getActiveStyle = getActiveStyle;
  
  addAccessors($scope);
  watchCanvas($scope);

});

