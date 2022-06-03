import Form from '../Form';
import Divider from '../Divider';
import { useState } from 'react';
import Result from '../Result';

function App() {
  const [result, setResult] = useState(null);
  return (
    <>
      <Form setResult={setResult} />
      {result && <Result {...result} />}
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
