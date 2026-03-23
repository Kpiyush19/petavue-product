import { Button } from '../Button/Button';
import './IntegrationCard.css';

/**
 * IntegrationCard — displays an integration with logo, category tag,
 * description, and a connect/status action button.
 *
 * @param {object} props
 * @param {string} props.name - Integration name (e.g. "Slack")
 * @param {string} props.description - Short description text
 * @param {string} props.category - Category label (e.g. "Database Management")
 * @param {"connected"|"not-connected"|"coming-soon"} props.status - Connection status
 * @param {string} props.logoSrc - URL or import path for the integration logo
 * @param {function} props.onConnect - Called when connect button is clicked
 * @param {string} props.className - External override class
 */
export function IntegrationCard({
  name = 'Slack',
  description = '',
  category = 'Database Management',
  status = 'not-connected',
  logoSrc,
  onConnect,
  className = '',
}) {
  const classes = ['integration-card', className].filter(Boolean).join(' ');

  const buttonLabel =
    status === 'connected'
      ? 'Connected'
      : status === 'coming-soon'
        ? 'Coming Soon'
        : 'Connect';

  const buttonDisabled = status === 'coming-soon' || status === 'connected';

  return (
    <div className={classes}>
      {/* Header: logo + name */}
      <div className="integration-card__header">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={`${name} logo`}
            className="integration-card__logo"
          />
        )}
        <span className="integration-card__name">{name}</span>
      </div>

      {/* Category tag */}
      <span className="integration-card__category">{category}</span>

      {/* Description */}
      <p className="integration-card__desc">{description}</p>

      {/* Action */}
      <Button
        variant={buttonDisabled ? 'secondary' : 'primary'}
        size="md"
        label={buttonLabel}
        disabled={buttonDisabled}
        onClick={onConnect}
      />
    </div>
  );
}
