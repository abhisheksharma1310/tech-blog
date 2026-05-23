interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoCard({ title, children }: InfoCardProps) {
  return (
    <aside className="info-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </aside>
  );
}
