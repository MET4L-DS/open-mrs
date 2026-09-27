import React, { useMemo } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Identification } from '@carbon/react/icons';
import classNames from 'classnames';

export interface DashboardLinkProps {
  basePath: string;
}

export interface DashboardLinkOptions {
  path: string;
  title: string;
}

export function createDashboardLink({ path, title }: DashboardLinkOptions) {
  return function DashboardLink({ basePath }: DashboardLinkProps) {
    return (
      <BrowserRouter>
        <DashboardLinkInner basePath={basePath} path={path} title={title} />
      </BrowserRouter>
    );
  };
}

function DashboardLinkInner({ basePath, path, title }: { basePath: string; path: string; title: string }) {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = useMemo(() => {
    const current = location.pathname || '';
    return current.endsWith(`/${path}`) || current.includes(`/${path}/`);
  }, [location.pathname, path]);

  const targetUrl = `${basePath}/${encodeURIComponent(path)}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', targetUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div key={path}>
      <a
        className={classNames('cds--side-nav__link', {
          'cds--side-nav__link--current': isActive,
          'active-left-nav-link': isActive,
        })}
        href={targetUrl}
        onClick={handleClick}
      >
        <div className="cds--side-nav__icon">
          <Identification size={16} />
        </div>
        <span className="cds--side-nav__link-text">
          {t(title)}
        </span>
      </a>
    </div>
  );
}
