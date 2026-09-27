import React from 'react';
import { useTranslation } from 'react-i18next';
import { Identification } from '@carbon/react/icons';
import { navigate } from '@openmrs/esm-framework';
import classNames from 'classnames';
import { useCurrentPath } from '../hooks/useCurrentPath';

export interface DashboardLinkProps {
  basePath: string;
}

export interface DashboardLinkOptions {
  path: string;
  title: string;
  titleKey?: string;
  icon?: React.ComponentType<{ size?: number | string; className?: string }>;
}

export function createDashboardLink({
  path,
  title,
  titleKey,
  icon: IconComponent = Identification,
}: DashboardLinkOptions) {
  return function DashboardLink({ basePath }: DashboardLinkProps) {
    const { t } = useTranslation();
    const currentPath = useCurrentPath();

    const isActive = currentPath.endsWith(`/${path}`) || currentPath.includes(`/${path}/`);
    const targetUrl = `${basePath}/${encodeURIComponent(path)}`;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate({ to: targetUrl });
    };

    return (
      <a
        key={path}
        className={classNames('cds--side-nav__link', {
          'cds--side-nav__link--current': isActive,
          'active-left-nav-link': isActive,
        })}
        href={targetUrl}
        onClick={handleClick}
      >
        <div className="cds--side-nav__icon">
          <IconComponent size={16} />
        </div>
        <span className="cds--side-nav__link-text">
          {t(titleKey || title, title)}
        </span>
      </a>
    );
  };
}
