import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import jQuery from 'jquery';
import Window from '../../Window';
import ItemSlotEquipment from './ItemSlotEquipment';
import ReduxActions from '../../../js/redux/actions';
import Tooltip from '../../../js/core/turmoil-tooltip';
import Fetch from '../../../js/core/turmoil-fetch';
import Windows from '../../../js/core/turmoil-windows';

function Equipment() {
  const stateData = useSelector((state) => state);
  const dispatch = useDispatch();

  const prepareEquipmentItems = (equipmentItems) => {
    const preparedItems = { ...window.turmoil.equipment.defaultItems };
    equipmentItems.forEach((item) => {
      preparedItems[item.slot].item = item;
    });

    return Object.values(preparedItems);
  };

  const wornItems = (content) => {
    dispatch(ReduxActions.updateItemsInEquipmentAction({ wornItems: content }));
  };

  useEffect(() => {
    Object.keys(window.turmoil.equipment.defaultItems).forEach((value) => {
      jQuery(`#${value}`).draggable({
        revert: true,
        start() {
          Tooltip.hideAllTooltips();
        },
        stop() {
          Tooltip.hideAllTooltips();
        },
      });
    });

    Fetch.get({
      path: 'instance/initializeEquipment',
      onSuccess: wornItems,
    }).then();

    Windows.initWindow('equipment', true);
  }, []);

  const { equipmentItems } = stateData;
  const preparedEquipmentItems = prepareEquipmentItems(equipmentItems);

  return (
    <Window ident="equipment">
      <div
        id="equipmentContent"
        className="equipmentContainer"
        style={{ width: '800px', height: '830px' }}
      >
        <div
          id="window_equipment"
          className="windowContent equipmentWindowContent"
          style={{
            transform: 'scale(1)', WebkitTransform: 'scale(1)', MozTransform: 'scale(1)', OTransform: 'scale(1)',
          }}
        >
          <div
            className="windowContentInner equipmentBackground"
            style={{ width: '800px', height: '830px' }}
          >
            {preparedEquipmentItems.map((item) => (
              <ItemSlotEquipment
                item={item.item}
                slot={item.slot}
                top={item.top}
                left={item.left}
                key={item.slot}
                iconItemSize={item.iconItemSize ? item.iconItemSize : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

export default connect()(Equipment);
