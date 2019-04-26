# Contexts

Application attributes, properties, configuration, and settings.

Since these are mainly **read-only** values (they aren't meant to change often, if at all), they're separated from the application store state to avoid bloating it up, which is already tight for performance given it's one huge immutable object that gets recreated each state change.

Example values that can be held in contexts:

- theme provider
- translations provider
- feature flags provider
- configuration provider
- attributes/settings provider
