'use client';

import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {IoMdDownload, IoMdClose} from 'react-icons/io';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{outcome: 'accepted' | 'dismissed'}>;
};

const InstallButton = styled.button`
  position: fixed;
  bottom: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 999px;
  background-color: #00a495;
  color: white;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 2000;
`;

const IosHint = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  right: 24px;
  max-width: 360px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 10px;
  background-color: #212529;
  color: white;
  font-size: 13px;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 2000;
`;

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  color: white;
  opacity: 0.7;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  display: flex;
`;

const IOS_HINT_DISMISSED_KEY = 'conanwiki-ios-install-hint-dismissed';

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & {standalone?: boolean}).standalone ===
      true
  );
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function App_pwaInstall() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // 설치 버튼/안내는 모바일 기기에서만 노출
    if (!isMobileDevice() || isStandalone()) return;

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);

    const onAppInstalled = () => setInstallEvent(null);
    window.addEventListener('appinstalled', onAppInstalled);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const alreadyDismissed = localStorage.getItem(IOS_HINT_DISMISSED_KEY);
    if (isIOS && !alreadyDismissed) {
      setShowIosHint(true);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        onBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  };

  const dismissIosHint = () => {
    setShowIosHint(false);
    localStorage.setItem(IOS_HINT_DISMISSED_KEY, '1');
  };

  if (installEvent) {
    return (
      <InstallButton onClick={handleInstallClick}>
        <IoMdDownload /> 앱 설치
      </InstallButton>
    );
  }

  if (showIosHint) {
    return (
      <IosHint>
        <span>
          공유 버튼을 누른 뒤 &quot;홈 화면에 추가&quot;를 선택하면 앱처럼
          설치할 수 있어요.
        </span>
        <CloseBtn onClick={dismissIosHint} aria-label="닫기">
          <IoMdClose />
        </CloseBtn>
      </IosHint>
    );
  }

  return null;
}
