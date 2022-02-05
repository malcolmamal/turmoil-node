import React from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import Window from '../../Window';
import ItemSlotStash from './ItemSlotStash';
import ReduxActions from '../../../js/redux/actions';
import '../../../stylesheets/window-stash.css';
import Logger from '../../../js/utils/logger';
import Fetch from '../../../js/core/turmoil-fetch';
import Windows from '../../../js/core/turmoil-windows';

const mapStateToProps = (state) => ({ stashItems: state.stashItems });

function mapDispatchToProps(dispatch) {
  return {
    updateItems: (stashItems) => dispatch(ReduxActions.updateItemsInStashAction(stashItems)),
  };
}

class Stash extends React.Component {
  constructor(props) {
    super(props);

    this.stashedItems = this.stashedItems.bind(this);
  }

  componentDidMount() {
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
      onSuccess: this.stashedItems,
    }).then();

    Windows.initWindow('stash', true);
  }

  stashedItems(content) {
    const { updateItems } = this.props;
    updateItems({ stashItems: content });
  }

  render() {
    const background = {
      backgroundImage: "url('/images/windows/stash.png')",
      width: '500px',
      height: '700px',
    };

    const { stashItems } = this.props;

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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stash);
