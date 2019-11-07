(function(documents){
  for(var i in documents) {
    var name = documents[i].replace(/^.*?([^\\\/]*)$/, '$1');
    app.activeDocument = app.documents[name];
    app.activeDocument.close();
  }
}(documents));
