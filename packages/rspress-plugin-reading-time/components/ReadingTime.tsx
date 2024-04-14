import React, { useState, useEffect } from 'react';
import { usePageData, useLang, useDark } from 'rspress/runtime';

import type { ReadTimeResults } from 'reading-time';
import type { PresetLocale, WithDefaultLocale } from 'rspress-plugin-devkit';

import './ReadingTime.less';

interface RspressReadingTimeComponentProps extends WithDefaultLocale {}

const presetReadingTimeBuilder: Record<
  PresetLocale,
  (result: ReadTimeResults) => string
> = {
  'zh-CN': (result: ReadTimeResults) => {
    return `预计阅读时间: ${result.minutes >= 1 ? `${Math.ceil(result.minutes)} 分钟` : '小于 1 分钟'}`;
  },
  'en-US': (result: ReadTimeResults) => {
    return `Estimated reading time: ${result.minutes >= 1 ? `${Math.ceil(result.minutes)} minutes` : 'less than 1 minute'}`;
  },
};

function getReadingTimeText(
  result: ReadTimeResults,
  lang: string,
  defaultLocale: PresetLocale,
) {
  const langKey = Object.keys(presetReadingTimeBuilder).includes(lang)
    ? lang
    : defaultLocale;

  return presetReadingTimeBuilder[langKey](result);
}

export const RspressReadingTimeComponent: React.FC<
  RspressReadingTimeComponentProps
> = (props) => {
  const { defaultLocale = 'en-US' } = props;
  const pageData = usePageData();
  const pageReadingTime = pageData.page.readingTimeData as ReadTimeResults;

  const lang = useLang();
  const dark = useDark();

  const [readingTime, setReadingTime] = useState<string>(
    getReadingTimeText(pageReadingTime, lang, defaultLocale),
  );

  useEffect(() => {
    setReadingTime(getReadingTimeText(pageReadingTime, lang, defaultLocale));
  }, [lang, pageReadingTime]);

  return (
    <span data-dark={String(dark)} className="rp-reading-time">
      {readingTime}
    </span>
  );
};

export default RspressReadingTimeComponent;
