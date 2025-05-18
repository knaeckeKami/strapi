/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useIntl } from 'react-intl';
import { RelationDPState } from 'strapi-helper-plugin';
import { getTrad } from '../../utils';
import IconRemove from '../../assets/images/icon_remove.svg';
import { Span } from './components';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

const Relation = ({
  data,
  displayNavigationLink,
  hasDraftAndPublish,
  isDisabled,
  isDragging,
  displayFields,
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
  let title = hasDraftAndPublish
    ? formatMessage({ id: getTrad(titleLabelID) })
    : formatMessage({ id: getTrad('containers.Edit.clickToJump') });

  const mainDisplay = displayFields.map(field => data[field]).join(' ');
  const formattedValue = `${data.id} - ${mainDisplay}`;

  if (isDragging || !displayNavigationLink) {
    title = '';
  }

  return (
    <>
      <div style={{ cursor }} title={title}>
        <div className="dragHandle">
          <span />
        </div>
        {hasDraftAndPublish && (
          <div>
            <RelationDPState isDraft={isDraft} />
          </div>
        )}
        {displayNavigationLink ? (
          <Link
            to={{ pathname: to, state: { from: pathname }, search: searchToPersist }}
            title={title}
          >
            <Span>{formattedValue}&nbsp;</Span>
          </Link>
        ) : (
          <Span>{formattedValue}&nbsp;</Span>
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
  displayFields: PropTypes.array.isRequired,
  onRemove: PropTypes.func,
  searchToPersist: PropTypes.string,
  to: PropTypes.string,
};

export default memo(Relation);
