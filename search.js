import names from './names.json'
import Fuse from 'fuse.js/dist/fuse.basic.esm.js'

function search(name) {
  const options = {
    // shouldSort: true,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.6,
    // distance: 100,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [ "name" ],
  };
  const fuse = new Fuse(names, options);
  return fuse.search(name)
}

export default search;