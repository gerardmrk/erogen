import * as React from "react";
import { create } from "react-test-renderer";

export const createRenderer = (elm: React.ReactElement) => {
  return create(elm);
};
