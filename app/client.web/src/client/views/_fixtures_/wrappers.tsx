import * as React from "react";
import { mount, shallow, ShallowRendererProps, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router";
import { WithTranslation } from "react-i18next";

export const mountWithRouter = (elm: React.ReactElement) => {
  return mount(<MemoryRouter>{React.cloneElement(elm)}</MemoryRouter>);
};
export const shallowWithRouter = (elm: React.ReactElement) => {
  return shallow(<MemoryRouter>{React.cloneElement(elm)}</MemoryRouter>);
};

export const shallowWithTranslation = <P extends any>(
  elm: React.ReactElement<P>,
  options?: ShallowRendererProps,
): ShallowWrapper<P & WithTranslation> => {
  // @ts-ignore
  const cloned = React.cloneElement<P & WithTranslation>(elm, {
    i18n: undefined,
    t: (msg: string) => msg,
    tReady: undefined,
  });

  return shallow<P & WithTranslation>(cloned, options);
};

export const mountWithTranslation = (elm: React.ReactElement) => {
  return mount(React.cloneElement(elm, { t: msg => msg }));
};
// export function shallow<P>(node: ReactElement<P>, options?: ShallowRendererProps): ShallowWrapper<P, any>;
