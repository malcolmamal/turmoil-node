import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Window from '../../Window';
import ItemSlotEquipment from './ItemSlotEquipment';
import ReduxActions from '../../../js/redux/actions';
import { initializeEquipmentAction } from '../../../js/api/services/instance-service';
import Logger from '../../../js/utils/logger';
import useAfterPaintEffect from '../../../js/react/hooks/after-paint-effect';

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

  useAfterPaintEffect(() => {
    initializeEquipmentAction().then((response) => {
      wornItems(response.data);

      if (window.debug) {
        Logger.log('Equipment initialized...');
      }
    });
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
