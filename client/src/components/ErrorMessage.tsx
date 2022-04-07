export default function ErrorMessage({ children }: { children: string }) {
  return <div style={{ color: "red" }}>{children}</div>;
}
