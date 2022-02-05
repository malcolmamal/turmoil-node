import jQuery from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import Logger from '../utils/logger';

export const addDraggable = (ident, config) => {
  jQuery(ident).draggable(config);
};

export const addResizable = (ident, config) => {
  jQuery(ident).resizable(config);
};

export const addSortable = (ident, containmentElement) => {
  const stash = jQuery(ident);
  stash.sortable({
    // forceHelperSize: true,
    containment: containmentElement,
    // grid: [ 6, 3 ],
    distance: 45,
    items: '> li',
    update() {
      const resultOrder = jQuery(this).sortable('toArray').toString();
      Logger.log(resultOrder);
    },
  });

  stash.disableSelection();
};
