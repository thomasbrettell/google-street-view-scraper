import Sketch from 'react-p5';
import styles from './styles.module.scss';
import { serverUrl, tileSize } from '../../constants';

const sendImageBufferToServer = async (data) => {
  const res = await fetch(`${serverUrl}tinify`, {
    method: 'POST',
    body: JSON.stringify({ data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(res);
};

const ImageCanvas = ({ tiles, rows, cols }) => {
  const preload = (p5) => {
    p5.tiles = tiles.map((tile) => {
      tile.img = p5.loadImage(tile.url);
      return tile;
    });
  };

  const setup = (p5, canvasParentRef) => {
    p5.tileWidth = window.innerWidth / cols;
    p5.canvas = p5
      .createCanvas(window.innerWidth, p5.tileWidth * rows)
      .parent(canvasParentRef);
    p5.full = false;

    p5.canvas.mousePressed(() => {
      //for some reason the compressed image comes out double the dimensions
      //dividing the desired height by 2 to make it smaller
      //the canvas needs to be resized to the actual size that the rendered image should be 
      
      const newWidth = (tileSize * cols) / 2
      const newHeight = (tileSize * rows) / 2
      p5.tileWidth = newWidth / cols;
      p5.resizeCanvas(newWidth, newHeight);

      setTimeout(() => {
        const base64 = p5.canvas.canvas.toDataURL('image/jpeg').split(',')[1];
        sendImageBufferToServer(base64);
        p5.tileWidth = window.innerWidth / cols;
        p5.resizeCanvas(window.innerWidth, p5.tileWidth * rows);
      }, 100);
    });
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
  };

  return (
    <Sketch
      className={styles['image-canvas']}
      preload={preload}
      setup={setup}
      draw={draw}
    />
  );
};

export default ImageCanvas;
