import * as React from 'react';
import classNames from 'classnames';

import {
  Icon,
  IconProps,
  withAppProvider,
  WithAppProviderProps,
} from '@shopify/polaris';

import styles from './ToggleButton.module.scss';

export type IconSource = IconProps['source'];

export interface Props {
  children?: string | string[];
  id?: string;
  primary?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  outline?: boolean;
  icon?: React.ReactNode | IconSource;
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

type CombinedProps = Props & WithAppProviderProps;

function ToggleButton({
  id,
  disabled,
  loading,
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
  icon,
  primary,
  outline,
  fullWidth,
}: CombinedProps) {
  const className = classNames(
    styles.ToggleButton,
    primary && styles.primary,
    outline && styles.outline,
    disabled && styles.disabled,
    pressed && styles.pressed,
    fullWidth && styles.fullWidth,
    icon && children == null && styles.iconOnly,
  );

  let iconMarkup;

  if (icon) {
    const iconInner = isIconSource(icon) ? (
      <Icon source={loading ? 'placeholder' : icon} />
    ) : (
      icon
    );
    iconMarkup = <IconWrapper>{iconInner}</IconWrapper>;
  }

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
      role={loading ? 'alert' : undefined}
      aria-busy={loading ? true : undefined}
    >
      <span className={styles.Content}>
        {iconMarkup && iconMarkup}
        {children && <span className={styles.Text}>{children}</span>}
      </span>
    </button>
  );
}

export function IconWrapper({children}: any) {
  return <span className={styles.Icon}>{children}</span>;
}

function isIconSource(x: any): x is IconSource {
  return typeof x === 'string' || (typeof x === 'object' && x.body);
}

export default withAppProvider<Props>()(ToggleButton);

function handleMouseUpByBlurring({
  currentTarget,
}: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  currentTarget.blur();
}
