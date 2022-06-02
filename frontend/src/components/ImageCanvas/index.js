import Sketch from 'react-p5';
import styles from './styles.module.scss';
import { serverUrl, tileSize } from '../../constants';
import { forwardRef } from 'react';

const sendImageBufferToServer = async (data) => {
  await fetch(`${serverUrl}tinify`, {
    method: 'POST',
    body: JSON.stringify({ data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const ImageCanvas = forwardRef(({ tiles, rows, cols, setSketchImage }, ref) => {
  const preload = (p5) => {
    p5.tiles = tiles.map((tile) => {
      tile.img = p5.loadImage(tile.url);
      return tile;
    });
  };

  const setup = (p5, canvasParentRef) => {
    const parentWidth = ref.current.canvasParentRef.current.clientWidth;

    p5.tileWidth = parentWidth / cols;
    p5.canvas = p5
      .createCanvas(parentWidth, p5.tileWidth * rows)
      .parent(canvasParentRef);
    p5.full = false;

    p5.save = (resolve, reject) => {
      const parentWidth = ref.current.canvasParentRef.current.clientWidth;

      //todo
      //work out why this is. its not a big deal tho
      //for some reason the compressed image comes out double the dimensions
      //dividing the desired height by 2 to make it smaller

      //the canvas needs to be resized to the actual size that the rendered image should be
      const newWidth = (tileSize * cols) / 2;
      const newHeight = (tileSize * rows) / 2;
      p5.tileWidth = newWidth / cols;
      p5.resizeCanvas(newWidth, newHeight);

      return setTimeout(async () => {
        const base64 = p5.canvas.canvas.toDataURL('image/jpeg').split(',')[1];
        p5.tileWidth = parentWidth / cols;
        p5.resizeCanvas(parentWidth, p5.tileWidth * rows);
        sendImageBufferToServer(base64)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      }, 100);
    };
  };

  const draw = (p5) => {
    p5.tiles.forEach(({ x, y, img }) => {
      p5.image(
        img,
        p5.tileWidth * x,
        p5.tileWidth * y,
        p5.tileWidth,
        p5.tileWidth
      );
    });
    p5.noLoop();
    //DONT REMOVE THE ^noLoop^ WITHOUT REMOVING THE vSTATE SETTERv BELOW
    setSketchImage(p5.canvas.canvas.toDataURL('image/jpeg'));
  };

  const windowResized = (p5) => {
    const parentWidth = ref.current.canvasParentRef.current.clientWidth;
    p5.tileWidth = parentWidth / cols;
    p5.resizeCanvas(parentWidth, p5.tileWidth * rows);
  };

  return (
    <Sketch
      ref={ref}
      className={styles['image-canvas']}
      preload={preload}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      style={{
        paddingBottom: `${(rows / cols) * 100}%`,
      }}
    />
  );
});

export default ImageCanvas;
