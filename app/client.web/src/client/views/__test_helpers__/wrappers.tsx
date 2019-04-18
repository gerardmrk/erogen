import * as React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";

export const mountWithRouter = (elm: React.ReactElement) => {
  return mount(<MemoryRouter>{React.cloneElement(elm)}</MemoryRouter>);
};
export const shallowWithRouter = (elm: React.ReactElement) => {
  return shallow(<MemoryRouter>{React.cloneElement(elm)}</MemoryRouter>);
};

// export const shallowWithTranslation = (elm: React.ReactElement) => {
//   return shallow<
// }
