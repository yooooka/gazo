/*global fabric:false */
/*global kitchensink:false */
/*global getRandomInt:false */
/*global capitalize:false */
/*jslint nomen: true*/

kitchensink.controller("CanvasControls", function ($scope) {
  var canvas = new fabric.Canvas("canvas");
  var OrgUnit = "US";
  var gwArrows;
  var removeLogo;
  var removeWelcome;
  var ctrbg;
  var deviceImg;

  $scope.setOU = function (OU) {
    OrgUnit = OU;
    var objArray = canvas.getObjects();
    for (var j = 0; j < objArray.length; j++) {
      if (objArray[j].id === "angleL") {
        $scope.setLayout("angled", OU + ".png");
      } else if (objArray[j].id === "frontD") {
        $scope.setLayout("front", OU + ".png");
      }
    }
  };

  // default elements
  function addBG() {
    fabric.Image.fromURL("images/kp-bg01.png", function (bgimage) {
      bgimage.scale(1).set({
        top: 1,
        left: 1,
        selectable: false,
        id: "bg01",
      });
      canvas.add(bgimage);
      canvas.sendToBack(bgimage);
      ctrbg = bgimage;
    });
  }

  function addDefaultCta(dctaTop, dctaLeft) {
    var ctadefault = new fabric.IText(">Shop now", {
      left: dctaLeft,
      top: dctaTop,
      fontFamily: "Arial",
      fill: "#146eb4",
      fontSize: 12,
      originX: "left",
      hasControls: false,
      textDecoration: "underline",
      styles: { 0: { 0: { textDecoration: "none" } } },
      editable: false,
    });
    canvas.add(ctadefault);
  }

  function addDefaultLogo(dlogoTop, dlogoLeft) {
    fabric.Image.fromURL(
      "images/Kindle_Paperwhite_Logo_Inline.svg",
      function (logo) {
        removeLogo = logo;
        logo.scale(0.5).set({
          top: dlogoTop,
          left: dlogoLeft,
          hasRotatingPoint: false,
          transparentCorners: false,
          lockUniScaling: true,
        });
        canvas.add(logo);
      }
    );
  }

  function addDefaultText(dtextTop, dtextLeft) {
    var copydefault = new fabric.Text("The World's Best-Selling E-reader", {
      top: dtextTop,
      left: dtextLeft,
      fontFamily: "BrandonGrotesqueLight",
      fill: "#000",
      fontSize: 23,
      fontWeight: "",
      originX: "left",
      hasControls: false,
      editable: false,
      //hasRotatingPoint: false,
      //centerTransform: false
    });
    canvas.add(copydefault);
  }

  // addlayout
  $scope.setLayout = function (type, image) {
    var OU = OrgUnit || "US";
    canvas.clear();
    canvas.remove(deviceImg);
    canvas.add(gwArrows);
    addBG();
    if (type === "front") {
      //frontDevice('US.png');
      fabric.Image.fromURL("images/KP_front-" + OU + ".png", function (dimage) {
        deviceImg = dimage;
        dimage.scale(1).set({
          top: 5,
          left: 500,
          hasControls: false,
          transparentCorners: false,
          lockMovementY: true,
          lockMovementX: true,
          id: "frontD",
        });
        canvas.add(dimage).sendBackwards(dimage);
      });
      addDefaultCta(120, 380);
      addDefaultText(110, 60);
      addDefaultLogo(50, 58);
    } else if (type === "angled") {
      //angled30LDevice('US.png');
      fabric.Image.fromURL(
        "images/KP_30L_" + OU + ".png",
        function (d30Limage) {
          deviceImg = d30Limage;
          d30Limage.scale(1).set({
            top: 5,
            left: 525,
            hasControls: false,
            transparentCorners: false,
            lockMovementY: true,
            lockMovementX: true,
            id: "angleL",
          });
          canvas.add(d30Limage).sendBackwards(d30Limage);
        }
      );
      addDefaultCta(120, 410);
      addDefaultText(110, 90);
      addDefaultLogo(55, 130);
    } else if (type === "split") {
      // TODO
      var wip = new fabric.Text("Split layout - Work in progress", {
        fontFamily: "BrandonGrotesqueRegular",
        left: canvas.getWidth() / 3.2,
        top: canvas.getHeight() / 2.5,
        fontSize: 23,
        fontWeight: "300",
        fill: "#aaa",
        transparentCorners: false,
        hasControls: false,
      });
      canvas.add(wip);
      console.log("split is not implemented");
    }
    canvas.renderAll();
  };

  $scope.getActiveStyle = function (styleName, object) {
    object = object || canvas.getActiveObject();
    if (!object) {
      return "";
    }
    return object.getSelectionStyles && object.isEditing
      ? object.getSelectionStyles()[styleName] || ""
      : object[styleName] || "";
  };

  $scope.setActiveStyle = function (styleName, value, object) {
    object = object || canvas.getActiveObject();
    if (!object) {
      return "";
    }

    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      object[styleName] = value;
    }
    object.setCoords();
    canvas.renderAll();
  };

  $scope.getActiveProp = function (name) {
    var object = canvas.getActiveObject();
    if (!object) {
      return "";
    }

    return object[name] || "";
  };

  $scope.setActiveProp = function (name, value) {
    var object = canvas.getActiveObject();
    if (!object) {
      return;
    }

    object.set(name, value).setCoords();
    canvas.renderAll();
  };

  $scope.addAccessors = function ($scope) {
    //welcome message
    var strings = "Select the layout type to start!";
    var welcome = new fabric.Text(strings, {
      fontFamily: "Arial",
      left: canvas.getWidth() / 3.7,
      top: canvas.getHeight() / 2.5,
      fontSize: 23,
      fontWeight: "300",
      fill: "#ccc",
      selectable: false,
    });
    canvas.add(welcome);
    removeWelcome = welcome;

    //GW arrow group
    fabric.Image.fromURL("images/arrow.png", function (arrowLeft) {
      arrowLeft.scale(1).set({
        top: 0,
        left: 0,
        //hasControls: false,
      });
      fabric.Image.fromURL("images/arrow.png", function (arrowRight) {
        arrowRight.scale(1).set({
          top: 0,
          left: 624,
          flipX: true,
          //hasControls: false,
        });
        var arrows = new fabric.Group([arrowLeft, arrowRight], {
          top: 72,
          left: 5,
          selectable: false,
        });
        canvas.add(arrows).bringToFront(arrows);
        gwArrows = arrows;
      });
    });

    $scope.clearscreen = function () {
      canvas.remove(deviceImg);
    };

    //Remove background
    $scope.removebg = function () {
      canvas.remove(ctrbg);
    };
    //Re-add background
    $scope.addbg = function () {
      canvas.remove(ctrbg);
      canvas.add(ctrbg).sendToBack(ctrbg);
    };

    //Ctr background --- working in progress
    $scope.onoffbg = function () {
      var bg_object = canvas.getObjects();
      if (bg_object.id === "bg01") {
        canvas.remove(ctrbg);
      } else {
        canvas.remove(ctrbg);
        canvas.add(ctrbg).sendToBack(ctrbg);
      }
    };

    //Reset
    $scope.Reset = function () {
      canvas.clear();
      canvas.add(welcome, gwArrows);
      canvas.renderAll();
    };

    //Add Text
    $scope.addText = function () {
      canvas.remove(removeWelcome);
      var text = "Edit your text";
      var txtdefault = new fabric.IText(text, {
        left: getRandomInt(0, 300),
        top: getRandomInt(0, 150),
        fontFamily: "BrandonGrotesqueLight",
        fill: "#000",
        fontSize: 23,
        hasControls: false,
        editable: false,
      });
      canvas.add(txtdefault);
      canvas.setActiveObject(txtdefault);
    };

    //Logo switch
    function addLogo(logoName, logoScale, logoTop, logoLeft) {
      var swaplogo = new fabric.Image.fromURL("images/" + logoName, function (
        logo
      ) {
        removeLogo = logo;
        logo
          .set({
            top: logoTop,
            left: logoLeft,
            hasRotatingPoint: false,
            transparentCorners: false,
            lockUniScaling: true,
          })
          .scale(logoScale);
        canvas.add(logo);
        canvas.renderAll();
      });
    }
    addLogo();

    $scope.addLogo1 = function () {
      canvas.remove(removeLogo);
      addLogo("Kindle_Paperwhite_Logo.svg", 0.35, 40, 58);
    };

    $scope.addLogo2 = function () {
      canvas.remove(removeLogo);
      addLogo("Kindle_Paperwhite_Logo_Inline.svg", 0.5, 50, 58);
    };

    //delete last object
    $scope.deletelastone = function () {
      var canvas_objects = canvas._objects;
      if (canvas_objects.length !== 0) {
        var last = canvas_objects[canvas_objects.length - 1]; //Get last object
        canvas.remove(last);
        canvas.renderAll();
      }
    };

    $scope.confirmClear = function () {
      if (confirm("Are you sure?")) {
        canvas.clear();
      }
    };

    $scope.rasterize = function () {
      if (!fabric.Canvas.supports("toDataURL")) {
        alert(
          "This browser doesn't provide means to serialize canvas to an image"
        );
      } else {
        canvas.remove(gwArrows);
        canvas.deactivateAll();
        var dataURL = canvas.toDataURL("png");

        // Convert the dataURL to a Blob and create an object URL
        var byteString = atob(dataURL.split(",")[1]);
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var uintArray = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([arrayBuffer], { type: "image/png" });
        var objectURL = URL.createObjectURL(blob);

        // Open the image in a new window or tab
        window.open(objectURL);
      }
    };

    $scope.rasterizeSVG = function () {
      window.open(
        "data:image/svg+xml;utf8," + encodeURIComponent(canvas.toSVG())
      );
    };

    $scope.rasterizeJSON = function () {
      alert(JSON.stringify(canvas));
    };

    $scope.getSelected = function () {
      return canvas.getActiveObject();
    };

    $scope.removeSelected = function () {
      var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();

      if (activeGroup) {
        var objectsInGroup = activeGroup.getObjects();
        canvas.discardActiveGroup();
        objectsInGroup.forEach(function (object) {
          canvas.remove(object);
        });
      } else if (activeObject) {
        canvas.remove(activeObject);
      }
    };

    $scope.sendBackwards = function () {
      var activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.sendBackwards(activeObject);
      }
    };

    $scope.sendToBack = function () {
      var activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.sendToBack(activeObject);
      }
    };

    $scope.bringForward = function () {
      var activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.bringForward(activeObject);
      }
    };

    $scope.bringToFront = function () {
      var activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.bringToFront(activeObject);
      }
    };

    $scope.getOpacity = function () {
      return $scope.getActiveStyle("opacity") * 100;
    };
    $scope.setOpacity = function (value) {
      $scope.setActiveStyle("opacity", parseInt(value, 10) / 100);
    };

    $scope.getFill = function () {
      return $scope.getActiveStyle("fill");
    };
    $scope.setFill = function (value) {
      $scope.setActiveStyle("fill", value);
    };

    $scope.isBold = function () {
      return $scope.getActiveStyle("fontFamily") === "BrandonGrotesqueRegular";
    };
    $scope.toggleBold = function () {
      $scope.setActiveStyle(
        "fontFamily",
        $scope.getActiveStyle("fontFamily") === "BrandonGrotesqueRegular"
          ? "BrandonGrotesqueLight"
          : "BrandonGrotesqueRegular"
      );
    };

    $scope.isItalic = function () {
      return $scope.getActiveStyle("fontStyle") === "italic";
    };
    $scope.toggleItalic = function () {
      $scope.setActiveStyle(
        "fontStyle",
        $scope.getActiveStyle("fontStyle") === "italic" ? "" : "italic"
      );
    };

    $scope.isUnderline = function () {
      return $scope.getActiveStyle("textDecoration").indexOf("underline") > -1;
    };
    $scope.toggleUnderline = function () {
      var value = $scope.isUnderline()
        ? $scope.getActiveStyle("textDecoration").replace("underline", "")
        : $scope.getActiveStyle("textDecoration") + " underline";

      $scope.setActiveStyle("textDecoration", value);
    };

    $scope.isLinethrough = function () {
      return (
        $scope.getActiveStyle("textDecoration").indexOf("line-through") > -1
      );
    };
    $scope.toggleLinethrough = function () {
      var value = $scope.isLinethrough()
        ? $scope.getActiveStyle("textDecoration").replace("line-through", "")
        : $scope.getActiveStyle("textDecoration") + " line-through";

      $scope.setActiveStyle("textDecoration", value);
    };
    $scope.isOverline = function () {
      return $scope.getActiveStyle("textDecoration").indexOf("overline") > -1;
    };
    $scope.toggleOverline = function () {
      var value = $scope.isOverline()
        ? $scope.getActiveStyle("textDecoration").replace("overlin", "")
        : $scope.getActiveStyle("textDecoration") + " overline";

      $scope.setActiveStyle("textDecoration", value);
    };

    $scope.getText = function () {
      return $scope.getActiveProp("text");
    };
    $scope.setText = function (value) {
      $scope.setActiveProp("text", value);
    };

    $scope.getTextAlign = function () {
      return capitalize($scope.getActiveProp("textAlign"));
    };
    $scope.setTextAlign = function (value) {
      $scope.setActiveProp("textAlign", value.toLowerCase());
    };

    $scope.getFontFamilygetStrokeColor = function () {
      return $scope.getActiveProp("fontFamily").toLowerCase();
    };
    $scope.setFontFamily = function (value) {
      $scope.setActiveProp("fontFamily", value.toLowerCase());
    };

    $scope.getBgColor = function () {
      return $scope.getActiveProp("backgroundColor");
    };
    $scope.setBgColor = function (value) {
      $scope.setActiveProp("backgroundColor", value);
    };

    $scope.getTextBgColor = function () {
      return $scope.getActiveProp("textBackgroundColor");
    };
    $scope.setTextBgColor = function (value) {
      $scope.setActiveProp("textBackgroundColor", value);
    };

    $scope.getStrokeColor = function () {
      return $scope.getActiveStyle("stroke");
    };
    $scope.setStrokeColor = function (value) {
      $scope.setActiveStyle("stroke", value);
    };

    $scope.getStrokeWidth = function () {
      return $scope.getActiveStyle("strokeWidth");
    };
    $scope.setStrokeWidth = function (value) {
      $scope.setActiveStyle("strokeWidth", parseInt(value, 10));
    };

    $scope.getFontSize = function () {
      return $scope.getActiveStyle("fontSize");
    };
    $scope.setFontSize = function (value) {
      $scope.setActiveStyle("fontSize", parseInt(value, 10));
    };

    $scope.getLineHeight = function () {
      return $scope.getActiveStyle("lineHeight");
    };
    $scope.setLineHeight = function (value) {
      $scope.setActiveStyle("lineHeight", parseFloat(value, 10));
    };

    $scope.getBold = function () {
      return $scope.getActiveStyle("fontWeight");
    };
    $scope.setBold = function (value) {
      $scope.setActiveStyle("fontWeight", value ? "bold" : "");
    };

    $scope.getCanvasBgColor = function () {
      return canvas.backgroundColor;
    };
    $scope.setCanvasBgColor = function (value) {
      canvas.backgroundColor = value;
      canvas.renderAll();
    };
  };

  $scope.watchCanvas = function ($scope) {
    function updateScope() {
      canvas.renderAll();
    }
    canvas
      .on("object:selected", updateScope)
      .on("group:selected", updateScope)
      .on("path:created", updateScope)
      .on("selection:cleared", updateScope);
  };

  $scope.addAccessors($scope);
  $scope.watchCanvas($scope);
  $("canvas").click(function () {
    $scope.$apply();
  });
});
