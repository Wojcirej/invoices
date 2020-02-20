import { SpecReporter } from "jasmine-spec-reporter";
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayFailed: true,
      displayDuration: true
    },
    summary: {
      displayFailed: true
    }
  })
);
