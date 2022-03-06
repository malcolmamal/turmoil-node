import Logger from '../utils/logger';

const Sound = {
  playAudio(audio) {
    const sound = new Audio(window.turmoil.sounds[audio]);
    sound.load();
    sound.play().then().catch((err) => {
      sound.pause(); Logger.log('Due to an error had to stop the sound prematurely', err);
    });
  },
  playAudioLoop(audio, suffix) {
    const ident = `${audio}_${suffix}`;
    const sound = new Audio(window.turmoil.sounds[audio]);
    window.turmoil.soundLoops[ident] = sound;
    window.turmoil.soundLoops[`${ident}_loop`] = true;

    sound.load();
    sound.addEventListener('ended', function onSoundEnd() {
      if (window.turmoil.soundLoops[`${ident}_loop`]) {
        this.currentTime = 0;
        window.turmoil.soundLoopsPromises[ident] = this.play();
      }
    }, false);

    window.turmoil.soundLoopsPromises[ident] = sound.play();
  },
  stopAudioLoop(audio, suffix) {
    const ident = `${audio}_${suffix}`;
    if (window.turmoil.soundLoops[ident]) {
      const sound = window.turmoil.soundLoops[ident];
      const playPromise = window.turmoil.soundLoopsPromises[ident];

      if (playPromise !== undefined) {
        playPromise.then(() => {
          sound.pause();
        })
          .catch((err) => {
            if (!err.toString().includes('failed because the user didn\'t interact with the document')) {
              Logger.log('sound pause catch', err);
            }
          });
      }

      window.turmoil.soundLoops[ident] = null;
      window.turmoil.soundLoopsPromises[ident] = null;
      window.turmoil.soundLoops[`${ident}_loop`] = false;
    }
  },
};

export default Sound;
