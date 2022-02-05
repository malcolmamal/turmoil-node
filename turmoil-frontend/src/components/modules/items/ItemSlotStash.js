import React from 'react';
import { connect } from 'react-redux';
import ReduxActions from '../../../js/redux/actions';
import WindowStats from '../../../js/windows/window-stats';
import Tooltip from '../../../js/core/turmoil-tooltip';
import Sound from '../../../js/core/turmoil-sound';
import Permissions from '../../../js/core/turmoil-permissions';
import Fetch from '../../../js/core/turmoil-fetch';

function mapDispatchToProps(dispatch) {
  return {
    updateCharacterStats: (characterState) => dispatch(ReduxActions.updateCharacterStatsAction(characterState)),
    updateEquipmentItems: (equipmentItems) => dispatch(ReduxActions.updateItemsInEquipmentAction(equipmentItems)),
    updateStashItems: (stashItems) => dispatch(ReduxActions.updateItemsInStashAction(stashItems)),
  };
}

class ItemSlotStash extends React.Component {
  static actionRightClickOnStashedItem(itemId, updateItems) {
    Tooltip.hideAllTooltips();

    Fetch.get({
      path: `character/equip/${itemId}`,
      onSuccess: ItemSlotStash.finalizeRightClickOnStashedItem,
      onSuccessThis: updateItems,
      blockActions: true,
    }).then();
  }

  static finalizeRightClickOnStashedItem(data, callbackFunction) {
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
  }

  constructor(props) {
    super(props);

    this.updateItems = this.updateItems.bind(this);
  }

  onContextMenuHandler(event, itemId) {
    event.preventDefault();

    ItemSlotStash.actionRightClickOnStashedItem(itemId, this.updateItems);
    const { updateCharacterStats } = this.props;
    WindowStats.updateStats(updateCharacterStats);
  }

  updateItems(itemForStash, itemForEquipment) {
    const { updateStashItems, updateEquipmentItems } = this.props;
    updateStashItems({ itemToAdd: itemForStash, itemToRemove: itemForEquipment });
    updateEquipmentItems({ itemToAdd: itemForEquipment });

    Permissions.enableActions();
  }

  render() {
    // const iconItemSize = 'big'; // default // TODO: size

    const {
      item, fileCode, rarity, filePath,
    } = this.props;

    const itemId = item;
    const itemFileCode = fileCode;
    const itemRarityClass = rarity;
    const itemImageFile = `url('${filePath}'`;

    return (
      <li
        className="stashItemListEntry"
        id={`stash_item_${itemId}`}
        item={itemId}
        onContextMenu={(event) => { this.onContextMenuHandler(event, itemId); }}
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
}

export default connect(
  null,
  mapDispatchToProps,
)(ItemSlotStash);
