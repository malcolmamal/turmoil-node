class Logger {
  static log = (...args) => {
    let dataToLog = args;
    if (args.length === 1) {
      [dataToLog] = args;
    }

    // eslint-disable-next-line no-console
    console.log(dataToLog);
  };

  static error = (...args) => {
    let dataToLog = args;
    if (args.length === 1) {
      [dataToLog] = args;
    }

    // eslint-disable-next-line no-console
    console.error(dataToLog);
  };
}

export default Logger;
