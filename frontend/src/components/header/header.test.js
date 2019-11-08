import React from "react";
import { shallow } from "enzyme";
import Header from "./index";
import { findByTestAttribute } from "../../../utils";

const setUp = (props = {}) => shallow(<Header {...props} />);

describe("Header Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("Should render without errors", () => {
    const component = findByTestAttribute(wrapper, "headerComponent");
    expect(component).toHaveLength(1);
  });

  it("Shoulf render links", () => {
    const links = findByTestAttribute(wrapper, "link");
    expect(links).toHaveLength(2);
  });
});
