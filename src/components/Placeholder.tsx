interface PlaceholderProps {
  label: string;
}

export default function Placeholder({ label }: PlaceholderProps) {
  return (
    <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs font-mono">
      {label}
    </span>
  );
}
