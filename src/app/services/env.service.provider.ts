import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
    // Create env
    const env = new EnvService();

    // Read environment variables from browser window
    const browserWindow = window || {};
    const browserWindowEnv = browserWindow['__env'] || {};

    // Assign environment variables from browser window to env
    // In the current implementation, properties from env.js overwrite defaults from the EnvService.
    // If needed, a deep merge can be performed here to merge properties instead of overwriting them.

    // make env.js update
    makeENVDynamic(browserWindowEnv, env);

    if (!browserWindowEnv.enableENV) {
        return env;
    }
    else {
        for (const key in browserWindowEnv) {
            if (browserWindowEnv.hasOwnProperty(key)) {
                env[key] = window['__env'][key];
            }
        }
        return env;
    }
};
export const makeENVDynamic = (browserWindowEnv, env) => {
    for (const key in browserWindowEnv) {
        if (browserWindowEnv.hasOwnProperty(key))
            window['__env'][key] = env[key];
    }
}
export const EnvServiceProvider = {
    provide: EnvService,
    useFactory: EnvServiceFactory,
    deps: [],
};