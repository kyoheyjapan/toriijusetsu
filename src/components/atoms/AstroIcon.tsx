import { Icon } from 'astro-icon/components';
import type { ComponentProps } from 'react';

interface AstroIconProps extends Omit<ComponentProps<'svg'>, 'name'> {
  name: string;
  size?: string;
}

export default function AstroIcon({ name, size = '1em', ...props }: AstroIconProps) {
  return <Icon name={name} size={size} {...props} />;
}
