import Layout from './turmoil-layout';

const Windows = {
  windowSizes: {
    consoleWidth: 600,
    consoleHeight: 260,
    equipmentWidth: 800,
    equipmentHeight: 830,
    stashWidth: 500,
    stashHeight: 700,
    statsWidth: 300,
    statsHeight: 700,
    locationWidth: 850,
    locationHeight: 810,
  },
  setWindowScale(scale, windowType) {
    document.querySelector(`#window_${windowType}_wrapper`).style.transform = `scale(${scale}, ${scale})`;
  },
  actionMaximize(windowType, setToCenter) {
    // TODO: check if it is necessary (and possible) to move the window higher (so it would not go over the footer)

    Windows.bringToTheTop(windowType);

    const windowContentWrapper = document.querySelector(`#window_${windowType}_content_wrapper`);
    const windowContainer = document.querySelector(`#handle_${windowType}_container`);

    windowContentWrapper.style.display = 'block';
    document.querySelector(`#${windowType}ButtonMaximize`).style.display = 'none';
    document.querySelector(`#${windowType}ButtonMinimize`).style.display = 'block';

    const handleHeight = windowContainer.getBoundingClientRect().bottom - windowContainer.getBoundingClientRect().top;
    const contentHeight = windowContentWrapper.getBoundingClientRect().bottom - windowContentWrapper.getBoundingClientRect().top;
    const totalHeight = Math.round(handleHeight + contentHeight);

    const windowResizer = document.querySelector(`#window_${windowType}_resizer`);
    windowResizer.style.height = `${totalHeight}px`;

    if (setToCenter) {
      Layout.centerContentHorizontally(windowResizer);

      window.turmoil.windowSettings[windowType].left = windowResizer.style.left;
      window.turmoil.windowSettings[windowType].top = windowResizer.style.top;
    }
  },
  actionMinimize(windowType) {
    document.querySelector(`#window_${windowType}_content_wrapper`).style.display = 'none';
    document.querySelector(`#${windowType}ButtonMaximize`).style.display = 'block';
    document.querySelector(`#${windowType}ButtonMinimize`).style.display = 'none';

    const handleContainer = document.querySelector(`#handle_${windowType}_container`);
    const handleHeight = handleContainer.getBoundingClientRect().bottom - handleContainer.getBoundingClientRect().top;
    document.querySelector(`#window_${windowType}_resizer`).style.height = `${Math.round(handleHeight)}px`;
  },
  switchMinimizeMaximize(windowType) {
    if (document.querySelector(`#window_${windowType}_content_wrapper`).style.display === 'none') {
      Windows.actionMaximize(windowType);
    } else {
      Windows.actionMinimize(windowType);
    }
  },
  bringToTheTop(windowType) {
    let highestZIndexValue = 0;

    document.querySelectorAll('.windowResizer').forEach((element) => {
      if (element.style.zIndex > highestZIndexValue) {
        highestZIndexValue = parseInt(element.style.zIndex, 10);
      }
    });

    highestZIndexValue += 1;
    document.querySelector(`#window_${windowType}_resizer`).style.setProperty('z-index', highestZIndexValue);
  },
  resetZIndex() {
    document.querySelectorAll('.windowResizer').forEach((element) => {
      element.style.setProperty('z-index', 0);
    });
  },
  saveWindowsPositions(forceSaveParam) {
    let forceSave = forceSaveParam;
    if (!forceSave) {
      forceSave = false;
    }

    localStorage.setItem('windowSettings', JSON.stringify(window.turmoil.windowSettings));

    // Fetch or whatever ({
    //  url: 'account/saveWindowsSettings/' + encodeURI(JSON.stringify(window.turmoil.windowSettings))
    // });
    // + '&save=' + forceSave
  },
};

export default Windows;
