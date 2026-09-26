import {makeRouteHandler} from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';
import {isKeystaticAdminEnabled} from '../../../../utils/keystaticAdmin';

// GitHub App 환경변수가 없는 배포(예: 관리자를 쓰지 않는 Vercel 프로젝트)에서는
// makeRouteHandler가 빌드 중 예외를 던지므로, 그런 경우엔 404를 돌려주는 핸들러로 대체한다.
const disabledHandler = () =>
  new Response('Keystatic admin is not configured.', {status: 404});

export const {POST, GET} = isKeystaticAdminEnabled()
  ? makeRouteHandler({config})
  : {POST: disabledHandler, GET: disabledHandler};
