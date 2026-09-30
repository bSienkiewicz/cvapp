import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import { Eye, EyeOff, Pencil, Trash } from 'lucide-react';

type EntryVisibilityHeaderProps = {
  label: string;
  title: string;
  visible: boolean;
  onToggle: () => void;
};

export default function EntryVisibilityHeader({ label, title, visible, onToggle }: EntryVisibilityHeaderProps) {
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
        {visible ? <Eye className='size-4' /> : <EyeOff className='size-4' />}
      </Button>
      <ItemContent>
        <ItemTitle>
          {title}
        </ItemTitle>
      </ItemContent>
      <ButtonGroup className='absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 will-change-auto transition'>
        <Button variant="outline" size="sm"><Pencil size={16} /></Button>
        <Button variant="outline" size="sm"><Trash size={16} className='text-red-900' /></Button>
      </ButtonGroup>
    </Item>
  );
}