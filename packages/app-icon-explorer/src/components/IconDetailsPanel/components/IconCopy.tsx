import React, {useState} from 'react';
import {Tooltip} from '@shopify/polaris';
import styles from './IconCopy.module.scss';

interface Props {
  reactname: string;
}

export default function IconCopy({reactname}: Props) {
  const [toolTipText, setToolTipText] = useState('Copy to clipboard');

  const copyParent = React.createRef<HTMLDivElement>();

  function copyToClipboard() {
    const copyContent = copyParent.current ? copyParent.current.innerText : '';

    const textarea = document.createElement('textarea');
    textarea.innerHTML = copyContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    if (copyParent && copyParent.current) {
      copyParent.current.focus();
    }

    setToolTipText('Copied to clipboard');
    if ((window as any).gtag) {
      (window as any).gtag('event', 'copy_snippet', {
        /* eslint-disable-next-line camelcase */
        event_category: 'icons',
        /* eslint-disable-next-line camelcase */
        event_label: reactname,
      });
    }

    setTimeout(() => {
      setToolTipText('Copy to clipboard');
    }, 1500);
  }

  return (
    <Tooltip content={toolTipText}>
      {/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-tabindex */}
      <div
        className={styles.codeHighlight}
        onClick={copyToClipboard}
        ref={copyParent}
        tabIndex={0}
      >
        {/* eslint-enable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-tabindex */}
        <span className={styles.syntaxIconName}>import</span>
        <span className={styles.syntaxIconComponent}>
          {' {'}
          <br />
          {`  ${reactname}`}
          <br />
          {'} '}
        </span>
        <span className={styles.syntaxIconName}>
          from {`'@shopify/polaris-icons'`};
        </span>
        <br />
        <br />
        <span className={styles.syntaxIconTag}>&lt;Icon</span>
        <br />
        <span className={styles.syntaxIconSource}>{'  '}source</span>
        <span className={styles.syntaxIconTag}>=</span>
        <span className={styles.syntaxIconName}>{`{${reactname}}`}</span>
        <span className={styles.syntaxIconTag}> /&gt;</span>
      </div>
    </Tooltip>
  );
}
