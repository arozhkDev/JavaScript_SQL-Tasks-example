function projectObject(sourceObj, prototypeObj) {
  const projectedObj = {};

  for (const key in sourceObj) {
    if (key in prototypeObj) {
      if (
        sourceObj[key] &&
        typeof sourceObj[key] === 'object' &&
        prototypeObj[key] &&
        typeof prototypeObj[key] === 'object'
      ) {
        projectedObj[key] = projectObject(sourceObj[key], prototypeObj[key]);
      } else {
        projectedObj[key] = sourceObj[key];
      }
    }
  }

  return projectedObj;
}

const src = {
  prop11: {
    prop21: 21,
    prop22: {
      prop31: 31,
      prop32: 32,
    },
  },
  prop12: 12,
};

const proto = {
  prop11: {
    prop22: null,
  },
};

const res = {
  prop11: {
    prop22: {
      prop31: 31,
      prop32: 32,
    },
  },
};

const projected = projectObject(src, proto);
console.log(projected);
