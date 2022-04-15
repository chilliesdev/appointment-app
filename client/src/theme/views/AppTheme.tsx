export default function AppTheme({ children }: { children: JSX.Element }) {
  return (
    <div className="bg-white dark:bg-slate-900 transition-all">{children}</div>
  );
}
