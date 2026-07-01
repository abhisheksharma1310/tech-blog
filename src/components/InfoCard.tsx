interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoCard({ title, children }: InfoCardProps) {
  return (
    <aside className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50/50 dark:bg-white/[0.02] my-6">
      <h3 className="text-sm font-semibold text-black dark:text-white mb-2">{title}</h3>
      <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{children}</div>
    </aside>
  );
}
