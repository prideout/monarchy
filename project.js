(function() {

  var jqrypath = "https://ajax.googleapis.com/ajax/libs/";

  var scripts = [
    "lib/showdown.js",
    "lib/tween.js",
    "lib/seedrandom.js",
    "lib/giza.min.js",
    jqrypath + "jquery/1.8.0/jquery.min.js",
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
