const Layout = {
  isVerticalScrollPresent() {
    // currently disabled
    return false;
    // return (document.documentElement.scrollHeight !== document.documentElement.clientHeight);
  },
  setProperContentHeight() {
    const turmoilBody = document.querySelector('#turmoilBody');
    const turmoilFooter = document.querySelector('#turmoilFooter');

    let newFooterPosition;
    if (Layout.isVerticalScrollPresent()) {
      // making sure the footer is always at the bottom
      // however there is a problem, if somehow the scroll appears and the footer is moved to the bottom,
      // there is no way to undo the changes currently
      // perhaps going through all the windows and checking bottom positions and comparing to the visible content
      // height would yield some results (changing height if possible)
      // alternatively the scroll could just be disabled (not sure if the mouse scrolling would be still possible
      // then or if that could be disabled as well)
      newFooterPosition = Math.round(
        document.documentElement.scrollHeight - turmoilFooter.offsetHeight,
      );
    } else {
      newFooterPosition = Math.round(
        window.innerHeight - turmoilFooter.offsetHeight,
      );
    }

    turmoilFooter.style.top = `${newFooterPosition}px`;

    const headerPosition = document
      .getElementById('turmoilHeader')
      .getBoundingClientRect().bottom;
    const footerPosition = document
      .getElementById('turmoilFooter')
      .getBoundingClientRect().top;
    const contentHeight = Math.round(footerPosition - headerPosition - 2);

    turmoilBody.style.height = `${contentHeight}px`;

    const tallContentContainer = document.querySelector(
      '.tallContentContainer',
    );

    if (tallContentContainer) {
      tallContentContainer.style.height = turmoilBody.offsetHeight - 25;
    }
  },
  setCenteredContent() {
    // TODO: we don't have it at the moment (was it removed?) but login form would be an example of centered content
    Layout.centerContentVertically(
      document.querySelector('#centeredContentWrapper'),
    );
  },
  centerContentVertically(centeredContentWrapperElement) {
    const centeredContentWrapper = centeredContentWrapperElement;

    if (centeredContentWrapper) {
      let parentOffset = 0;
      if (centeredContentWrapper.parent()) {
        parentOffset = centeredContentWrapper
          .parent()
          .get(0)
          .getBoundingClientRect().top;
      }
      const halfOfContentHeight = Math.round(
        (centeredContentWrapper.get(0).getBoundingClientRect().bottom -
          centeredContentWrapper.get(0).getBoundingClientRect().top) /
          2,
      );
      const halfOfWindowHeight = Math.round(window.innerHeight / 2);

      let topPosition = halfOfWindowHeight - halfOfContentHeight - parentOffset;
      if (topPosition < 0) {
        topPosition = 0;
      }

      centeredContentWrapper.style.top = `${topPosition}px`;
    }
  },
  centerContentHorizontally(centeredContentWrapper) {
    if (centeredContentWrapper.length) {
      let parentOffset = 0;
      if (centeredContentWrapper.parent().length) {
        parentOffset = centeredContentWrapper
          .parent()
          .get(0)
          .getBoundingClientRect().left;
      }
      const halfOfContentWidth = Math.round(
        (centeredContentWrapper.get(0).getBoundingClientRect().right -
          centeredContentWrapper.get(0).getBoundingClientRect().left) /
          2,
      );
      const halfOfWindowWidth = Math.round(window.innerWidth / 2);

      let leftPosition = halfOfWindowWidth - halfOfContentWidth - parentOffset;
      if (leftPosition < 0) {
        leftPosition = 0;
      }

      centeredContentWrapper.css('left', `${leftPosition}px`);
    }
  },
  setLayout() {
    Layout.setProperContentHeight();
    Layout.setCenteredContent();
  },
  showSpinner() {
    document.querySelector('#spinner').style.display = 'block';
  },
  hideSpinner() {
    document.querySelector('#spinner').style.display = 'none';
  },
  hideSpinnerWithDelay() {
    setTimeout(() => {
      Layout.hideSpinner();
    }, 100);
  },
  resizeEvent: function resizeEvent() {
    Layout.setLayout();
  },
};

export default Layout;
