import React, { useMemo } from 'react';
import last from 'lodash-es/last';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ConfigurableLink } from '@openmrs/esm-framework';

export interface LinkConfig {
  name: string;
  title: string;
}

const isUuid = (value: string) => {
  const regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  return regex.test(value);
};

export const createLeftPanelLink = (config: LinkConfig) => () => {
  return (
    <BrowserRouter>
      <LinkExtension config={config} />
    </BrowserRouter>
  );
};

export function LinkExtension({ config }: { config: LinkConfig }) {
  const { name, title } = config;
  const location = useLocation();
  const spaBasePath = window.getOpenmrsSpaBase() + 'home';

  let urlSegment = useMemo(() => decodeURIComponent(last(location.pathname.split('/'))), [location.pathname]);

  if (isUuid(urlSegment)) {
    urlSegment = 'billing';
  }

  return (
    <ConfigurableLink
      to={spaBasePath + '/' + name}
      className={`cds--side-nav__link ${name === urlSegment && 'active-left-nav-link'}`}>
      {title}
    </ConfigurableLink>
  );
}