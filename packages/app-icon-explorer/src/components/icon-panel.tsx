import React from 'react';
import {Icon} from '@shopify/polaris';
import {camelCase} from 'lodash';

import {Icon as IconInterface} from '../types';

interface Props {
  icon: IconInterface;
}

export default function IconPanel({icon}: Props) {
  const status = icon.public ? 'public' : 'private';

  return (
    <div>
      <Icon source={<div dangerouslySetInnerHTML={{__html: icon.svg}} />} />
      <h3>{icon.name}</h3>
      <div>{icon.date_added}</div>
      <div>{icon.date_modified}</div>
      <div dangerouslySetInnerHTML={{__html: icon.descriptionHtml}} />
      <div>{icon.set}</div>
      <div>{icon.basename}</div>
      <div>{status}</div>
      <div>
        Usage: <code>{`<Icon source={${camelCase(icon.basename)}} />`}</code>
      </div>
      <ul>
        {icon.authors.map((author) => (
          <li key={icon.id + author}>{author}</li>
        ))}
      </ul>
      <ul>
        {icon.keywords.map((keyword) => (
          <li key={icon.id + keyword}>{keyword}</li>
        ))}
      </ul>
    </div>
  );
}
