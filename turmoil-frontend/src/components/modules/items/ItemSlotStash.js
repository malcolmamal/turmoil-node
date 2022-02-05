import React from 'react';
import { connect, useDispatch } from 'react-redux';
import ReduxActions from '../../../js/redux/actions';
import WindowStats from '../../../js/windows/window-stats';
import Tooltip from '../../../js/core/turmoil-tooltip';
import Sound from '../../../js/core/turmoil-sound';
import Permissions from '../../../js/core/turmoil-permissions';
import Fetch from '../../../js/core/turmoil-fetch';

function ItemSlotStash(props) {
  const dispatch = useDispatch();

  const finalizeRightClickOnStashedItem = (data, callbackFunction) => {
    if (data != null && data.success === true) {
      if (data.itemForEquipment) {
        switch (data.itemForEquipment.type) {
          case 'ACCESSORY':
            Sound.playAudio('soundAccessoryJewellery');
            break;
          case 'ARMOR':
            Sound.playAudio('soundMediumArmor');
            break;
          case 'WEAPON':
            Sound.playAudio('soundWeapon');
            break;
          default:
        }
      }

      if (typeof (callbackFunction) === 'function') {
        callbackFunction(data.itemForStash, data.itemForEquipment);
      }
    }
  };

  const updateCharacterStats = (characterState) => {
    dispatch(ReduxActions.updateCharacterStatsAction(characterState));
  };

  const updateItems = (itemForStash, itemForEquipment) => {
    dispatch(ReduxActions.updateItemsInStashAction({ itemToAdd: itemForStash, itemToRemove: itemForEquipment }));
    dispatch(ReduxActions.updateItemsInEquipmentAction({ itemToAdd: itemForEquipment }));

    Permissions.enableActions();
  };

  const actionRightClickOnStashedItem = (itemId) => {
    Tooltip.hideAllTooltips();

    Fetch.get({
      path: `character/equip/${itemId}`,
      onSuccess: finalizeRightClickOnStashedItem,
      onSuccessThis: updateItems,
      blockActions: true,
    }).then(() => {
      WindowStats.updateStats(updateCharacterStats);
    }).catch((error) => { console.error(error); });
  };

  const onContextMenuHandler = (event, itemId) => {
    event.preventDefault();

    actionRightClickOnStashedItem(itemId);
  };

  // const iconItemSize = 'big'; // default // TODO: size

  const {
    item, fileCode, rarity, filePath,
  } = props;

  const itemId = item;
  const itemFileCode = fileCode;
  const itemRarityClass = rarity;
  const itemImageFile = `url('${filePath}'`;

  return (
    <li
      className="stashItemListEntry"
      id={`stash_item_${itemId}`}
      item={itemId}
      onContextMenu={(event) => { onContextMenuHandler(event, itemId); }}
    >
      <a
        className={`slot slot-mainHand${Tooltip.tooltipClass}`}
        id={`tooltip_${itemFileCode}_${itemId}`}
        data-ident={itemId}
        data-tooltip-type="item"
      >
        <span className={`stashItem d3-icon d3-icon-item stash-icon-item-large d3-icon-item-${itemRarityClass}`}>
          <span className="icon-item-gradient">
            <span
              className="icon-item-inner stash-icon-item-default"
              style={{ backgroundImage: itemImageFile }}
            />
          </span>
        </span>
      </a>
    </li>
  );
}

export default connect()(ItemSlotStash);
