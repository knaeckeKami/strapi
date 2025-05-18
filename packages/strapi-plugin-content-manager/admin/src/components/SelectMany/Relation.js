/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useIntl } from 'react-intl';
import { RelationDPState } from 'strapi-helper-plugin';
import { getDisplayedValue, getTrad } from '../../utils';
import IconRemove from '../../assets/images/icon_remove.svg';
import { Span } from './components';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

const Relation = ({
  data,
  displayNavigationLink,
  hasDraftAndPublish,
  isDisabled,
  isDragging,
  mainField,
  onRemove,
  searchToPersist,
  to,
}) => {
  const { formatMessage } = useIntl();
  const cursor = useMemo(() => {
    if (isDisabled) {
      return 'not-allowed';
    }

    if (!displayNavigationLink) {
      return 'default';
    }

    return 'pointer';
  }, [displayNavigationLink, isDisabled]);
  const { pathname } = useLocation();
  const isDraft = isEmpty(data.published_at);
  const titleLabelID = isDraft
    ? 'components.Select.draft-info-title'
    : 'components.Select.publish-info-title';
  const stateTitle = hasDraftAndPublish
    ? formatMessage({ id: getTrad(titleLabelID) })
    : '';

  const value = data[mainField.name];
  const mainDisplay = getDisplayedValue(
    mainField.schema.type,
    value,
    mainField.name
  );
  const formattedValue =
    mainField.name === 'id' ? `${data.id}` : `${data.id} - ${mainDisplay}`;
  let displayTitle = displayNavigationLink ? formattedValue : '';

  if (isDragging || !displayNavigationLink) {
    displayTitle = '';
  }

  return (
    <>
      <div style={{ cursor }} title={displayTitle}>
        <div className="dragHandle">
          <span />
        </div>
        {hasDraftAndPublish && (
          <div>
            <RelationDPState isDraft={isDraft} title={stateTitle} />
          </div>
        )}
        {displayNavigationLink ? (
          <Link
            to={{ pathname: to, state: { from: pathname }, search: searchToPersist }}
            title={displayTitle}
          >
            <Span>{formattedValue}&nbsp;</Span>
          </Link>
        ) : (
          <Span title={displayTitle}>{formattedValue}&nbsp;</Span>
        )}
      </div>
      <div style={{ cursor, width: 'auto' }}>
        <img src={IconRemove} alt="Remove Icon" onClick={onRemove} />
      </div>
    </>
  );
};

Relation.defaultProps = {
  isDragging: false,
  onRemove: () => {},
  searchToPersist: null,
  to: '',
};

Relation.propTypes = {
  data: PropTypes.object.isRequired,
  displayNavigationLink: PropTypes.bool.isRequired,
  hasDraftAndPublish: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool,
  mainField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    schema: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
  searchToPersist: PropTypes.string,
  to: PropTypes.string,
};

export default memo(Relation);
