import tippy from 'tippy.js';
import '../../stylesheets/turmoil-tooltip.css';
import Logger from '../utils/logger';
import { Axios } from './turmoil-axios';

const Tooltip = {
  tooltipContents: {},

  cacheTooltip: (ident, data) => {
    if (Tooltip.tooltipContents[ident]) {
      return;
    }

    Tooltip.tooltipContents[ident] = data;
  },
  initForIdent: (ident) => {
    if (!ident) {
      console.trace('Tooltip should not be called for this trace');

      return;
    }

    const element = document.querySelector(`[data-ident="${ident}"]`);
    const type = element.dataset.tooltipType;

    tippy(element, {
      content: `Loading tooltip for ${type}:${ident}...`,
      placement: 'right-start',
      arrow: true, // the arrow currently does not show
      allowHTML: true,
      duration: [100, 0],
      onShow(instance) {
        if (type === 'monster' && !window.pressedKeys.shift) {
          instance.setContent(null);
          return;
        }

        if (Tooltip.tooltipContents[ident]) {
          instance.setContent(Tooltip.tooltipContents[ident]);
          return;
        }

        Axios.post(`tooltip/${type}/${ident}`).then((response) => {
          if (type === 'monster' || type === 'friend') {
            instance.setContent(response.data);
            return;
          }

          Tooltip.cacheTooltip(ident, response.data);
          instance.setContent(Tooltip.tooltipContents[ident]);
        }).catch((err) => {
          Logger.log('Tooltip error', ident, err);
        });
      },
    });
  },
};

export default Tooltip;
