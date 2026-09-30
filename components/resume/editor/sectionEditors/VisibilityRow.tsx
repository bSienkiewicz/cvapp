import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

type VisibilityRowProps = {
  visible: boolean;
  label: string;
  onToggle: () => void;
  children: ReactNode;
};

export default function VisibilityRow({ visible, label, onToggle, children }: VisibilityRowProps) {
  const actionLabel = `${visible ? 'Hide' : 'Show'} ${label} from resume`;

  return (
    <div className={`flex items-start gap-1 ${visible ? '' : 'opacity-60'}`}>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={actionLabel}
        aria-pressed={visible}
        title={actionLabel}
        onClick={onToggle}
      >
        {visible ? <Eye /> : <EyeOff />}
      </Button>
      {children}
    </div>
  );
}