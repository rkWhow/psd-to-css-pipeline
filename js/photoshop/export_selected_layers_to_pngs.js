(function () {
    function getSelectedLayers() {
        var resultLayers = new Array();
        try {
            var idGrp = stringIDToTypeID("groupLayersEvent");
            var descGrp = new ActionDescriptor();
            var refGrp = new ActionReference();
            refGrp.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
            descGrp.putReference(charIDToTypeID("null"), refGrp);
            executeAction(idGrp, descGrp, DialogModes.NO);
            for (var ix = 0; ix < app.activeDocument.activeLayer.layers.length; ix++) { resultLayers.push(app.activeDocument.activeLayer.layers[ix]) }
            var id8 = charIDToTypeID("slct");
            var desc5 = new ActionDescriptor();
            var id9 = charIDToTypeID("null");
            var ref2 = new ActionReference();
            var id10 = charIDToTypeID("HstS");
            var id11 = charIDToTypeID("Ordn");
            var id12 = charIDToTypeID("Prvs");
            ref2.putEnumerated(id10, id11, id12);
            desc5.putReference(id9, ref2);
            executeAction(id8, desc5, DialogModes.NO);
        } catch (err) { }
        return resultLayers;
    }

    app.displayDialogs = DialogModes.NO;

    var sourcePath = app.activeDocument.path;
    var sourceDoc = app.activeDocument;

    var layers = getSelectedLayers();

    var pngSaveOptions = new PNGSaveOptions();
    pngSaveOptions.compression = 9;

    for (var i in layers) {
        sourceDoc.activeLayer = layers[i];
        app.doAction("dubl + cut", "Export.ATN");
        var file = File(sourcePath + "/" + layers[i].name + ".png");
        app.activeDocument.saveAs(file, pngSaveOptions, true, Extension.LOWERCASE);
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }

    app.activeDocument = sourceDoc;

    return true;
}());