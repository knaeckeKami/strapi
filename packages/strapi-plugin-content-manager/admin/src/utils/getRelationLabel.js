import get from 'lodash/get';

const getRelationLabel = (displayFields, item) => {
  if (!Array.isArray(displayFields)) {
    displayFields = [displayFields];
  }
  return displayFields
    .map(field => get(item, field, ''))
    .filter(v => v !== '')
    .join(' ');
};

export default getRelationLabel;
