import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Pencil, Plus, Trash } from 'lucide-react';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';
import { ButtonGroup } from '@/components/ui/button-group';

type VisibilityRowProps = {
  visible: boolean;
  label: string;
  onToggle: () => void;
  children: ReactNode;
};

export default function VisibilityRow({ visible, label, onToggle, children }: VisibilityRowProps) {
  const actionLabel = `${visible ? 'Hide' : 'Show'} ${label} from resume`;

  return (
    <Item variant="default" className={`p-0 flex ${visible ? '' : 'opacity-60'} relative group hover:bg-muted`}>
      <Button
        type="button"
        variant="ghost"
        aria-label={actionLabel}
        aria-pressed={visible}
        className={'self-start'}
        title={actionLabel}
        onClick={onToggle}
      >
        {visible ? <Eye size={16} /> : <EyeOff size={16} />}
      </Button>
      <ItemContent>
        <ItemTitle>
          {children}
        </ItemTitle>
      </ItemContent>
      <ButtonGroup className='absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100'>
        <Button variant="outline" size="sm"><Pencil size={16} /></Button>
        <Button variant="outline" size="sm"><Trash size={16} className='text-red-900' /></Button>
      </ButtonGroup>
    </Item>
  );
}