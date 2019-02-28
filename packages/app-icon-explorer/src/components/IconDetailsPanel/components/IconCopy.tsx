import {Tooltip} from '@shopify/polaris';
import React from 'react';
import styles from './IconCopy.module.scss';

interface Props {
  reactname: string;
}

interface State {
  toolTipText: string;
}

export default class IconCopy extends React.Component<Props, State> {
  state = {
    toolTipText: 'Copy to clipboard',
  };

  private copyParent = React.createRef<HTMLDivElement>();

  copyToClipboard = () => {
    const copyContent = this.copyParent.current
      ? this.copyParent.current.innerText
      : '';

    const textarea = document.createElement('textarea');
    textarea.innerHTML = copyContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    if (this.copyParent && this.copyParent.current) {
      this.copyParent.current.setAttribute('tabIndex', '0');
      this.copyParent.current.focus();
    }
    this.setState({toolTipText: 'Copied to clipboard'});
    if ((window as any).gtag) {
      (window as any).gtag('event', 'copy_snippet', {
        /* eslint-disable-next-line camelcase */
        event_label: this.props.reactname,
      });
    }

    setTimeout(() => {
      this.setState({toolTipText: 'Copy to clipboard'});
      if (this.copyParent && this.copyParent.current) {
        this.copyParent.current.removeAttribute('tabIndex');
      }
    }, 1500);
  };

  render() {
    const {reactname} = this.props;

    return (
      <Tooltip content={this.state.toolTipText}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={styles.codeHighlight}
          onClick={this.copyToClipboard}
          ref={this.copyParent}
        >
          <span className={styles.syntaxIconName}>import</span>
          <span className={styles.syntaxIconComponent}>
            {' '}
            {`{${reactname}}`}
          </span>
          <span className={styles.syntaxIconName}>
            {' '}
            from {`'@shopify/polaris-icons'`};
          </span>
          <br />
          <br />
          <span className={styles.syntaxIconTag}>&lt;Icon</span>{' '}
          <span className={styles.syntaxIconSource}>source</span>
          <span className={styles.syntaxIconTag}>=</span>
          <span className={styles.syntaxIconName}>{`{${reactname}}`}</span>
          <span className={styles.syntaxIconTag}> /&gt;</span>
        </div>
      </Tooltip>
    );
  }
}
