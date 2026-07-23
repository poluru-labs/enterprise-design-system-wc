import { EDS_ICON_NAMES } from '../icons/paths.js';

/** Shared Storybook control options for icon props (includes "none"). */
export const iconControlOptions = ['', ...EDS_ICON_NAMES] as const;

export type IconControlValue = (typeof iconControlOptions)[number];

/** ArgType factory for icon select Controls. */
export function iconArgType(description: string, category = 'Icons') {
  return {
    control: 'select' as const,
    options: [...iconControlOptions],
    description,
    table: {
      category,
      type: { summary: 'EdsIconName | ""' },
      defaultValue: { summary: '""' },
    },
  };
}
