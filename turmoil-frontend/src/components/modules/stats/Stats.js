import React, { useEffect } from 'react';
import Window from '../../Window';
import CharacterState from './CharacterState';
import '../../../stylesheets/window-stats.css';
import Windows from '../../../js/core/turmoil-windows';

function Stats() {
  const background = {
    backgroundImage: "url('/images/backgrounds/background_brown_fabric_300x700.png')",
    width: '300px',
    height: '700px',
  };

  useEffect(() => {
    Windows.initWindow('stats', true);
  }, []);

  return (
    <Window ident="stats" background={background}>
      <div
        id="statsContent"
        className="scrollableContainer statsContainer"
        style={{ width: '284px', height: '680px' }}
      >
        <CharacterState />
      </div>
    </Window>
  );
}

export default Stats;
