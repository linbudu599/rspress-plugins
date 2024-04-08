import chalk from 'chalk';
import ghpages from 'gh-pages';
import { logger } from '@rspress/shared/logger';

import type { MarkRequired } from 'rspress-plugin-devkit';
import type { RspressPlugin } from '@rspress/shared';

const DefaultDocBuildOutput = 'doc_build';

interface RspressPluginGHPagesOptions
  extends MarkRequired<ghpages.PublishOptions, 'repo'> {
  directory?: string;
  silent?: boolean;
  siteBase?: string;
}

const logPrefix = chalk.green('[gh-pages]');

function normalizeBase(base: string): string {
  return base === '/' || base === ''
    ? '/'
    : `/${base.replace(/^\/+|\/+$/g, '')}/`;
}

export default function rspressPluginGHPages(
  options: RspressPluginGHPagesOptions,
): RspressPlugin {
  const {
    repo,
    directory,
    branch = 'gh-pages',
    silent = false,
    siteBase = '',
    ...publishOptions
  } = options;

  return {
    name: 'rspress-plugin-gh-pages',
    config(config) {
      let baseFromRepo = repo.includes('github.io')
        ? '/'
        : /\/([^\/]+)\.git$/.exec(repo)?.[1];

      // Use || here to as ?? will consider '' as a valid value
      const base = siteBase || baseFromRepo || '';

      if (!base) {
        logger.warn(
          `${logPrefix} Failed to parse base from repo, site base path will not be updated.`,
        );

        return config;
      }

      config.base = normalizeBase(base);

      return config;
    },
    async afterBuild(config, isBuild) {
      if (!repo) {
        logger.error(
          `Option ${chalk.cyan('repo')} is required for rspress-plugin-gh-pages.`,
        );
      }

      if (!isBuild) return;

      const publishDir = directory ?? config.outDir ?? DefaultDocBuildOutput;

      if (!silent) {
        logger.info(
          `${logPrefix} Publish directory: ${chalk.cyan(publishDir)}`,
        );
        logger.info(`${logPrefix} Publish branch: ${chalk.cyan(branch)}`);
      }

      try {
        await ghpages.publish(publishDir, {
          repo,
          branch,
          ...publishOptions,
        });
      } catch (error) {
        silent
          ? void 0
          : logger.error(`${logPrefix} Failed to publish: ${error}`);
        process.exit(1);
      }

      silent ? void 0 : logger.success(`${logPrefix} Page Published.`);
    },
  };
}
