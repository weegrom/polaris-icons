import * as React from 'react';
import classNames from 'classnames';

import styles from './ToggleButton.module.scss';

export interface Props {
  children?: string | string[];
  id?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  ariaControls?: string;
  pressed?: boolean;
  onClick?(): void;
  onFocus?(): void;
  onBlur?(): void;
  onKeyPress?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  onKeyUp?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLButtonElement>): void;
}

export default function ToggleButton({
  id,
  disabled,
  children,
  accessibilityLabel,
  ariaControls,
  pressed,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  fullWidth,
}: Props) {
  const className = classNames(
    styles.ToggleButton,
    disabled && styles.disabled,
    pressed && styles.pressed,
    fullWidth && styles.fullWidth,
  );

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
      onMouseUp={handleMouseUpByBlurring}
      className={className}
      disabled={disabled}
      aria-label={accessibilityLabel}
      aria-controls={ariaControls}
      aria-pressed={pressed}
    >
      <span className={styles.Content}>
        {children && <span className={styles.Text}>{children}</span>}
      </span>
    </button>
  );
}

function handleMouseUpByBlurring({
  currentTarget,
}: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  currentTarget.blur();
}
