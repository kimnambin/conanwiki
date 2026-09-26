// Keystatic 관리자(/keystatic)를 켤 수 있는 환경인지 판단한다. (서버 전용)
// - 개발 환경(next dev)은 로컬 스토리지를 쓰므로 항상 켠다.
// - 운영 환경은 GitHub 스토리지를 쓰는데, GitHub App 값이 없으면 makeRouteHandler가
//   빌드 중에 예외를 던져 배포 전체가 실패한다. 그래서 값이 모두 있을 때만 켠다.
export function isKeystaticAdminEnabled(): boolean {
  if (process.env.NODE_ENV === 'development') return true;

  return Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );
}
