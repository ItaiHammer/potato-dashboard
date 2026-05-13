import { MetricCard } from './MetricCard';
import { getSystemCards } from './systemCards';
import type { SystemOverview } from '../../types/system';

type SystemOverviewCardsProps = {
  overview: SystemOverview;
};

export function SystemOverviewCards({ overview }: SystemOverviewCardsProps) {
  const cards = getSystemCards(overview);

  return (
    <section className="system-grid">
      {cards.map((card, index) => (
        <MetricCard key={`${card.title}-${index}`} title={card.title} rows={card.rows} />
      ))}
    </section>
  );
}
