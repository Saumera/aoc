const { getProblem } = require('../../util.js');

const regex = /^(?<action>[A-Z])(?<value>[0-9]+)$/;
const parse = contents => contents
  .split(/\n/)
  .filter(Boolean)
  .map(s => s.match(regex).groups)
  .map(s => ({ ...s, value: Number(s.value) }))

const instructions = getProblem('2020', 'day12.txt', parse);

const part1 = () => {
  const compassActions = {
    N: ({ x, y, bearing }, dist) => ({ x, y: y + dist, bearing }),
    S: ({ x, y, bearing }, dist) => ({ x, y: y - dist, bearing }),
    E: ({ x, y, bearing }, dist) => ({ x: x + dist, y, bearing }),
    W: ({ x, y, bearing }, dist) => ({ x: x - dist, y, bearing }),
  }

  // Bearing will be an int from 0 to 3 where 0 is North and it goes clockwise until 3 is West
  // so each 90 degrees will add 1 (or subtract 1 if negative). Using this array, we can
  // convert a bearing into a compass direction, which can in turn be used to update the position
  const bearingToDir = [ "N", "E", "S", "W" ]
  const getBearing = (b, d) => (b + 4 + (d / 90)) % 4;

  const turnActions = {
    L: ({ x, y, bearing }, degrees) => ({ x, y, bearing: getBearing(bearing, degrees * -1) }),
    R: ({ x, y, bearing }, degrees) => ({ x, y, bearing: getBearing(bearing, degrees) }),
    F: ({ x, y, bearing }, dist) => compassActions[bearingToDir[bearing]]({ x, y, bearing }, dist)
  }

  const actions = { ...compassActions, ...turnActions };

  const INIT = { x: 0, y: 0, bearing: 1 };
  const finalState = instructions.reduce((state, { action, value }) => {
    return actions[action](state, value)
  }, INIT);

  return Math.abs(finalState.x) + Math.abs(finalState.y);
}

const part2 = () => {
  const turnLookup = {
    R270: ({ x, y }) => ({ x: y * -1, y: x }),
    L90:  ({ x, y }) => ({ x: y * -1, y: x }),
    L270: ({ x, y }) => ({ x: y, y: x * -1 }),
    R90:  ({ x, y }) => ({ x: y, y: x * -1 }),
    L180: ({ x, y }) => ({ x: x * -1, y: y * -1 }),
    R180: ({ x, y }) => ({ x: x * -1, y: y * -1 }),
  };
  const turn = (type, waypoint) => turnLookup[type](waypoint);

  // All actions except for F take in and return the waypoint
  const actions = {
    N: ({ x, y }, dist) => ({ x, y: y + dist }),
    S: ({ x, y }, dist) => ({ x, y: y - dist }),
    E: ({ x, y }, dist) => ({ x: x + dist, y }),
    W: ({ x, y }, dist) => ({ x: x - dist, y }),
    L: (waypoint, deg) => turn(`L${deg}`, waypoint),
    R: (waypoint, deg) => turn(`R${deg}`, waypoint),
    F: ({ x, y, waypoint }, value) => ({
      x: x + (waypoint.x * value),
      y: y + (waypoint.y * value),
      waypoint
    })
  };

  const INIT = { x: 0, y: 0, waypoint: { x: 10, y: 1 } };
  const finalState = instructions.reduce((state, { action, value }) => {
    // Every action except the F action operates solely on the waypoint,
    // so this will confine the state update in all those cases to just the
    // waypoint
    return action === "F"
      ? actions[action](state, value)
      : { ...state, waypoint: actions[action](state.waypoint, value) }
  }, INIT);

  return Math.abs(finalState.x) + Math.abs(finalState.y)
}

console.log(part1());
console.log(part2());
