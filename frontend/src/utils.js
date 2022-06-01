export const getCoords = (cols, rows) => {
  const coords = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      coords.push({
        x,
        y,
      });
    }
  }
  return coords;
};

function replaceUrlParam(url, paramName, paramValue) {
  if (paramValue == null) {
    paramValue = '';
  }
  let pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, '$1' + paramValue + '$2');
  }
  url = url.replace(/[?#]$/, '');
  return (
    url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
  );
}

//street
// return `https://streetviewpixels-pa.googleapis.com/v1/tile?cb_client=maps_sv.tactile_lite_mobile&panoid=O6Nptd9rMjF0GjK96ssZAw&x=${x}&y=${y}&zoom=${z}&nbt=1&fover=2`;

//abc ultimo
// return `https://streetviewpixels-pa.googleapis.com/v1/tile?cb_client=maps_sv.tactile&panoid=dbizASK4ARu3rwKMmZeDQw&x=${x}&y=${y}&zoom=${z}&nbt=1&fover=2`;
// return `https://streetviewpixels-pa.googleapis.com/v1/tile?cb_client=maps_sv.tactile&panoid=dbizASK4ARu3rwKMmZeDQw&x=${x}&y=${y}&zoom=${z}&nbt=1&fover=2`;

export const getTile = (x, y, z) => {
  //this a bit janky
  return replaceUrlParam(
    replaceUrlParam(
      replaceUrlParam(
        'https://streetviewpixels-pa.googleapis.com/v1/tile?cb_client=maps_sv.tactile&panoid=dbizASK4ARu3rwKMmZeDQw&x=0&y=0&zoom=0&nbt=1&fover=2',
        'x',
        x
      ),
      'y',
      y
    ),
    'zoom',
    z
  );
};
