import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import jQuery from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import Window from '../../Window';
import ItemSlotStash from './ItemSlotStash';
import ReduxActions from '../../../js/redux/actions';
import '../../../stylesheets/window-stash.css';
import Logger from '../../../js/utils/logger';
import Fetch from '../../../js/core/turmoil-fetch';
import Windows from '../../../js/core/turmoil-windows';

function Stash() {
  const stateData = useSelector((state) => state);
  const dispatch = useDispatch();

  const stashedItems = (content) => {
    dispatch(ReduxActions.updateItemsInStashAction({ stashItems: content }));
  };

  useEffect(() => {
    const stash = jQuery('#stashItemListContainer');
    stash.sortable({
      // forceHelperSize: true,
      containment: '#stashItemContainer',
      // grid: [ 6, 3 ],
      distance: 45,
      items: '> li',
      update() {
        const resultOrder = jQuery(this).sortable('toArray').toString();
        Logger.log(resultOrder);
      },
    });

    stash.disableSelection();

    if (window.debug) {
      Logger.log('Stash initialized...');
    }

    Fetch.get({
      path: 'instance/initializeStash',
      onSuccess: stashedItems,
    }).then();

    Windows.initWindow('stash', true);
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
          <ul id="stashItemListContainer">

            {stashItems.map((item) => (
              <ItemSlotStash
                item={item.ident}
                rarity={item.rarity}
                key={item.ident}
                filePath={item.filePath}
                fileCode={item.fileCode}
              />
            ))}

          </ul>
        </div>
      </div>
    </Window>
  );
}

export default connect()(Stash);
