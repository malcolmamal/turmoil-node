import React from 'react';
import { connect, useDispatch } from 'react-redux';
import ReduxActions from '../../../js/redux/actions';
import WindowStats from '../../../js/windows/window-stats';
import Tooltip from '../../../js/core/turmoil-tooltip';
import Sound from '../../../js/core/turmoil-sound';
import Permissions from '../../../js/core/turmoil-permissions';
import { equipAction } from '../../../js/api/services/character-service';
import Item from './Item';

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
  const itemImageFile = `url('${filePath}'`;
  const className = `stashItem d3-icon d3-icon-item stash-icon-item-large d3-icon-item-${rarity}`;

  return (
    <div
      className="stashItemListEntry"
      id={`stash_item_${itemIdent}`}
      item={itemIdent}
      onContextMenu={(event) => { onContextMenuHandler(event, itemIdent); }}
    >
      <Item
        ident={itemIdent}
        tooltipId={`tooltip_${itemFileCode}_${itemIdent}`}
        backgroundImage={itemImageFile}
        iconClass="stash-icon-item-default"
        className={className}
      />
    </div>
  );
}

export default connect()(ItemSlotStash);
