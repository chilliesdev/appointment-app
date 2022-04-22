export default function Heading({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  return (
    <h2
      className={`font-bold text-3xl mb-4 text-center ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}
