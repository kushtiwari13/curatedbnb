import styles from './Button.module.css'

const classNames = (...args) => args.filter(Boolean).join(' ')

const Button = ({
  as = 'button',
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  children,
  className,
  ...rest
}) => {
  const Component = as
  return (
    <Component
      className={classNames(
        styles.button,
        styles[variant],
        size === 'small' && styles.small,
        fullWidth && styles.fullWidth,
        styles.focusRing,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Button
