import styles from './App.module.scss';
import { getCoords } from '../../utils';
import { getTile } from '../../utils';
import { zoomDimensions, defaultZoomLevel, tileSize } from '../../constants';
import ImageCanvas from '../ImageCanvas';

const { cols, rows } = zoomDimensions[defaultZoomLevel];
const coords = getCoords(cols, rows);

const tiles = coords.map((coord) => {
  coord.url = getTile(coord.x, coord.y, defaultZoomLevel);
  return coord;
});

console.log(`Image size will be: ${cols * tileSize}x${rows * tileSize}`);

function App() {
  return (
    <>
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
      <ImageCanvas tiles={tiles} rows={rows} cols={cols} />
    </>
  );
}

export default App;
