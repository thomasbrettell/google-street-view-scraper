import { useRef, useState } from 'react';
import styles from './App.module.scss';
import { getCoords } from '../../utils';
import { getTile } from '../../utils';
import { zoomDimensions, defaultZoomLevel, tileSize } from '../../constants';
import ImageCanvas from '../ImageCanvas';
import Divider from '../Divider';
import SavingOverlay from '../SavingOverlay';

const { cols, rows } = zoomDimensions[defaultZoomLevel];
const coords = getCoords(cols, rows);

const tiles = coords.map((coord) => {
  coord.url = getTile(coord.x, coord.y, defaultZoomLevel);
  return coord;
});

console.log(`Image size will be: ${cols * tileSize}x${rows * tileSize}`);

function App() {
  const sketchRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const saveHandler = () => {
    setSaving(true);
    new Promise((resolve, reject) => {
      sketchRef.current.sketch.save(resolve, reject);
    })
      .then(() => {
        console.log('Server successfully rendered the image!');
      })
      .catch(() => {
        console.error('Server failed to render the image');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <>
      <h2>Tile Images</h2>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {tiles.map(({ x, y, url }, i) => (
          <div
            key={`${x},${y},${defaultZoomLevel}`}
            data-grid-id={i}
            className={styles['grid-item']}
          >
            <div className={styles.coords}>
              {x},{y}
            </div>
            <img src={url} alt='Tile' className={styles.image} />
          </div>
        ))}
      </div>
      <Divider />
      <h2>Stitched Image</h2>
      <div className={styles['image-canvas-wrapper']}>
        <ImageCanvas
          tiles={tiles}
          rows={rows}
          cols={cols}
          onSave={saveHandler}
          ref={sketchRef}
        />
        {saving && <SavingOverlay />}
      </div>
      <button onClick={saveHandler} disabled={saving}>
        Save
      </button>
      <Divider />
      <h2>Useful links/documentation</h2>
      <ul>
        <li>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://developers.google.com/maps/documentation/javascript/streetview#CreatingPanoramas'
          >
            Google Street View Custom Panorama documentation
          </a>
        </li>
        <li>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://en.wikipedia.org/wiki/Equirectangular_projection'
          >
            Explanation of Equirectangular projection
          </a>
        </li>
      </ul>
    </>
  );
}

export default App;
