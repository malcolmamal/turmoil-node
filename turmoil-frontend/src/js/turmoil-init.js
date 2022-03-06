import moment from 'moment';

// utils
import Utils from './core/turmoil-utils';
import Logger from './utils/logger';

// styles
import '../stylesheets/turmoil-general.css';
import '../stylesheets/turmoil-windows.css';

// sounds
import soundMoveLeather from '../media/audio/move_leather.wav';
import soundAttackMelee1 from '../media/audio/attack_melee_001.wav';
import soundAttackMelee2 from '../media/audio/attack_melee_002.wav';
import soundAttackMelee3 from '../media/audio/attack_melee_003.wav';
import soundAttackBow1 from '../media/audio/attack_bow_001.wav';
import soundAttackBow2 from '../media/audio/attack_bow_002.wav';
import soundAttackBow3 from '../media/audio/attack_bow_003.wav';
import soundAccessoryJewellery from '../media/audio/change_bling_004.wav';
import soundMediumArmor from '../media/audio/change_medium_002.wav';
import soundWeapon from '../media/audio/change_weapon_004.wav';
import Sound from './core/turmoil-sound';

// consts
import Consts from './core/turmoil-consts';

// axios
import initAxios from './core/turmoil-axios';

initAxios();

window.debug = true;
window.debugPopup = true;

window.turmoil = {
  settings: {
    delayBetweenActions: 550, // TODO: this timeout should be a setting for user
  },
};

window.turmoil.equipment = {};
window.turmoil.equipment.defaultItems = {
  slot_right_hand: {
    slot: 'slot_right_hand', top: 175, left: 90, item: {},
  },
  slot_left_hand: {
    slot: 'slot_left_hand', top: 105, left: 625, item: {},
  },

  slot_amulet: {
    slot: 'slot_amulet', top: 165, left: 355, item: {}, iconItemSize: 'square',
  },
  slot_ring_one: {
    slot: 'slot_ring_one', top: 100, left: 10, item: {}, iconItemSize: 'square',
  },
  slot_ring_two: {
    slot: 'slot_ring_two', top: 100, left: 705, item: {}, iconItemSize: 'square',
  },
  slot_ring_three: {
    slot: 'slot_ring_three', top: 175, left: 10, item: {}, iconItemSize: 'square',
  },
  slot_ring_four: {
    slot: 'slot_ring_four', top: 175, left: 705, item: {}, iconItemSize: 'square',
  },

  slot_helm: {
    slot: 'slot_helm', top: 20, left: 355, item: {},
  },
  slot_chest: {
    slot: 'slot_chest', top: 245, left: 355, item: {},
  },
  slot_belt: {
    slot: 'slot_belt', top: 395, left: 347, item: {}, iconItemSize: 'long',
  },
  slot_pants: {
    slot: 'slot_pants', top: 480, left: 355, item: {},
  },
  slot_boots: {
    slot: 'slot_boots', top: 635, left: 355, item: {},
  },
  slot_pauldrons: {
    slot: 'slot_pauldrons', top: 105, left: 220, item: {},
  },
  slot_gloves: {
    slot: 'slot_gloves', top: 35, left: 90, item: {},
  },
  slot_bracers: {
    slot: 'slot_bracers', top: 105, left: 500, item: {},
  },
};

window.turmoil.instance = {
  activeUnit: null,
  isActive: true,
  attackType: Consts.ATTACK_TYPE_MELEE,
  polygonsInRange: [],
  units: {},
};

window.turmoil.sounds = {
  soundMoveLeather,
  soundAttackMelee1,
  soundAttackMelee2,
  soundAttackMelee3,
  soundAttackBow1,
  soundAttackBow2,
  soundAttackBow3,
  soundAccessoryJewellery,
  soundMediumArmor,
  soundWeapon,
};

window.turmoil.soundLoops = {};
window.turmoil.soundLoopsPromises = {}; // promises: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted

window.turmoil.windowSettings = localStorage.getItem('windowSettings') === null ? {} : JSON.parse(localStorage.getItem('windowSettings'));

window.turmoil.lastLogDate = null;
window.turmoil.log = (content, targetParam) => {
  let target = targetParam;
  if (!targetParam) {
    target = 'all';
  }

  Logger.log(`[${target}]`, content);

  const consoleTarget = document.querySelector(`#console-${target}`);
  if (consoleTarget) {
    let currentDate;
    if (typeof (moment) === 'function') {
      currentDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    } else {
      currentDate = Utils.getCurrentDateTime();
    }
    currentDate = `[${currentDate}] `;

    const currentDateObject = new Date();
    if (window.turmoil.lastLogDate != null) {
      const difference = currentDateObject.getTime() - window.turmoil.lastLogDate.getTime();
      currentDate += ` (${difference}ms) `;
    }

    /**
     * TODO: do not create divs, use store
     */

    const div = document.createElement('div');
    div.append(`${currentDate + content}`);

    const consoleTargetContent = document.querySelector(`#console-${target}`);
    consoleTargetContent.prepend(div);

    // temporarily commented out till store is added for tabs
    // if (target !== 'all') {
    //   const allConsoleTargetContent = document.querySelector('#console-all');
    //   allConsoleTargetContent.prepend(div.cloneNode(true));
    // }

    window.turmoil.lastLogDate = currentDateObject;
  } else {
    Logger.log(`[${target}]`, content);
  }
};

window.turmoil.logDebug = (content) => {
  let caller = '';
  if (typeof (arguments) === 'object') {
    if (typeof (this.callee) === 'function' && typeof (this.callee.name) === 'string') {
      caller = `${this.callee.name}() - `;
    }
  }
  window.turmoil.log(caller + content, 'all');
  Logger.log('[debug]', caller + content);
};

window.turmoil.logCombat = (content) => {
  window.turmoil.log(content, 'combat');
};

window.turmoil.logErrors = (content) => {
  window.turmoil.log(content, 'errors');
};

window.pressedKeys = {
  alt: false,
  ctrl: false,
  shift: false,
};

function checkKeys(e) {
  window.pressedKeys.alt = e.altKey;
  window.pressedKeys.ctrl = e.ctrlKey;
  window.pressedKeys.shift = e.shiftKey;
}

window.onkeyup = checkKeys;
window.onkeydown = checkKeys;

Sound.audioReady().then(() => {
  Logger.log('Audio assets initialized...');
});
