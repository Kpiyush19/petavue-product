import { X } from '@phosphor-icons/react';
import './Toast.css';

/**
 * Toast — system notification bar with status color, message, optional link, and close.
 *
 * @param {object} props
 * @param {"success"|"warning"|"error"} props.status - Color variant
 * @param {string} props.message - Main notification text
 * @param {string} props.link - Optional link text
 * @param {"default"|"link-right"|"link-left"} props.variant - Layout variant
 * @param {function} props.onClose - Called when X is clicked
 * @param {function} props.onLinkClick - Called when link is clicked
 * @param {string} props.className - External override class
 */
export function Toast({
  status = 'success',
  message = 'Notification',
  link = 'View link',
  variant = 'default',
  onClose,
  onLinkClick,
  className = '',
}) {
  const classes = [
    'toast',
    `toast--${status}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showLink = variant === 'link-right' || variant === 'link-left';

  return (
    <div className={classes}>
      <div className="toast__content">
        {/* Link left variant */}
        {variant === 'link-left' && showLink && (
          <button className="toast__link" onClick={onLinkClick} type="button">
            {link}
          </button>
        )}

        {/* Message */}
        <span className="toast__message">{message}</span>

        {/* Link right variant */}
        {variant === 'link-right' && showLink && (
          <button className="toast__link" onClick={onLinkClick} type="button">
            {link}
          </button>
        )}

        {/* Close */}
        <button className="toast__close" onClick={onClose} aria-label="Close" type="button">
          <X size={16} weight="regular" />
        </button>
      </div>
    </div>
  );
}
