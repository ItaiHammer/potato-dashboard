export type MetricCardRow = {
  label: string;
  value: React.ReactNode;
};

type MetricCardProps = {
  title: string;
  rows: MetricCardRow[];
};

export function MetricCard({ title, rows }: MetricCardProps) {
  return (
    <article className="system-card">
      <h3>{title}</h3>
      {rows.map((row) => (
        <p key={row.label}>
          <strong>{row.label}:</strong> {row.value ?? 'N/A'}
        </p>
      ))}
    </article>
  );
}
