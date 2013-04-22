// A tree is a flat list of branches.
// Each element of a branch is [[x, y], width]
//
// Naming convention: almost all variables in this file end in one of:
//     Angle, Position, Count, Width, Fraction
// Angles are always in radians.

TREE.create = function(config) {

  var V2 = GIZA.Vector2;

  var branches = [];
  var lengths = [];

  Math.seedrandom(config.seed);

  var addBranch = function(position, angle, width, curlAngle, length) {
    var index = branches.length;
    var branch = [];
    branches.push(branch);
    lengths.push(length);
    var budWidth = width;
    while (width > config.minWidth) {
      curlAngle += Math.random() * config.curlAngle - config.curlAngle / 2;
      curlAngle *= config.straightenFraction;
      branch.push([position.slice(0), width]);
      width *= config.shrinkFraction;
      angle += curlAngle;
      var dx = Math.cos(angle) * width * config.aspect;
      var dy = Math.sin(angle) * width * config.aspect;
      position[0] += dx;
      position[1] += dy;
      length += Math.sqrt(dx*dx + dy*dy);
      if (width < budWidth * config.budFraction) {
        budWidth *= config.budFraction;
        addBranch(position.slice(0), angle + config.splitAngle, budWidth, curlAngle, length);
      }
    }
  };

  var budPosition = config.rootPosition;
  var branchAngle = 0;
  var branchCount = config.rootBranchCount;
  var deltaAngle = Math.PI * 2 / branchCount;
  for (var i = 0; i < branchCount; i++) {
    addBranch(budPosition.slice(0), branchAngle, config.rootWidth, config.rootCurlAngle, 0);
    branchAngle += deltaAngle;
  }

  return {branches: branches, lengths: lengths};
};
