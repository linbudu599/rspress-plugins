export const presetClassName = 'rp-file-tree';

export function buildClassName(fragment?: string) {
  return fragment?.length ? `${presetClassName}-${fragment}` : presetClassName;
}
