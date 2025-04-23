import { Badge, Flex, Typography } from '@strapi/design-system';
import { Lightning } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';

const GradientBadge = styled(Badge)`
  background: linear-gradient(45deg, #4945ff, #9736e8);
  color: #ffffff !important;
  padding: 4px 10px;
`;

const GradientBadgeWithIcon = () => {
  const { formatMessage } = useIntl();

  return (
    <GradientBadge>
      <Flex gap={1} alignItems="center">
        <Lightning width={16} height={16} fill="neutral1000" />
        <Typography textColor="#ffffff">
          {formatMessage({
            id: 'components.premiumFeature.title',
            defaultMessage: 'Premium feature',
          })}
        </Typography>
      </Flex>
    </GradientBadge>
  );
};

export { GradientBadgeWithIcon as GradientBadge };
