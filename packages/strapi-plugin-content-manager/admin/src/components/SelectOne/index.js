import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { get, isNull } from 'lodash';
import Select from 'react-select';
import SingleValue from './SingleValue';

function SelectOne({
  components,
  displayFields,
  name,
  isDisabled,
  isLoading,
  onChange,
  onInputChange,
  onMenuClose,
  onMenuOpen,
  onMenuScrollToBottom,
  options,
  placeholder,
  styles,
  value,
}) {
  return (
    <Select
      components={{ ...components, SingleValue }}
      id={name}
      isClearable
      isDisabled={isDisabled}
      isLoading={isLoading}
      mainField={{ name: displayFields[0] }}
      options={options}
      onChange={onChange}
      onInputChange={onInputChange}
      onMenuClose={onMenuClose}
      onMenuOpen={onMenuOpen}
      onMenuScrollToBottom={onMenuScrollToBottom}
      placeholder={placeholder}
      styles={styles}
      value={
        isNull(value)
          ? null
          : { label: `${value.id} - ${displayFields.map(f => get(value, f, '')).join(' ')}`, value }
      }
    />
  );
}

SelectOne.defaultProps = {
  components: {},
  value: null,
};

SelectOne.propTypes = {
  components: PropTypes.object,
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  displayFields: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onMenuClose: PropTypes.func.isRequired,
  onMenuOpen: PropTypes.func.isRequired,
  onMenuScrollToBottom: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.node.isRequired,
  styles: PropTypes.object.isRequired,
  value: PropTypes.object,
};

export default memo(SelectOne);
