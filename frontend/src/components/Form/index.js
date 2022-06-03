import styles from './styles.module.scss';
import { defaultZoomLevel, defaultUrl } from '../../constants';
import { useState } from 'react';

const Form = () => {
  const [url, setUrl] = useState(defaultUrl);
  const [zoom, setZoom] = useState(defaultZoomLevel);
  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <label>URL</label>
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className={styles.input}>
        <label>
          Zoom Level [{zoom}]
        </label>
        <input
          type='range'
          min='1'
          max='5'
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
        />
      </div>
      <button type='submit'>submit</button>
    </form>
  );
};

export default Form;
