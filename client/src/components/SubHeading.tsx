export default function Heading({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  return (
    <h3 className={`font-bold text-lg ${className}`} {...props}>
      {children}
    </h3>
  );
}
