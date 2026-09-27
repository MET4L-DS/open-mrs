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
          'active-left-nav-link': isActive,
        })}
        href={targetUrl}
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem',
          height: '2rem',
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Identification
            size={16}
            style={{
              marginRight: '1rem',
              flexShrink: 0,
              fill: 'currentColor',
            }}
          />
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: isActive ? 600 : 400,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {t(title)}
          </span>
        </span>
      </a>
    </div>
  );
}
