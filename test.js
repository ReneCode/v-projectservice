
let a = {
  x: null,
  y: undefined,
  z: 42
};


for (let prop in a) {
  console.log(prop, a[prop]);
}
