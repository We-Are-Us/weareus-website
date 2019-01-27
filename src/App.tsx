import React from 'react';
import './styles/styles.scss';

// TODO: extract via router
import HomePage from './pages/HomePage';

const App: React.SFC<{}> = () => (
  <div>
    <HomePage
      backgroundImageUrl={
        'https://images.ctfassets.net/xu4zh386cjva/6ghGkkKUW44yCmmuKUIykC/3c2cb9889ae24c99662974a02b63a5b8/1834827.png'
      }
      text={'hello'}
    />
  </div>
);

export default App;
