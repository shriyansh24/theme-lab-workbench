import React from 'react';
import type { ThemeColors } from '../../imports/themes';
import { sans } from '../../imports/shared';
import { MockShell } from '../../imports/Shell';
import { MockDashboard } from '../../imports/MockDashboard';
import { MockJobs } from '../../imports/MockJobs';
import { MockPipeline } from '../../imports/MockPipeline';
import { MockAnalytics } from '../../imports/MockAnalytics';
import { MockCopilot } from '../../imports/MockCopilot';
import { MockSettings } from '../../imports/MockSettings';
import { MockLogin } from '../../imports/MockLogin';
import { MockVault } from '../../imports/MockVault';
import { MockNetworking } from '../../imports/MockNetworking';
import { MockCompanies } from '../../imports/MockCompanies';

interface ScreenPreviewProps {
  colors: ThemeColors;
  screen: string;
  radius?: number;
  height?: number;
}

export function ScreenPreview({ colors, screen, radius = 0, height = 420 }: ScreenPreviewProps) {
  // Login has no shell
  if (screen === 'Login') {
    return (
      <div style={{ height, overflow: 'hidden', ...sans }}>
        <MockLogin c={colors} r={radius} />
      </div>
    );
  }

  const screenMap: Record<string, React.FC<{ c: ThemeColors; r?: number }>> = {
    Dashboard: MockDashboard,
    Jobs: MockJobs,
    Pipeline: MockPipeline,
    Analytics: MockAnalytics,
    Copilot: MockCopilot,
    Settings: MockSettings,
    Vault: MockVault,
    Networking: MockNetworking,
    Companies: MockCompanies,
  };

  const Screen = screenMap[screen] || MockDashboard;

  return (
    <div style={{ height, overflow: 'hidden', ...sans }}>
      <MockShell c={colors} r={radius} activeRoute={screen}>
        <Screen c={colors} r={radius} />
      </MockShell>
    </div>
  );
}