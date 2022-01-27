import React from 'react';
import jQuery from 'jquery';
import 'jquery-ui/ui/widgets/tabs';
import 'jquery-mousewheel';
import 'malihu-custom-scrollbar-plugin';
import Window from './Window';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import '../stylesheets/window-console.css';
import Logger from '../js/utils/logger';

export default class Console extends React.Component {
  componentDidMount() {
    jQuery(() => {
      jQuery('#consoleTabs').tabs();

      if (window.debug) {
        Logger.log('Tabs initialized...');
      }
    });

    Logger.log('Console initialized...');
  }

  render() {
    const background = {
      backgroundImage: "url('/images/backgrounds/background_paper_texture_1920x480.jpg')",
      width: '600px',
      height: '260px',
    };

    return (
      <Window ident="console" background={background}>
        <div
          id="consoleContent"
          className="consoleContainer"
          style={{ width: '600px', height: '240px' }}
        >
          <div id="consoleTabs" className="consoleTabs">
            <ul>
              <li><a href="#console-all"><span>All</span></a></li>
              <li><a href="#console-combat"><span>Combat</span></a></li>
              <li><a href="#console-loot"><span>Loot</span></a></li>
              <li><a href="#console-errors"><span>Errors</span></a></li>
              <li><a href="#console-chat"><span>Chat</span></a></li>
              <li><a href="#console-other"><span>Other</span></a></li>
            </ul>
            <div id="console-all" className="scrollableContainer consoleTab" />
            <div id="console-combat" className="scrollableContainer consoleTab" />
            <div id="console-loot" className="scrollableContainer consoleTab" />
            <div id="console-errors" className="scrollableContainer consoleTab" />
            <div id="console-chat" className="scrollableContainer consoleTab">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat.
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat.
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat.
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat.
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpal.
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="console-other" className="scrollableContainer consoleTab" />
          </div>
        </div>
      </Window>
    );
  }
}
