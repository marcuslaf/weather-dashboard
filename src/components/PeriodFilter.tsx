import React from 'react';

export type Period = '24h' | '7d' | '30d' | 'custom';

interface PeriodFilterProps {
  selected: Period;
  onChange: (period: Period) => void;
  customStart: string;
  customEnd: string;
  onCustomStartChange: (date: string) => void;
  onCustomEndChange: (date: string) => void;
}

const PERIODS: { value: Period; label: string }[] = [
  { value: '24h', label: '24 hours' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: 'custom', label: 'Custom' },
];

const PeriodFilter: React.FC<PeriodFilterProps> = ({
  selected,
  onChange,
  customStart,
  customEnd,
  onCustomStartChange,
  onCustomEndChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Time period filter">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-ring
            ${selected === p.value
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-card text-card-foreground border border-border hover:bg-muted'
            }`}
          aria-pressed={selected === p.value}
        >
          {p.label}
        </button>
      ))}

      {selected === 'custom' && (
        <div className="flex flex-wrap items-center gap-2 ml-2">
          <label htmlFor="custom-start" className="sr-only">Start date</label>
          <input
            id="custom-start"
            type="date"
            value={customStart}
            onChange={(e) => onCustomStartChange(e.target.value)}
            className="bg-input text-foreground rounded-lg px-3 py-2 text-sm border border-border
              focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <span className="text-muted-foreground text-sm">to</span>
          <label htmlFor="custom-end" className="sr-only">End date</label>
          <input
            id="custom-end"
            type="date"
            value={customEnd}
            onChange={(e) => onCustomEndChange(e.target.value)}
            className="bg-input text-foreground rounded-lg px-3 py-2 text-sm border border-border
              focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(PeriodFilter);