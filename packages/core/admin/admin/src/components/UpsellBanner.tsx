import { Box, Button, Flex, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import { useLicenseLimits } from '@strapi/admin/strapi-admin/ee';

const BannerBackground = styled(Flex)`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary600} 0%,
    ${({ theme }) => theme.colors.alternative600} 121.48%
  );
`;

const UpsellBanner = () => {
  const { formatMessage } = useIntl();
  const { license, isError, isLoading } = useLicenseLimits();

  if (isError || isLoading || !license) {
    return null;
  }

  const { isTrial } = license;

  return (
    isTrial === true && (
      <BannerBackground width="100%" justifyContent="center">
        <Box padding={2}>
          <Typography
            variant="delta"
            fontWeight="bold"
            textColor="neutral0"
            textAlign="center"
            fontSize={2}
          >
            {formatMessage({
              id: 'app.components.UpsellBanner.text',
              defaultMessage: 'Access to Growth plan features: ',
            })}
          </Typography>
          <Typography
            variant="delta"
            textColor="neutral0"
            textAlign="center"
            paddingRight={4}
            fontSize={2}
          >
            {formatMessage({
              id: 'app.components.UpsellBanner.text',
              defaultMessage:
                'As part of your trial, you can explore premium tools such as Content History, Releases, and Single Sign-On (SSO).',
            })}
          </Typography>
          <Button
            variant="tertiary"
            hasRadius
            onClick={() => {
              window.open('https://strapi.chargebeeportal.com', '_blank');
            }}
          >
            {formatMessage({
              id: 'app.components.UpsellBanner.button',
              defaultMessage: 'Upgrade now',
            })}
          </Button>
        </Box>
      </BannerBackground>
    )
  );
};

export { UpsellBanner };
