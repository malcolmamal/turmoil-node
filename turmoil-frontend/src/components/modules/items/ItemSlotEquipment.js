import React from 'react';
import { connect, useDispatch } from 'react-redux';
import ReduxActions from '../../../js/redux/actions';
import WindowStats from '../../../js/windows/window-stats';
import Sound from '../../../js/core/turmoil-sound';
import WindowLocation from '../../../js/windows/window-location';
import Permissions from '../../../js/core/turmoil-permissions';
import Logger from '../../../js/utils/logger';
import { unequipAction } from '../../../js/api/services/character-service';
import Item from './Item';

function ItemSlotEquipment(props) {
  const dispatch = useDispatch();

  const finalizeRightClickOnEquipment = (data, callbackFunction) => {
    if (data != null && data.success === true) {
      if (data.itemForStash) {
        switch (data.itemForStash.type) {
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

        if (typeof callbackFunction === 'function') {
          callbackFunction(data.itemForStash);
        }
      }
    }
  };

  const updateItems = (item) => {
    dispatch(ReduxActions.updateItemsInEquipmentAction({ itemToRemove: item }));
    dispatch(ReduxActions.updateItemsInStashAction({ itemToAdd: item }));

    Permissions.enableActions();
  };

  const updateCharacterStats = (characterState) => {
    dispatch(ReduxActions.updateCharacterStatsAction(characterState));
  };

  const actionRightClickOnEquipment = async (item) => {
    if (item.ident) {
      const response = await unequipAction(item.ident);
      finalizeRightClickOnEquipment(response.data, updateItems);
      await WindowStats.updateStats(updateCharacterStats);
    }
  };

  const onContextMenuHandler = (event, item) => {
    event.preventDefault();
    if (item.ident) {
      actionRightClickOnEquipment(item).catch(Logger.error);
    }
  };

  const { item: propItem, iconItemSize: propIconItemSize, top, left } = props;
  const item = propItem || {};

  const rarity = item.rarity ? item.rarity : 'gray';
  const itemIdent = item.ident ? item.ident : '';

  const tooltipId = item.ident ? `tooltip_${item.fileCode}_${item.ident}` : '';

  const iconItemSize = propIconItemSize || 'default';
  const itemBackgroundImage = item.filePath ? `url(${item.filePath})` : '';
  const positionStyle = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
  };
  const className = `d3-icon d3-icon-item d3-icon-item-large d3-icon-item-${rarity}`;

  const rightHandEffect =
    item.slot === 'slot_right_hand' && item.damageType ? (
      <span
        id="slot_right_hand_effect"
        className={`item-weapon-bg-${item.damageType}`}
        style={{
          position: 'absolute',
          top: '150px',
          left: '67px',
          width: '150px',
          height: '210px',
        }}
      />
    ) : (
      ''
    );

  const leftHandEffect =
    item.slot === 'slot_left_hand' && item.damageType ? (
      <span
        id="slot_left_hand_effect"
        className={`item-weapon-bg-${item.damageType}`}
        style={{
          position: 'absolute',
          top: '77px',
          left: '602px',
          width: '150px',
          height: '210px',
        }}
      />
    ) : (
      ''
    );

  WindowLocation.setAttackType(item);

  return (
    <div
      onContextMenu={(event) => {
        onContextMenuHandler(event, item);
      }}
    >
      {rightHandEffect}
      {leftHandEffect}

      <Item
        ident={itemIdent}
        tooltipId={tooltipId}
        backgroundImage={itemBackgroundImage}
        iconClass={`icon-item-${iconItemSize}`}
        className={className}
        slotStyle={positionStyle}
      />
    </div>
  );
}

export default connect()(ItemSlotEquipment);
