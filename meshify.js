// The input is a flat list of branches.
// Each element of a branch is [[x, y], width]
//
// We convert this into triangle strips with [x, y, d1, d2, ux, uy, bi]
// - (x, y) is the centerline point
// - d1 is distance from branch bud
// - (ux, uy) is the vector from centerline to edge
// - bi is the branch index
//
// We actually create two trees to simulate wind sway.
// The vertex shader blends the two shapes to achieve animation.
//

TREE.meshify = function(tree) {

  var branches = tree.branches;
  var lengths = tree.lengths;

  var V2 = GIZA.Vector2;

  // Describe the 24-byte vertex format.
  var bufferFormat = {
    centerline: [Float32Array, 2],
    rootDistance: [Float32Array, 1],
    edgeVector: [Float32Array, 2],
    axisDistance: [Float32Array, 1],
  };
  var bufferView = new GIZA.BufferView(bufferFormat);

  // Count the total number of segments so we can allocate the array buffer.
  var spans = [];
  var numPoints = 0;
  branches.forEach(function(branch) {
    if (branch.length < 2) {
      return;
    }
    numPoints += branch.length * 2;
    spans.push(branch.length * 2);
  });

  // Create and populate the array buffer.
  var vertexArray = bufferView.makeBuffer(numPoints);
  var iterator = bufferView.iterator();
  var branchLengths = {};

  for (var branchIndex = 0; branchIndex < branches.length; branchIndex++) {
    var branch = branches[branchIndex];
    if (branch.length < 2) {
      continue;
    }

    var previous = null;
    var budDistance = 0;
    var rootDistance = lengths[branchIndex];
    var first = iterator.clone();

    for (var segmentIndex = 0; segmentIndex < branch.length; segmentIndex++) {
      var segment = branch[segmentIndex];
      var position = segment[0];
      var width = segment[1];

      if (segmentIndex > 0) {
        var deltaVector = V2.subtract(position, previous);
        var edgeVector = V2.normalize(V2.perp(deltaVector));
        budDistance += V2.length(deltaVector);
        var values = {
          centerline: position,
          edgeVector: edgeVector,
          rootDistance: rootDistance + budDistance,
          axisDistance: width / 2,
        };
        iterator.next().set(values);
        values.axisDistance *= -1;
        iterator.next().set(values);
      } else {
        iterator.next();
        iterator.next();
      }

      previous = position;
    }

    branchLengths[branchIndex] = budDistance;

    // Extrapolate backwards for the first vertex since we skipped it
    // to get deltas.
    var segment = branch[0];
    var position = segment[0];
    var width = segment[1];
    var nextPosition = branch[1][0];
    var deltaVector = V2.subtract(nextPosition, position);
    var edgeVector = V2.normalize(V2.perp(deltaVector));
    var values = {
      centerline: position,
      edgeVector: edgeVector,
      rootDistance: rootDistance,
      axisDistance: width / 2,
    };
    first.next().set(values);
    values.axisDistance *= -1;
    first.next().set(values);
  }

  return {
    numPoints: numPoints,
    data: vertexArray,
    spans: spans
  };
};
