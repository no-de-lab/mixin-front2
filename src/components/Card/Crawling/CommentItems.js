/* eslint-disable linebreak-style */
import React from 'react';

import CommentItem from './CommentItem';
import styles from './comment.module.scss';

export default function CommentItems({ data }) {
  return (
    <div className={styles.commentItems__container}>
      {data ? data.map((d) => (

        <CommentItem key={d.id}>
          <CommentItem.Box>
            <CommentItem.Header
              profileImg={d.profileImg}
              profileName={d.profileName}
              date={d.date}
            />
            <CommentItem.Content>{d.content}</CommentItem.Content>
          </CommentItem.Box>
          <CommentItem.Button self={d.self} />
        </CommentItem>
      )) : []}

    </div>
  );
}
CommentItems.defaultProps = {
  data: [{
    id: 1,
    profileImg: null,
    content: 'pc 용 사파리로 디버깅해보세요\n jstl 자체는 클라이언트 OS 랑 전혀 상관 없습니다 \n자바스크립트 로 문제점을 접근하시면 될것 같아요 \n사용자 세션을 cookie 가 아닌 session으로 관리하시는게 보안적 관점에서 더 추천할만합니다 \n쿠키엔 민감한 정보를 담지 마세요 ㅎㅎㅎ',
    profileName: 'kaka',
    date: '2020.12.01',
    self: false,
  },
  {
    id: 2,
    profileImg: '',
    content: '@kaKa 아 그런가요?\n그렇다면 쿠키를 사용하지 않고 브라우저를 종료해도 로그인을 유지하려면 다른 방법을 사용해야 하나요?',
    profileName: '뭅뭅',
    date: '2020.12.01',
    self: true,
  }],
};
