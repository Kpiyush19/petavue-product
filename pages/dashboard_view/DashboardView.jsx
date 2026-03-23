import { useState, useCallback, useRef, useEffect } from 'react';
import {
  CaretRight,
  CaretDown,
  CaretLeft,
  ClockCountdown,
  Database,
  LockKey,
  PencilSimple,
  Sparkle,
  MagnifyingGlass,
  DotsThree,
  DotsSixVertical,
  X,
} from '@phosphor-icons/react';

/* Last Updated icon button with tooltip */
function LastUpdatedButton({
  lastUpdated = 'Jan 31, 2026 at 10:32 AM IST',
  frequency = 'Every 24 hours',
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="dv-last-updated"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="dv-last-updated__btn" type="button" aria-label="Last updated info">
        <ClockCountdown size={16} weight="regular" color="var(--color-neutral-800)" />
      </button>
      {hovered && (
        <div className="dv-last-updated__tooltip">
          <span className="dv-last-updated__tooltip-bold">Last Updated:</span>
          {' '}{lastUpdated}
          <br />
          <span className="dv-last-updated__tooltip-bold">Frequency:</span>
          {' '}{frequency}
        </div>
      )}
    </div>
  );
}

import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { MenuBar } from '../../src/components/MenuBar';
import { Button } from '../../src/components/Button/Button';
import { DashboardWidget } from '../../src/components/DashboardWidget/DashboardWidget';
import { SagePane } from '../../src/components/SagePane/SagePane';
import './DashboardView.css';

const NAV_ITEMS = [
  { id: 'chats', label: 'Workbook', icon: 'chats' },
  { id: 'reports', label: 'Reports', icon: 'reports' },
  { id: 'data-hub', label: 'Data Hub', icon: 'data-hub' },
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'project', label: 'Projects', icon: 'project' },
];

/* ------------------------------------------------------------------ */
/*  Design-system chart colors (read from CSS custom properties)       */
/* ------------------------------------------------------------------ */

const CHART_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

/* ------------------------------------------------------------------ */
/*  All available widgets (superset — some visible, some hidden)       */
/* ------------------------------------------------------------------ */

const ALL_WIDGETS = [
  { id: 'health-overview', title: 'Account Health Overview', defaultVisible: true },
  { id: 'health-by-category', title: 'Account Health Score by Account Category', defaultVisible: true },
  { id: 'health-by-segment', title: 'Average Account Health Score by Account Segment', defaultVisible: true },
  { id: 'at-risk', title: 'Accounts list that are at risk', defaultVisible: true },
  { id: 'marketing-channels', title: 'Marketing Channels', defaultVisible: false },
  { id: 'meetings-booked', title: 'Meetings Booked', defaultVisible: false },
  { id: 'prioritised-accounts', title: 'Prioritised Accounts', defaultVisible: false },
  { id: 'roi-cost-report', title: 'ROI and Cost Report', defaultVisible: false },
  { id: 'sales-cycle-length', title: 'Sales cycle length', defaultVisible: false },
];

const WIDGET_DESCRIPTIONS = {
  'health-overview': 'Below is the detailed list of 213 accounts with their respective Account Health Scores, including information such as account details, contract dates, and various engagement and utilization metrics.',
  'health-by-category': 'This pie chart visualizes the average health score of accounts grouped by account category (e.g., Enterprise, SMB, Mid-Market). It provides insights into how different account categories perform.',
  'health-by-segment': 'This bar chart displays the average Account Health Score for each Account Segment.',
  'at-risk': 'Here is a detailed list of accounts identified as "at risk" based on their health scores and churn probability. It provides essential information such as account name, segment, region, health score, and churn probability.',
};

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const HEALTH_TABLE_DATA = [
  { id: 1, oppId: '006JA000002A2IVYAS', oppName: 'Schmitt Inc', date: '2022-06-08' },
  { id: 2, oppId: '006JA000002ESpoYAG', oppName: 'Kertzmann, Mills and Hackett', date: '2022-07-08' },
  { id: 3, oppId: '006JA000002byJCYAY', oppName: 'Grant - Wunsch', date: '2023-01-15' },
  { id: 4, oppId: '006JA000002dJKdYAM', oppName: 'West, Grant and Jacobi', date: '2023-01-27' },
  { id: 5, oppId: '006JA000002buPhYAI', oppName: 'Hayes, White and Hane', date: '2023-01-27' },
  { id: 6, oppId: '006JA000002ekfFYAY', oppName: 'Walter, Rowe and Powlowski', date: '2023-02-11' },
  { id: 7, oppId: '006JA000002gSVKYA2', oppName: 'Watsica, Cronin and Sporer', date: '2023-03-03' },
  { id: 8, oppId: '006JA000002gwdYAA', oppName: 'Harzer, Banich and LeRoy', date: '2023-03-08' },
];

const PIE_DATA = [
  { name: 'Social Media Advertising', value: 10, colorIndex: 0 },
  { name: 'Content Marketing', value: 15, colorIndex: 1 },
  { name: 'Email Marketing', value: 5, colorIndex: 2 },
  { name: 'No Source', value: 60, colorIndex: 3 },
  { name: 'Others', value: 10, colorIndex: 4 },
];

const BAR_DATA = [
  { segment: 'Enterprise', score: 88 },
  { segment: 'Mid-Market', score: 83 },
  { segment: 'SMB', score: 95 },
];

const AT_RISK_DATA = [
  { name: 'Tesla', category: 'Enterprise', arr: '$ 87,090', pulse: 'Fairly Satisfied' },
  { name: 'AB Company', category: 'SMB', arr: '$ 67,923', pulse: 'Some Risk' },
  { name: 'CRT Tech', category: 'Enterprise', arr: '$ 56,890', pulse: 'Fairly Satisfied' },
  { name: 'Rec Technologies', category: 'Enterprise', arr: '$ 52,678', pulse: 'Some Risk' },
  { name: 'Slack', category: 'SMB', arr: '$ 51,860', pulse: 'Fairly Satisfied' },
  { name: 'Intercom', category: 'SMB', arr: '$ 50,800', pulse: 'Fairly Satisfied' },
  { name: 'Datapine', category: 'Enterprise', arr: '$ 48,670', pulse: 'Severe Risk' },
];

/* ------------------------------------------------------------------ */
/*  Custom Recharts Tooltip                                            */
/* ------------------------------------------------------------------ */

function PieTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="dv-tooltip">
      <div className="dv-tooltip__row">
        <span
          className="dv-tooltip__dot"
          style={{ backgroundColor: CHART_COLORS[payload[0].payload.colorIndex] }}
        />
        <p className="dv-tooltip__label">{name}</p>
      </div>
      <p className="dv-tooltip__value">{value}%</p>
    </div>
  );
}

function BarTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="dv-tooltip">
      <p className="dv-tooltip__label">{label}</p>
      <p className="dv-tooltip__value">Health Score: {payload[0].value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget sub-components                                              */
/* ------------------------------------------------------------------ */

function AccountHealthTable() {
  return (
    <table className="dv-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Opp ID</th>
          <th>Opp Name</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {HEALTH_TABLE_DATA.map((row) => (
          <tr key={row.id}>
            <td>{row.id}.</td>
            <td>{row.oppId}</td>
            <td>{row.oppName}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AccountPieChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <div className="dv-pie-wrapper">
      <ResponsiveContainer width={280} height={280}>
        <PieChart>
          <Pie
            data={PIE_DATA}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={130}
            dataKey="value"
            stroke="none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {PIE_DATA.map((entry, i) => (
              <Cell
                key={i}
                fill={CHART_COLORS[entry.colorIndex]}
                opacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
                style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}
              />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="dv-pie-legend">
        {PIE_DATA.map((entry, i) => (
          <div
            className="dv-pie-legend__item"
            key={i}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="dv-pie-legend__swatch"
              style={{
                backgroundColor: CHART_COLORS[entry.colorIndex],
                opacity: activeIndex === null || activeIndex === i ? 1 : 0.4,
                transition: 'opacity 0.2s ease',
              }}
            />
            <span
              className="dv-pie-legend__label"
              style={{
                opacity: activeIndex === null || activeIndex === i ? 1 : 0.5,
                transition: 'opacity 0.2s ease',
              }}
            >
              {entry.name} - {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountBarChart() {
  return (
    <div className="dv-bar-wrapper">
      <span className="dv-bar-y-label">Account Health Score</span>
      <div style={{ width: '100%', paddingLeft: 40 }}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={BAR_DATA} barSize={50}>
            <CartesianGrid
              strokeDasharray="0"
              stroke="var(--color-neutral-100)"
              vertical={false}
            />
            <XAxis
              dataKey="segment"
              tick={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 12,
                fill: 'var(--color-text-secondary)',
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 10,
                fill: 'var(--color-text-secondary)',
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<BarTooltip />}
              cursor={{ fill: 'var(--color-primary-50)', radius: 4 }}
            />
            <Bar
              dataKey="score"
              fill="var(--color-primary-100)"
              radius={[0, 0, 0, 0]}
              activeBar={{ fill: 'var(--color-primary-300)', cursor: 'pointer' }}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="dv-bar-x-label">Account Segment</p>
      </div>
    </div>
  );
}

function AtRiskTable() {
  return (
    <table className="dv-table">
      <thead>
        <tr>
          <th>Account Name</th>
          <th>Account Category</th>
          <th>Account ARR</th>
          <th>Account Pulse</th>
        </tr>
      </thead>
      <tbody>
        {AT_RISK_DATA.map((row, i) => (
          <tr key={i}>
            <td>{row.name}</td>
            <td>{row.category}</td>
            <td>{row.arr}</td>
            <td>{row.pulse}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget content renderer                                            */
/* ------------------------------------------------------------------ */

function WidgetContent({ widgetId }) {
  switch (widgetId) {
    case 'health-overview': return <AccountHealthTable />;
    case 'health-by-category': return <AccountPieChart />;
    case 'health-by-segment': return <AccountBarChart />;
    case 'at-risk': return <AtRiskTable />;
    default: return <div className="dv-placeholder">Widget content</div>;
  }
}

/* ------------------------------------------------------------------ */
/*  Edit Panel — widget list sidebar                                   */
/* ------------------------------------------------------------------ */

function WidgetItemMenu({ onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div className="dv-edit-panel__menu" ref={ref}>
      <button className="dv-edit-panel__menu-item" type="button" onClick={onClose}>
        <PencilSimple size={14} weight="regular" color="var(--color-text-secondary)" />
        Edit Widget
      </button>
      <button className="dv-edit-panel__menu-item dv-edit-panel__menu-item--danger" type="button" onClick={onClose}>
        Delete
      </button>
    </div>
  );
}

function EditPanel({ visibleIds, onToggle, search, onSearchChange }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <div className="dv-edit-panel">
      <h3 className="dv-edit-panel__title">Widgets</h3>

      <div className="dv-edit-panel__search">
        <MagnifyingGlass size={14} weight="regular" color="var(--color-text-secondary)" />
        <input
          className="dv-edit-panel__search-input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="dv-edit-panel__list">
        {ALL_WIDGETS
          .filter((w) => w.title.toLowerCase().includes(search.toLowerCase()))
          .map((w) => {
            const checked = visibleIds.includes(w.id);
            return (
              <div className="dv-edit-panel__item" key={w.id}>
                <button
                  className={`dv-edit-panel__checkbox ${checked ? 'dv-edit-panel__checkbox--checked' : ''}`}
                  type="button"
                  onClick={() => onToggle(w.id)}
                  aria-label={checked ? `Hide ${w.title}` : `Show ${w.title}`}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="dv-edit-panel__item-label">{w.title}</span>
                <div className="dv-edit-panel__item-actions">
                  <button
                    className="dv-edit-panel__dots-btn"
                    type="button"
                    onClick={() => setOpenMenuId(openMenuId === w.id ? null : w.id)}
                  >
                    <DotsThree size={16} weight="bold" color="var(--color-text-secondary)" />
                  </button>
                  {openMenuId === w.id && (
                    <WidgetItemMenu onClose={() => setOpenMenuId(null)} />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export function DashboardView({
  user = { name: 'Ammie Diego', initials: 'AD', email: 'ammie.diego@work.com' },
  onNavigate,
  onBack,
  menuOpen,
  onMenuToggle,
}) {
  const [editing, setEditing] = useState(false);
  const [sageOpen, setSageOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState(
    ALL_WIDGETS.filter((w) => w.defaultVisible).map((w) => w.id)
  );
  const [editSearch, setEditSearch] = useState('');
  /* Snapshot to restore on cancel */
  const [savedIds, setSavedIds] = useState(visibleIds);

  function handleEditStart() {
    setSavedIds(visibleIds);
    setEditing(true);
  }

  function handleEditCancel() {
    setVisibleIds(savedIds);
    setEditing(false);
    setEditSearch('');
  }

  function handleEditSave() {
    setSavedIds(visibleIds);
    setEditing(false);
    setEditSearch('');
  }

  function handleToggleWidget(id) {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }

  function handleRemoveWidget(id) {
    setVisibleIds((prev) => prev.filter((v) => v !== id));
  }

  return (
    <div className="dashboard-view">
      <MenuBar
        items={NAV_ITEMS}
        activeId="dashboard"
        onItemClick={(id) => onNavigate && onNavigate(id)}
        user={user}
        onNewChat={() => onNavigate && onNavigate('new-chat')}
        isOpen={menuOpen}
        onToggle={onMenuToggle}
        onProfile={() => onNavigate && onNavigate('profile')}
      />

      {/* Edit panel — slides in from left */}
      {editing && (
        <EditPanel
          visibleIds={visibleIds}
          onToggle={handleToggleWidget}
          search={editSearch}
          onSearchChange={setEditSearch}
        />
      )}

      <div className="dashboard-view__body">
        {/* Header */}
        <div className="dashboard-view__header">
          {editing ? (
            /* Edit mode header */
            <>
              <div className="dashboard-view__breadcrumb">
                <button
                  className="dashboard-view__back-btn"
                  type="button"
                  onClick={handleEditCancel}
                  aria-label="Back"
                >
                  <CaretLeft size={16} weight="regular" color="var(--color-text-primary)" />
                </button>
                <span className="dashboard-view__breadcrumb-name">
                  Sales Cycle Efficiency
                </span>
              </div>
              <div className="dashboard-view__header-right">
                <Button
                  variant="ghost"
                  size="md"
                  label="Cancel"
                  onClick={handleEditCancel}
                />
                <Button
                  variant="primary"
                  size="md"
                  label="Save"
                  onClick={handleEditSave}
                />
              </div>
            </>
          ) : (
            /* Normal header */
            <>
              <div className="dashboard-view__breadcrumb">
                <button
                  className="dashboard-view__breadcrumb-link"
                  type="button"
                  onClick={onBack}
                >
                  Dashboards
                </button>
                <CaretRight size={16} weight="regular" color="var(--color-text-disabled)" />
                <div className="dashboard-view__breadcrumb-title">
                  <span className="dashboard-view__breadcrumb-name">
                    Sales Cycle Efficiency
                  </span>
                  <CaretDown size={16} weight="regular" color="var(--color-text-primary)" />
                </div>
              </div>

              <div className="dashboard-view__header-right">
                <LastUpdatedButton />
                <div className="dashboard-view__divider" />
                <Button
                  variant="ghost"
                  size="md"
                  icon={Database}
                  label="Data Sync"
                />
                <Button
                  variant="secondary"
                  size="md"
                  icon={LockKey}
                  label="Share"
                />
                <Button
                  variant="secondary"
                  size="md"
                  icon={PencilSimple}
                  label="Edit"
                  onClick={handleEditStart}
                />
                <button
                  className="dashboard-view__sage-btn"
                  type="button"
                  onClick={() => setSageOpen(true)}
                >
                  <Sparkle size={12} weight="regular" color="var(--color-white)" />
                  Sage
                </button>
              </div>
            </>
          )}
        </div>

        {/* Widget Grid — single column in edit mode, 2x2 normally */}
        <div className={`dashboard-view__grid ${editing ? 'dashboard-view__grid--editing' : ''}`}>
          {visibleIds.map((id) => {
            const widget = ALL_WIDGETS.find((w) => w.id === id);
            if (!widget) return null;
            return (
              <DashboardWidget
                key={id}
                title={widget.title}
                description={WIDGET_DESCRIPTIONS[id] || ''}
                editing={editing}
                onRemove={() => handleRemoveWidget(id)}
              >
                <WidgetContent widgetId={id} />
              </DashboardWidget>
            );
          })}
        </div>
      </div>

      {/* Sage AI pane — slides in from right */}
      <SagePane open={sageOpen} onClose={() => setSageOpen(false)} />
    </div>
  );
}
