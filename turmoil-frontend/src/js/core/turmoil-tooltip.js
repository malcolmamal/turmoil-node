import tippy, { hideAll } from 'tippy.js';
import '../../stylesheets/turmoil-tooltip.css';
import Logger from '../utils/logger';
import { Axios } from './turmoil-axios';

const Tooltip = {
  emptyContent: "<div id='something-_ID_'>_CONTENT_</div>",
  tooltipContents: {},

  hideAllTooltips() {
    // TODO: might not be needed after changing to tippy, need to check and/or remove usages
    hideAll({ duration: 0 });
  },
  prepareTooltip: function prepareTooltip(id, data) {
    Tooltip.tooltipContents[id] = Tooltip.emptyContent.replace('_CONTENT_', data).replace('_ID_', id);
    const contentArea = document.querySelector(`#something-${id}`);
    if (contentArea) {
      contentArea.innerHTML = data;
    }
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

        let content = Tooltip.emptyContent.replace('_CONTENT_', '').replace('_ID_', ident);
        if (type !== 'monster' && Tooltip.tooltipContents[ident]) {
        // TODO: low priority but it would be nice to figure out if we actually need to fetch monster tooltip every time
          content = Tooltip.tooltipContents[ident];
        } else {
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
