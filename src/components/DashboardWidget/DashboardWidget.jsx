import { useState, useRef, useEffect } from 'react';
import { Sparkle, LinkSimple, Camera, DotsSixVertical, PencilSimple, X } from '@phosphor-icons/react';
import './DashboardWidget.css';

/**
 * DashboardWidget — card wrapper for dashboard chart/table widgets.
 *
 * @param {string} title - Widget title
 * @param {string} description - Short description shown below title
 * @param {React.ReactNode} children - Chart or table content
 * @param {boolean} editing - Whether the dashboard is in edit mode
 * @param {function} onRemove - Callback to remove widget (edit mode)
 * @param {string} className - External override class
 */
export function DashboardWidget({
  title = '',
  description = '',
  children,
  editing = false,
  onRemove,
  className = '',
}) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    const el = descRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  return (
    <div className={`dashboard-widget ${editing ? 'dashboard-widget--editing' : ''} ${className}`}>
      <div className="dashboard-widget__header">
        {editing && (
          <span className="dashboard-widget__drag-handle">
            <DotsSixVertical size={16} weight="bold" color="var(--color-neutral-300)" />
          </span>
        )}
        <h2 className="dashboard-widget__title">{title}</h2>
        {editing ? (
          <div className="dashboard-widget__edit-actions">
            <button className="dashboard-widget__action-btn" type="button" aria-label="Sage">
              <Sparkle size={16} weight="regular" />
            </button>
            <button className="dashboard-widget__action-btn" type="button" aria-label="Edit widget">
              <PencilSimple size={16} weight="regular" />
            </button>
            <button
              className="dashboard-widget__action-btn"
              type="button"
              aria-label="Remove widget"
              onClick={onRemove}
            >
              <X size={16} weight="regular" />
            </button>
          </div>
        ) : (
          <div className="dashboard-widget__actions">
            <button className="dashboard-widget__sage-btn" type="button">
              <Sparkle size={12} weight="regular" />
              Sage
            </button>
            <button className="dashboard-widget__action-btn" type="button" aria-label="Copy link">
              <LinkSimple size={16} weight="regular" />
            </button>
            <button className="dashboard-widget__action-btn" type="button" aria-label="Screenshot">
              <Camera size={16} weight="regular" />
            </button>
          </div>
        )}
      </div>

      {description && (
        <div
          className="dashboard-widget__description-wrapper"
          onMouseEnter={() => isTruncated && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p ref={descRef} className="dashboard-widget__description">
            {description}
          </p>
          {showTooltip && (
            <div className="dashboard-widget__tooltip">
              {description}
            </div>
          )}
        </div>
      )}

      <div className="dashboard-widget__body">
        {children}
      </div>
    </div>
  );
}
