import { Flex, Menu, Tooltip, StrapiTheme } from '@strapi/design-system';
import { Lightning } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import React, { ReactNode } from 'react';
import { useLicenseLimits } from '@strapi/admin/strapi-admin/ee';

const LightningComponent = styled(Lightning)`
  fill: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary600} 0%,
    ${({ theme }) => theme.colors.alternative600} 121.48%
  );
`;

// CircleProgressBar component
const CircleBackground = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.neutral150};
`;

const CircleProgress = styled.circle<{
  $dashArray: number;
  $dashOffset: number;
  $strokeColor?: keyof StrapiTheme['colors'];
}>`
  fill: none;
  stroke: ${({ theme, $strokeColor }) => theme.colors[$strokeColor || 'neutral800']};
  stroke-dasharray: ${({ $dashArray }) => $dashArray};
  stroke-dashoffset: ${({ $dashOffset }) => $dashOffset};
  stroke-linecap: round;
  stroke-linejoin: round;
`;

type CircleProgressBarProps = {
  percentage: number;
  circleWidth: number;
  children?: ReactNode;
  strokeWidth?: number;
  strokeColor?: keyof StrapiTheme['colors'];
};

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({
  percentage,
  circleWidth,
  children,
  strokeWidth = 2,
  strokeColor = 'primary600',
}) => {
  const realPercentage = percentage > 100 ? 100 : percentage;
  const radius = circleWidth / 2 - strokeWidth;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * realPercentage) / 100;

  return (
    <div>
      <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
        <CircleBackground
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={`${strokeWidth}px`}
          r={radius}
        />
        <CircleProgress
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={`${strokeWidth}px`}
          $strokeColor={strokeColor}
          r={radius}
          $dashArray={dashArray}
          $dashOffset={dashOffset}
          transform={`rotate(-90, ${circleWidth / 2}, ${circleWidth / 2})`}
        />
        <LightningComponent x="10" y="10" />
      </svg>
    </div>
  );
};

// TrialCountdown component
type TrialCountdownProps = {
  daysLeftInTrial: number;
};

const MenuTrigger = styled(Menu.Trigger)`
  height: ${({ theme }) => theme.spaces[7]};
  width: ${({ theme }) => theme.spaces[7]};
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 0;
  overflow: hidden;
`;

const TrialCountdown = ({ daysLeftInTrial }: TrialCountdownProps) => {
  const { formatMessage } = useIntl();
  const { license, isError, isLoading } = useLicenseLimits();

  if (isError || isLoading || !license) {
    return null;
  }

  const { isTrial } = license;

  return (
    isTrial === true && (
      <Flex justifyContent="center" padding={3}>
        <Menu.Root>
          <Tooltip
            label={formatMessage(
              {
                id: 'app.components.LeftMenu.trialCountdown',
                defaultMessage: 'Your trial ends on ',
              },
              {
                date: 'April 1, 2025',
              }
            )}
            side="right"
          >
            <MenuTrigger endIcon={null} fullWidth justifyContent="center">
              <CircleProgressBar
                percentage={((30 - daysLeftInTrial) * 100) / 30}
                circleWidth={32}
              />
            </MenuTrigger>
          </Tooltip>
        </Menu.Root>
      </Flex>
    )
  );
};

export { TrialCountdown };
