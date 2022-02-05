import React from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import Window from '../../Window';
import ItemSlotEquipment from './ItemSlotEquipment';
import ReduxActions from '../../../js/redux/actions';
import Tooltip from '../../../js/core/turmoil-tooltip';
import Fetch from '../../../js/core/turmoil-fetch';
import Windows from '../../../js/core/turmoil-windows';

const mapStateToProps = (state) => ({ equipmentItems: state.equipmentItems });

function mapDispatchToProps(dispatch) {
  return {
    updateItems: (equipmentItems) => dispatch(ReduxActions.updateItemsInEquipmentAction(equipmentItems)),
  };
}

class Equipment extends React.Component {
  static prepareEquipmentItems(equipmentItems) {
    const preparedItems = { ...window.turmoil.equipment.defaultItems };
    equipmentItems.forEach((item) => {
      preparedItems[item.slot].item = item;
    });

    return Object.values(preparedItems);
  }

  constructor(props) {
    super(props);

    this.wornItems = this.wornItems.bind(this);
  }

  componentDidMount() {
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
      onSuccess: this.wornItems,
    }).then();

    Windows.initWindow('equipment', true);
  }

  wornItems(content) {
    const { updateItems } = this.props;
    updateItems({ wornItems: content });
  }

  render() {
    const { equipmentItems } = this.props;
    const preparedEquipmentItems = Equipment.prepareEquipmentItems(equipmentItems);

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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Equipment);
