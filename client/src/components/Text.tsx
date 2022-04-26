interface TextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: string | undefined;
}

export default function Text({ children, ...props }: TextProps) {
  return (
    <p {...props} className="mb-2">
      {children}
    </p>
  );
}
