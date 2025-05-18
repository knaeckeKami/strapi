/**
 *
 * LeftMenuFooter
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import Wrapper, { A } from './Wrapper';

function LeftMenuFooter({ version }) {
  // The edition label is hardcoded so users can easily identify this fork
  const projectType = 'Codex';

  return (
    <Wrapper>
      <div className="poweredBy">
        <A key="website" href="https://strapi.io" target="_blank" rel="noopener noreferrer">
          Strapi
        </A>
        &nbsp;
        <A
          href={`https://github.com/strapi/strapi/releases/tag/v${version}`}
          key="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          v{version}
        </A>
        &nbsp;
        <A href="https://strapi.io" target="_blank" rel="noopener noreferrer">
          — {projectType} Edition
        </A>
      </div>
    </Wrapper>
  );
}

LeftMenuFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default LeftMenuFooter;
