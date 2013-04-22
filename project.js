(function() {

  var jqrypath = "http://ajax.googleapis.com/ajax/libs/";
  var gizapath = "lib/giza/giza/";

  var scripts = [
    "lib/showdown.js",
    "lib/tween.js",
    "lib/seedrandom.js",
    jqrypath + "jquery/1.8.0/jquery.min.js",
    gizapath + "Giza.js",
    gizapath + "Utility.js",
    gizapath + "Animation.js",
    gizapath + "Shaders.js",
    gizapath + "BufferView.js",
    gizapath + "Vector.js",
    gizapath + "Matrix.js",
    gizapath + "Color.js",
    gizapath + "Topo.js",
    gizapath + "Polygon.js",
    gizapath + "Surface.js",
    gizapath + "Path.js",
    gizapath + "Mouse.js",
    gizapath + "Turntable.js",
    'config.js',
    'create.js',
    'centerline.js',
    'meshify.js',
    'main.js',
  ];

  yepnope({
    load: scripts,
    complete: function() {
      main();
    }
  });

})();
