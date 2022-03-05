import React, { useEffect } from 'react';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import Window from './Window';
import '../stylesheets/window-console.css';
import Logger from '../js/utils/logger';
import Windows from '../js/core/turmoil-windows';

function Console() {
  useEffect(() => {
    if (window.debug) {
      Logger.log('Tabs initialized...');
    }

    Logger.log('Console initialized...');

    Windows.initWindow('console', true);
  }, []);

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
          <Tabs defaultIndex={1} onSelect={(index) => console.log('tab', index)}>
            <TabList className="react-tabs__tab-list-console">
              <Tab>All</Tab>
              <Tab>Combat</Tab>
              <Tab>Loot</Tab>
              <Tab>Errors</Tab>
              <Tab>Chat</Tab>
              <Tab>Other</Tab>
            </TabList>

            <TabPanel>
              <div id="console-all" className="scrollableContainer consoleTab"><div>all</div></div>
            </TabPanel>
            <TabPanel>
              <div id="console-combat" className="scrollableContainer consoleTab"><div>combat</div></div>
            </TabPanel>
            <TabPanel>
              <div id="console-loot" className="scrollableContainer consoleTab" />
            </TabPanel>
            <TabPanel>
              <div id="console-errors" className="scrollableContainer consoleTab" />
            </TabPanel>
            <TabPanel>
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
                tincidunt ut laoreet dolore magna aliquam erat volutpat.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
                tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
                tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
                tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumy nibh euismod
              </div>
            </TabPanel>
            <TabPanel>
              <div id="console-other" className="scrollableContainer consoleTab" />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Window>
  );
}

export default Console;
