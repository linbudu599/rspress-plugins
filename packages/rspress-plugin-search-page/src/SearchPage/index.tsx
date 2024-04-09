import React, { useEffect, useState } from 'react';
import { usePageData, useDark, useSearchParams } from 'rspress/runtime';
import {
  DefaultMatchResult,
  MatchResult,
  useFullTextSearch,
} from 'rspress/theme';

import './index.less';

const DefaultSearchQueryKey = 'q';

export default function SearchPage() {
  const dark = useDark();

  const data = usePageData();

  const [imperativeSearchRes, setImperativeSearchRes] = useState<MatchResult>(
    [],
  );

  const [params] = useSearchParams();
  const searchQuery = params.get(DefaultSearchQueryKey);

  const { initialized, search } = useFullTextSearch();

  useEffect(() => {
    if (!searchQuery) return;
    if (!initialized) return;

    search(searchQuery)
      .then((res) => {
        console.log('res: ', res);
        setImperativeSearchRes(res);
      })
      .catch((err) => {
        setImperativeSearchRes([]);
      });
  }, [initialized, searchQuery]);

  return (
    <div>
      <h1>SearchPage</h1>
      <p>Search query: {searchQuery}</p>
      {imperativeSearchRes.length > 0 && (
        <ul>
          {imperativeSearchRes.map((res: DefaultMatchResult) => {
            return (
              <ul>
                {res.result.map((res) => {
                  return (
                    <li>
                      <span>{res.title}</span>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </ul>
      )}
    </div>
  );
}
