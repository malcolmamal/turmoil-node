import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Windows from '../js/core/turmoil-windows';
import WindowIcon from './WindowIcon';
import Tooltip from '../js/core/turmoil-tooltip';

function Window(props) {
  const { background: windowContainerInnerStyle, ident, children } = props;

  const [positionX, setPositionX] = useState(parseInt(window.turmoil.windowSettings[ident]?.left || '0', 10));
  const [positionY, setPositionY] = useState(parseInt(window.turmoil.windowSettings[ident]?.top || '0', 10));

  const windowResizerStyle = {
    display: 'none',
  };

  const onStart = () => {
    Tooltip.hideAllTooltips();
    Windows.bringToTheTop(ident);
  };

  const onStop = () => {
    Tooltip.hideAllTooltips();
  };

  const controlledPosition = {
    x: positionX, y: positionY,
  };

  const onControlledDragStop = (e, position) => {
    setPositionX(position.x);
    setPositionY(position.y);

    window.turmoil.windowSettings[ident].left = position.x;
    window.turmoil.windowSettings[ident].top = position.y;
    Windows.saveWindowsPositions();
    onStop();
  };

  return (
    <>
      <WindowIcon ident={ident} />
      <Draggable bounds="parent" handle="strong" axis="both" onStart={onStart} onStop={onControlledDragStop} position={controlledPosition}>
        <div
          id={`window_${ident}_resizer`}
          className={`windowResizer ${ident}WindowResizer noSelection`}
          style={windowResizerStyle}
        >
          <div id={`window_${ident}_wrapper`} className="windowWrapper">
            <strong>
              <div
                id={`handle_${ident}_container`}
                className={`handleContainer ${ident}HandleContainer`}
                style={{ backgroundPosition: '0 -120px' }}
                onClick={() => Windows.bringToTheTop(ident)}
                onDoubleClick={() => Windows.switchMinimizeMaximize(ident)}
                onContextMenu={() => Windows.resizeToDefault(ident)}
              >
                <div className="handleLeft" style={{ backgroundPosition: '0 -120px' }} />
                <div className={`handleBox ${ident}HandleBox`} style={{ textTransform: 'capitalize' }}>{ident}</div>
                <div className="handleRight" style={{ backgroundPosition: '0 -120px' }}>
                  <div id="windowButtons" style={{ height: '40px', width: '75px' }}>
                    <div
                      id={`${ident}ButtonMaximize`}
                      className="icons iconMaximize"
                      style={{
                        position: 'absolute', top: '7px', right: '33px', display: 'none',
                      }}
                      title="maximize"
                      onClick={() => Windows.actionMaximize(ident)}
                    >
&nbsp;
                    </div>
                    <div
                      id={`${ident}ButtonMinimize`}
                      className="icons iconMinimize"
                      style={{ position: 'absolute', top: '7px', right: '33px' }}
                      title="minimize"
                      onClick={() => Windows.actionMinimize(ident)}
                    >
&nbsp;
                    </div>
                    <div
                      className="icons iconClose"
                      style={{ position: 'absolute', top: '7px', right: '8px' }}
                      title="close"
                      onClick={() => Windows.actionClose(ident)}
                    >
&nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </strong>
            <div
              id={`window_${ident}_content_wrapper`}
              style={{ position: 'absolute', top: '40px', left: '0' }}
              onClick={() => Windows.bringToTheTop(ident)}
            >
              <div
                id={`window_${ident}`}
                className={`windowContent ${ident}WindowContent`}
                style={{
                  transform: 'scale(1)', WebkitTransform: 'scale(1)', MozTransform: 'scale(1)', OTransform: 'scale(1)',
                }}
              >
                <div
                  className="windowContentInner"
                  style={windowContainerInnerStyle}
                >
                  <div id={`${ident}ContainerWrapper`} className={`${ident}ContainerWrapper`}>
                    <div id={`${ident}Container`} className={`${ident}Container`}>

                      {children}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </>

  );
}

export default Window;
