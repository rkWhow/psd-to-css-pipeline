(function () {
  #include "CopyCSSToClipboard.jsx";

  saveToCssFile = function (css) {
    var Path = app.activeDocument.path;
    var cssFile = File(Path + "/ " + app.activeDocument.name + ".css");

    if (cssFile.exists)
      cssFile.remove();

    cssFile.encoding = "UTF8";
    cssFile.open("w");
    cssFile.writeln(css);
    cssFile.close();
  }

  const doc = app.activeDocument;
  var res = [];
  var len = doc.layers.length;

  for (var i = 0; i < len; i++) {
    var layer = doc.layers[i];
    doc.activeLayer = layer;
    var css = cssToClip.getCSS();
    res.push(css);
  }

  saveToCssFile(res.join('\n'));

  return true;
}());