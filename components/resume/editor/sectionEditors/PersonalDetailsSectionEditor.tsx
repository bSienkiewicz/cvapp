import type { PersonalDetailKey, PersonalDetails, PersonalDetailsVisibilityKey } from '@/types/resume';
import { useResume } from '../../ResumeContext';
import VisibilityRow from './VisibilityRow';

type Props = {
  personalDetails: PersonalDetails;
};

const PERSONAL_DETAIL_LABELS: Record<PersonalDetailKey, string> = {
  displayEmail: 'Email',
  phone: 'Phone',
  address: 'Address',
  website: 'Website',
};

export default function PersonalDetailsSectionEditor({ personalDetails }: Props) {
  const { updatePersonalDetails } = useResume();
  const isVisible = (field: PersonalDetailsVisibilityKey) =>
    personalDetails.fieldVisibility?.[field] !== false;

  const toggleVisibility = (field: PersonalDetailsVisibilityKey) => {
    updatePersonalDetails({
      fieldVisibility: {
        ...personalDetails.fieldVisibility,
        [field]: !isVisible(field),
      },
    });
  };

  return (
    <div className="space-y-1 text-sm">
      {personalDetails.fullName && (
        <VisibilityRow
          label="full name"
          visible={isVisible('fullName')}
          onToggle={() => toggleVisibility('fullName')}
        >
          <span>{personalDetails.fullName}</span>
        </VisibilityRow>
      )}
      {personalDetails.jobTitle && (
        <VisibilityRow
          label="job title"
          visible={isVisible('jobTitle')}
          onToggle={() => toggleVisibility('jobTitle')}
        >
          <span>{personalDetails.jobTitle}</span>
        </VisibilityRow>
      )}
      <div className="ml-4">
        {personalDetails.detailsOrder.map((field) => {
          const value = personalDetails[field];
          if (!value) return null;

          return (
            <VisibilityRow
              key={field}
              label={PERSONAL_DETAIL_LABELS[field].toLowerCase()}
              visible={isVisible(field)}
              onToggle={() => toggleVisibility(field)}
            >
              <span>{value}</span>
            </VisibilityRow>
          );
        })}
      </div>
    </div>
  );
}
