// A tree is a flat list of branches.
// Each element of a branch is [[x, y], width]
//
// The client converts this into triangle strips with [x, y, d1, d2, ux, uy]
// - (x, y) is the centerline point
// - d1 is distance from branch bud
// - d2 is distance from tree root
// - (ux, uy) is the vector from centerline to edge
//
// We actually create two trees to simulate wind sway.
// The vertex shader blends the two shapes to achieve animation.
//
// Naming convention: almost all variables in this file end in one of:
//     Angle, Position, Count, Width, Fraction
// Angles are always in radians.

TREE = {};

TREE.config = {
  splitAngle: 0.11,
  rootPosition: [0, 0],
  rootWidth: 1,
  aspect: 0.9,
  rootBranchCount: 6,
  minWidth: 0.0125,
  shrinkFraction: 0.95,
  rootCurlAngle: 0,
  curlAngle: 0.2,
  straightenFraction: 0.95,
  budFraction: 0.5,
  seed: 'hello2',
  scale: 0.12,
  spin: Math.PI / 2,
};
