import type { Rank } from 'mdast-util-toc/lib/search';

export interface TocOptions {
  useOfficialComponent?: boolean;
  maxDepth?: Rank;
  skip?: string;
  tight?: boolean;
  ordered?: boolean;
  tocHeading?: string | boolean;
}
