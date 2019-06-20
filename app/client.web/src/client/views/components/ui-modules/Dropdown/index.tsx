/**
 * A dropdown allows a user to select a value from a series of options.
 *
 * --> https://react.semantic-ui.com/modules/dropdown/
 */
import "semantic-ui-less/definitions/modules/dropdown.less";
// import "semantic-ui-less/definitions/collections/menu.less";
import {
  Dropdown,
  DropdownProps as _DropdownProps,
  DropdownItemProps as _DropdownItemProps,
} from "semantic-ui-react";

export type DropdownProps = _DropdownProps;
export type DropdownItemProps = _DropdownItemProps;

export default Dropdown;
