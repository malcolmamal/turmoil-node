import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Window from '../../Window';
import ItemSlotStash from './ItemSlotStash';
import ReduxActions from '../../../js/redux/actions';
import '../../../stylesheets/window-stash.css';
import Logger from '../../../js/utils/logger';
import { initializeStashAction } from '../../../js/api/services/instance-service';
import useAfterPaintEffect from '../../../js/react/hooks/after-paint-effect';

function Stash() {
  const stateData = useSelector((state) => state);
  const dispatch = useDispatch();

  const stashedItems = (content) => {
    dispatch(ReduxActions.updateItemsInStashAction({ stashItems: content }));
  };

  useAfterPaintEffect(() => {
    initializeStashAction().then((response) => {
      stashedItems(response.data);

      if (window.debug) {
        Logger.log('Stash initialized...');
      }
    });
  }, []);

  const background = {
    backgroundImage: "url('/images/windows/stash.png')",
    width: '500px',
    height: '700px',
  };

  const { stashItems } = stateData;

  return (
    <Window ident="stash" background={background}>
      <div id="stashItemContainerWrapper">
        <div id="stashItemContainer" className="stashItemContainer">
          {stashItems.map((item) => (
            <ItemSlotStash
              item={item.ident}
              rarity={item.rarity}
              key={item.ident}
              filePath={item.filePath}
              fileCode={item.fileCode}
            />
          ))}
        </div>
      </div>
    </Window>
  );
}

export default connect()(Stash);
