import type { Rank } from 'mdast-util-toc/lib/search';

export interface TocOptions {
  maxDepth?: Rank;
  skip?: string;
  tight?: boolean;
  ordered?: boolean;
  tocHeading?: string | boolean;
}
