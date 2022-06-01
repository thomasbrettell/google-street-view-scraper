import Sketch from 'react-p5';
import styles from './styles.module.scss';
import tinify from 'tinify';

console.log(tinify);

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

    p5.graphic = p5.createGraphics(p5.width, p5.height);

    p5.canvas.mousePressed(() => {
      console.log(
        p5.canvas.drawingContext.getImageData(0, 0, p5.width, p5.height)
      );
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
