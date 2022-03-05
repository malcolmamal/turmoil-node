import tippy, { hideAll } from 'tippy.js';
import '../../stylesheets/turmoil-tooltip.css';
import Logger from '../utils/logger';
import { Axios } from './turmoil-axios';

const Tooltip = {
  emptyContent: "<div id='something-_ID_'>_CONTENT_</div>",
  tooltipContents: {},

  hideAllTooltips() {
    // TODO: might not be needed after changing to tippy
    hideAll({ duration: 0 });
  },
  prepareTooltip: function prepareTooltip(id, data) {
    Tooltip.tooltipContents[id] = Tooltip.emptyContent.replace('_CONTENT_', data).replace('_ID_', id);
    document.querySelector(`#something-${id}`).innerHTML = data;
  },
  initForIdent: (ident) => {
    if (!ident) {
      return;
    }
    const element = document.querySelectorAll(`[data-ident="${ident}"]`)[0];
    const type = element.dataset.tooltipType;

    tippy(element, {
      content: `Loading tooltip for ${type}:${ident}...`,
      placement: 'right-start',
      arrow: true,
      allowHTML: true,
      duration: [100, 0],
      onShow(instance) {
        if (type === 'monster' && !window.pressedKeys.shift) {
          instance.setContent(null);
          return;
        }

        let content = Tooltip.emptyContent.replace('_CONTENT_', '').replace('_ID_', ident);
        if (type !== 'monster' && Tooltip.tooltipContents[ident]) {
          // TODO: low priority but it would be nice to figure out if we actually need to fetch monster tooltip every time
          content = Tooltip.tooltipContents[ident];
        } else {
          // hide all the other existing tooltips
          Tooltip.hideAllTooltips();

          Axios.post(`tooltip/${type}/${ident}`).then((response) => {
            Tooltip.prepareTooltip(ident, response.data);
          }).catch((err) => {
            Logger.log('Tooltip error', ident, err);
          });
        }

        instance.setContent(content);
      },
    });
  },
};

export default Tooltip;
