import tippy from 'tippy.js';
import useAfterPaintEffect from '../../js/react/hooks/after-paint-effect';
import { Axios } from '../../js/core/turmoil-axios';
import Logger from '../../js/utils/logger';

function Tooltip(props) {
  let tooltipValue = null;
  const { ident } = props;

  useAfterPaintEffect(() => {
    if (ident) {
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

          if (tooltipValue) {
            instance.setContent(tooltipValue);
            return;
          }

          Axios.post(`tooltip/${type}/${ident}`).then((response) => {
            if (type === 'monster' || type === 'friend') {
              instance.setContent(response.data);
              return;
            }

            tooltipValue = response.data;
            instance.setContent(tooltipValue);
          }).catch((err) => {
            Logger.log('Tooltip error', ident, err);
          });
        },
      });
    }
  });

  return null;
}

export default Tooltip;
