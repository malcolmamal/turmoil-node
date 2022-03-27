import NodeEnvironment from 'jest-environment-node';

/**
 * Timezone-aware Jest Node environment. Supports `@timezone` JSDoc
 * pragma within test suites to set timezone.
 */
export default class TimezoneAwareNodeEnvironment extends NodeEnvironment {
  constructor(config, context) {
    // Allow test suites to change timezone, even if TZ is passed in a script.
    // Falls back to existing TZ environment variable or UTC if no timezone is specified.
    // IMPORTANT: This must happen before super(config) is called, otherwise
    // it doesn't work.
    process.env.TZ = context.docblockPragmas.timezone || process.env.TZ || 'UTC';

    super(config);
  }
}
