import React, {useState} from 'react';
import {Subheading, TextStyle} from '@shopify/polaris';
import styles from './CodeBlock.module.scss';

interface Props {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onCopy?: () => void;
}

export default function CodeBlock({title, children, footer, onCopy}: Props) {
  const [copyText, setCopyText] = useState('Copy to clipboard');

  const copyParent = React.createRef<HTMLDivElement>();

  function copyToClipboard() {
    const copyContent = copyParent.current ? copyParent.current.innerText : '';

    const textarea = document.createElement('textarea');
    textarea.innerHTML = copyContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setCopyText('Copied');
    if (onCopy) {
      onCopy();
    }

    setTimeout(() => {
      setCopyText('Copy to clipboard');
    }, 1500);
  }

  const footerMarkup = footer ? (
    <div>
      <TextStyle variation="subdued">{footer}</TextStyle>
    </div>
  ) : null;

  return (
    <div>
      <div className={styles.headingWrapper}>
        <Subheading>{title}</Subheading>
        <button
          type="button"
          onClick={copyToClipboard}
          className={styles.copyButton}
        >
          {copyText}
        </button>
      </div>

      <div className={styles.code} ref={copyParent}>
        {children}
      </div>
      {footerMarkup}
    </div>
  );
}

interface BlockProps {
  children?: React.ReactNode;
}

CodeBlock.Import = function Import({children}: BlockProps) {
  return <span className={styles.syntaxImport}>{children}</span>;
};

CodeBlock.ImportItems = function ImportItems({children}: BlockProps) {
  return <span className={styles.syntaxImportItems}>{children}</span>;
};

CodeBlock.Tag = function Tag({children}: BlockProps) {
  return <span className={styles.syntaxTag}>{children}</span>;
};

CodeBlock.Attribute = function Attribute({children}: BlockProps) {
  return <span className={styles.syntaxAttribute}>{children}</span>;
};
