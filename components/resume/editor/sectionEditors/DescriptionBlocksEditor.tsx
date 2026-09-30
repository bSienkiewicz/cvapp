import { removeHtmlTags } from '@/lib/utils';
import type { DescriptionBlock } from '@/types/resume';
import VisibilityRow from './VisibilityRow';

type DescriptionBlocksEditorProps = {
  blocks: DescriptionBlock[];
  onChange: (blocks: DescriptionBlock[]) => void;
};

export default function DescriptionBlocksEditor({ blocks, onChange }: DescriptionBlocksEditorProps) {
  if (blocks.length === 0) return null;

  function toggleBlock(index: number) {
    onChange(blocks.map((block, blockIndex) =>
      blockIndex === index ? { ...block, isVisible: !block.isVisible } : block,
    ));
  }

  return (
    <div className="space-y-1 pl-4">
      {blocks.map((block, index) => (
        <VisibilityRow
          key={index}
          label={block.isBullet ? 'description bullet' : 'description text'}
          visible={block.isVisible}
          onToggle={() => toggleBlock(index)}
        >
          <div className="flex min-w-0 gap-1">
            {block.isBullet && <span aria-hidden="true">•</span>}
            <p className="min-w-0 flex-1">{removeHtmlTags(block.content)}</p>
          </div>
        </VisibilityRow>
      ))}
    </div>
  );
}