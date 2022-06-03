import ImageCanvas from '../ImageCanvas';
import SavingOverlay from '../SavingOverlay';
import PanoViewer from '../PanoViewer';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { getCoords } from '../../utils';
import { getTile } from '../../utils';
import { zoomDimensions, tileSize } from '../../constants';
import Divider from '../Divider';

const Result = ({ url, zoom }) => {
  const sketchRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [savingError, setError] = useState(false);
  const [sketchImage, setSketchImage] = useState(null);

  const { cols, rows } = zoomDimensions[zoom];
  const coords = getCoords(cols, rows);

  const tiles = coords.map((coord) => {
    coord.url = getTile(url, coord.x, coord.y, zoom);
    return coord;
  });

  const saveHandler = () => {
    setSaving(true);
    setError(false);
    new Promise((resolve, reject) => {
      sketchRef.current.sketch.save(resolve, reject);
    })
      .then(() => {
        console.log('Server successfully rendered the image!');
      })
      .catch(() => {
        setError('Server failed to render the image');
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
            key={`${x},${y},${zoom}`}
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
          ref={sketchRef}
          setSketchImage={setSketchImage}
          //new key will completely reset the component, bad practise?
          key={url}
        />
        {saving && <SavingOverlay />}
      </div>
      <button onClick={saveHandler} disabled={saving}>
        Save
      </button>
      <p style={{ fontSize: '12px' }}>
        Image size will be: {cols * tileSize}x{rows * tileSize}
      </p>
      {savingError && <p className={styles.error}>{savingError}</p>}
      <Divider />
      <h2>Panorama Output</h2>
      <p style={{ fontSize: '12px' }}>
        Note: The image being used here may be smaller than the actual saved
        image. Hense why it may be a bit low quality.
      </p>
      {sketchImage && <PanoViewer projection={sketchImage} />}
    </>
  );
};

export default Result;
