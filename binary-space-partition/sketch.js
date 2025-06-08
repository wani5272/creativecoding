let planes = [
  // Floor
  { p: [0, 0, 0], n: [0, 1, 0], color: [180, 180, 200] },
  // Ceiling
  { p: [0, 5, 0], n: [0, -1, 0], color: [200, 200, 220] },
  // Back wall
  { p: [0, 0, 10], n: [0, 0, -1], color: [200, 100, 100] },
  // Left wall
  { p: [-5, 0, 0], n: [1, 0, 0], color: [100, 200, 100] },
  // Right wall
  { p: [5, 0, 0], n: [-1, 0, 0], color: [100, 100, 200] },
];

class BSPNode {
  constructor(plane, front, back) {
    this.plane = plane;
    this.front = front;
    this.back = back;
  }
}

function pointSide3D(pt, plane) {
  let [px, py, pz] = pt;
  let [qx, qy, qz] = plane.p;
  let [nx, ny, nz] = plane.n;
  return (px - qx) * nx + (py - qy) * ny + (pz - qz) * nz;
}

function buildBSP(planes) {
  if (planes.length === 0) return null;
  let plane = planes[0];
  let front = [],
    back = [];
  for (let i = 1; i < planes.length; i++) {
    let pl = planes[i];
    let side = pointSide3D(pl.p, plane);
    if (side >= 0) front.push(pl);
    else back.push(pl);
  }
  return new BSPNode(plane, buildBSP(front), buildBSP(back));
}

function rayPlaneIntersect(ox, oy, oz, dx, dy, dz, plane) {
  let [px, py, pz] = plane.p;
  let [nx, ny, nz] = plane.n;
  let denom = dx * nx + dy * ny + dz * nz;
  if (abs(denom) < 1e-6) return null;
  let t = ((px - ox) * nx + (py - oy) * ny + (pz - oz) * nz) / denom;
  if (t < 0.001) return null;
  let ix = ox + dx * t,
    iy = oy + dy * t,
    iz = oz + dz * t;
  if (plane.n[1] === 1 && (ix < -5 || ix > 5 || iz < 0 || iz > 10)) return null;
  if (plane.n[1] === -1 && (ix < -5 || ix > 5 || iz < 0 || iz > 10))
    return null;
  if (plane.n[2] === -1 && (ix < -5 || ix > 5 || iy < 0 || iy > 5)) return null;
  if (plane.n[0] === 1 && (iz < 0 || iz > 10 || iy < 0 || iy > 5)) return null;
  if (plane.n[0] === -1 && (iz < 0 || iz > 10 || iy < 0 || iy > 5)) return null;
  return { t, x: ix, y: iy, z: iz, color: plane.color, n: plane.n };
}

function traceRayBSP(node, ox, oy, oz, dx, dy, dz, best) {
  if (!node) return best;
  let side = pointSide3D([ox, oy, oz], node.plane);
  let first = side >= 0 ? node.front : node.back;
  let second = side >= 0 ? node.back : node.front;
  best = traceRayBSP(first, ox, oy, oz, dx, dy, dz, best);
  let hit = rayPlaneIntersect(ox, oy, oz, dx, dy, dz, node.plane);
  if (hit && (!best || hit.t < best.t)) best = hit;
  best = traceRayBSP(second, ox, oy, oz, dx, dy, dz, best);
  return best;
}

let bspTree;
let cam = { x: 0, y: 2.5, z: -2.5 };
let look = { x: 0, y: 2.5, z: 1 };
let up = { x: 0, y: 1, z: 0 };
let fov = 60;

function setup() {
  createCanvas(700, 400);
  bspTree = buildBSP(planes);
  noLoop();
}

function draw() {
  background(30, 30, 40);
  let cx = look.x - cam.x,
    cy = look.y - cam.y,
    cz = look.z - cam.z;
  let forward = normalize([cx, cy, cz]);
  let right = normalize(cross(forward, [up.x, up.y, up.z]));
  let upv = normalize(cross(right, forward));
  let aspect = width / height;
  let scale = Math.tan((fov * 0.5 * Math.PI) / 180);

  loadPixels();
  for (let y = 0; y < height; y++) {
    let sy = (1 - (2 * (y + 0.5)) / height) * scale;
    for (let x = 0; x < width; x++) {
      let sx = ((2 * (x + 0.5)) / width - 1) * scale * aspect;
      let dx = forward[0] + sx * right[0] + sy * upv[0];
      let dy = forward[1] + sx * right[1] + sy * upv[1];
      let dz = forward[2] + sx * right[2] + sy * upv[2];
      let dir = normalize([dx, dy, dz]);
      let hit = traceRayBSP(
        bspTree,
        cam.x,
        cam.y,
        cam.z,
        dir[0],
        dir[1],
        dir[2],
        null
      );
      let idx = 4 * (y * width + x);
      if (hit) {
        let light = normalize([-1, -1, -1]);
        let shade = max(0.2, dot(hit.n, light));
        pixels[idx] = hit.color[0] * shade;
        pixels[idx + 1] = hit.color[1] * shade;
        pixels[idx + 2] = hit.color[2] * shade;
        pixels[idx + 3] = 255;
      } else {
        pixels[idx] = 30;
        pixels[idx + 1] = 30;
        pixels[idx + 2] = 40;
        pixels[idx + 3] = 255;
      }
    }
  }
  updatePixels();
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}
function normalize(v) {
  let len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
}
