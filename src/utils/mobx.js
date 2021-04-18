/* Async/Await을 하면 오류 처리를 try-catch 로 해야하는데
   여러 exception을 처리하는 경우가 아니라면 개인적으로 아래의 방법을 선호합니다.
   (Go에서 오류 핸들링하는 방법과 유사하게 구현했습니다.)
*/
export const handleAsync = (promise) => promise
  .then((res) => [res, undefined])
  .catch((error) => Promise.resolve([undefined, error]));
