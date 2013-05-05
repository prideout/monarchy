TREE.centerline = function(tree) {

  var branches = tree.branches;
  var V2 = GIZA.Vector2;

  var spans = [];
  var numPoints = 0;
  branches.forEach(function(branch) {
    numPoints += branch.length;
    spans.push(branch.length);
  });

  var bufferView = new GIZA.BufferView({
    position: [Float32Array, 2],
  });
  
  var vertexArray = bufferView.makeBuffer(numPoints);
  var iterator = bufferView.iterator();
  branches.forEach(function(branch) {
    branch.forEach(function(segment) {
      var vertex = iterator.next();
      var position = segment[0];
      V2.set(vertex.position, position);
    });
  });

  return {
    numPoints: numPoints,
    data: vertexArray,
    spans: spans,
  };
};
