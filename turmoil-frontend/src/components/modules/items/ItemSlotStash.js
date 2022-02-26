import React from 'react';
import { connect, useDispatch } from 'react-redux';
import ReduxActions from '../../../js/redux/actions';
import WindowStats from '../../../js/windows/window-stats';
import Tooltip from '../../../js/core/turmoil-tooltip';
import Sound from '../../../js/core/turmoil-sound';
import Permissions from '../../../js/core/turmoil-permissions';
import { equipAction } from '../../../js/api/services/character-service';

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

  const actionRightClickOnStashedItem = async (itemIdent) => {
    Tooltip.hideAllTooltips();

    const response = await equipAction(itemIdent);
    finalizeRightClickOnStashedItem(response.data, updateItems);
    await WindowStats.updateStats(updateCharacterStats);
  };

  const onContextMenuHandler = (event, itemIdent) => {
    event.preventDefault();

    actionRightClickOnStashedItem(itemIdent).then();
  };

  // const iconItemSize = 'big'; // default // TODO: size

  const {
    item, fileCode, rarity, filePath,
  } = props;

  const itemIdent = item;
  const itemFileCode = fileCode;
  const itemRarityClass = rarity;
  const itemImageFile = `url('${filePath}'`;

  return (
    <li
      className="stashItemListEntry"
      id={`stash_item_${itemIdent}`}
      item={itemIdent}
      onContextMenu={(event) => { onContextMenuHandler(event, itemIdent); }}
    >
      <a
        className={`slot slot-mainHand${Tooltip.tooltipClass}`}
        id={`tooltip_${itemFileCode}_${itemIdent}`}
        data-ident={itemIdent}
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
