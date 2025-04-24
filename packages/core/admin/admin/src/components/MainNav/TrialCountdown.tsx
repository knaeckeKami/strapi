import { Flex, Menu, Tooltip } from '@strapi/design-system';
import { Lightning } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';

const MenuTrigger = styled(Menu.Trigger)`
  height: ${({ theme }) => theme.spaces[7]};
  width: ${({ theme }) => theme.spaces[7]};
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 0;
  overflow: hidden;
`;
const LightningComponent = styled(Lightning)`
  fill: linear-gradient(90deg, #4945ff 0%, #9736e8 121.48%);
  margin: 1px 0 0 4px;
`;

const TrialCountdown = () => {
  const { formatMessage } = useIntl();

  return (
    <Flex justifyContent="center" padding={3}>
      <Menu.Root>
        <MenuTrigger endIcon={null} fullWidth justifyContent="center">
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
            <LightningComponent />
          </Tooltip>
        </MenuTrigger>
      </Menu.Root>
    </Flex>
  );
};

export { TrialCountdown };
