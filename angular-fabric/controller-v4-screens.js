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

	
//start message
	var strings = "Select the layout type to start!";
	var welcome = new fabric.Text(strings, {
        fontFamily: 'Arial',
        left:canvas.getWidth() / 3.7,
        top: canvas.getHeight() / 2.5,
        fontSize: 23,
        fontWeight: '300',
        fill: '#ccc',
        selectable: false
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
	var arrows = new fabric.Group([arrowLeft, arrowRight],{ top: 72, left: 5, selectable: false});
	canvas.add(arrows).bringToFront(arrows);
	ctlarrows = arrows;
	});	
    });


//Layout controll	
function addBG() {
	new fabric.Image.fromURL('images/kp-bg01.png', function(bgimage) {
	bgimage.scale(1).set({
		top: 1,
		left: 1,
		selectable: false
	});
	canvas.add(bgimage);
	canvas.sendToBack(bgimage);
	ctrbg = bgimage;
	});
	};
	
function addDefaultCta(dctaTop, dctaLeft) {	
	var cta = "Shop now";
	var ctadefault = new fabric.IText('>'+cta, {
	  left: dctaLeft,
	  top:  dctaTop,
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
	canvas.add(ctadefault);
	ctlcta = ctadefault;
	};	
	
function addDefaultLogo(dlogoTop, dlogoLeft) {
	new fabric.Image.fromURL('images/Kindle_Paperwhite_Logo_Inline.svg', function(logo) {
	removelogo = logo;
	logo.scale(0.5).set({
		top: dlogoTop,
		left: dlogoLeft,
		hasRotatingPoint: false,
		transparentCorners: false,
		lockUniScaling: true
	});
	canvas.add(logo);
	});	
	};
	
function addDefaultText(dtextTop, dtextLeft) {	
	var copy = "The World's Best-Selling E-reader";	
	var copydefault = new fabric.Text(copy, {
	  top:  dtextTop,
	  left: dtextLeft,
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
	};	
	  
//Single front
  $scope.addLayout1 = function() {
    canvas.clear();
	addBG();	
	canvas.add(ctlarrows);
    fabric.Image.fromURL('images/KP_front.png', function(dimage) {
	dimage.scale(1).set({
        top: 5,
        left: 500,
        hasControls: false,
        transparentCorners: false,
        //lockMovementY: true,
        selectable: false
    });
   	canvas.add(dimage).sendBackwards(dimage); 
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
	canvas.add(screen).sendBackwards(screen);
	ctlscreen = screen;
    });
	addDefaultLogo(50, 58);
	addDefaultCta(120, 380);
	addDefaultText(110, 60);
	canvas.renderAll();
  };
 
	
//Angled device
  $scope.addLayout2 = function() {
    canvas.clear();
	//addBG();
	canvas.add(ctlarrows);
    fabric.Image.fromURL('images/KP_30L_US.png', function(d30Limage) {
    removeDevice = d30Limage;
	d30Limage.scale(1).set({
        top: 5,
        left: 525,
        hasControls: false,
        transparentCorners: false,
        lockMovementY: true,
        selectable: false
    });
   	canvas.add(d30Limage).sendBackwards(d30Limage); 
	});
	addDefaultLogo(50, 58);
	addDefaultCta(120, 380);
	addDefaultText(110, 60);
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
	

//OU image control
function changeDevice(dName) {
	var swapOU = new fabric.Image.fromURL('images/KP_30L_' + dName, function(d30Limage) {
    removeDevice = d30Limage;
    d30Limage.scale(1).set({
        top: 5,
        left: 525,
        hasControls: false,
        lockMovementY: true,
        lockMovementX: true,
      });
	canvas.add(d30Limage);
	canvas.renderAll();
    });
  	}
changeDevice();

  $scope.cleardevice = function() {
    canvas.remove(removeDevice);     
  };

  $scope.changeDevice1 = function() {
    canvas.remove(removeDevice);     
    changeDevice('US.png');
  };

  $scope.changeDevice2 = function() {
    canvas.remove(removeDevice);     
    changeDevice('DE.png');
  };

  $scope.changeDevice3 = function() {
    canvas.remove(removeDevice);     
    changeDevice('ES.png');
  };
	
	
//Screen control
function changeImage(imageName) {
	var swapscreen = new fabric.Image.fromURL('images/screen-' + imageName, function(ctlscreen) {
    removeimg = ctlscreen;
    ctlscreen.scale(1).set({
        top: 27,
        left: 517,
        hasControls: false,
        lockMovementY: true,
        lockMovementX: true,
      });
	//canvas.getObjects(ctlscreen); 
	canvas.add(ctlscreen);
	//canvas.setActiveObject(screen); 
	canvas.renderAll();
    });
  	}
changeImage();

  $scope.clearscreen = function() {
    canvas.remove(removeimg);     
  };

  $scope.addImage1 = function() {
    canvas.remove(removeimg);     
    changeImage('US.png');
  };

  $scope.addImage2 = function() {
    canvas.remove(removeimg);     
    changeImage('DE.png');
  };

  $scope.addImage3 = function() {
    canvas.remove(removeimg);     
    changeImage('ES.png');
  };

  $scope.addImage4 = function() {
   canvas.remove(removeimg);     
   changeImage('IT.png');
  };

  $scope.addImage5 = function() {
    canvas.remove(removeimg);     
    changeImage('CN.png');
  };

  $scope.addImage6 = function() {
    canvas.remove(removeimg);     
    changeImage('JP.png');
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

//---
	
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

