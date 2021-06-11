import React from 'react';
import { observer } from 'mobx-react-lite';
import HomeCrawlItems from '../../../layout/crawling/HomeCrawItems';

function Bookmark(props) {
  const {articles} = props;
  return (
    <HomeCrawlItems articles={articles} />
  );
};

export default observer(Bookmark);