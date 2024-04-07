# rspress-plugin-directives ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-directives)

Rspress plugin to support custom directive transformations.

Although rspress already supports directive syntax, it is limited to support for its built-in components such as `:::warning`, `:::tip`, etc. Beyond these built-in directives, you can't add your own directive-to-component conversion logic.

This plugin allows you to add new custom directives, and conversions from custom directives to global components.

Instead of importing components and using them directly inside an MDX file, with this plugin you can quickly refer to them via directives without importing them.
