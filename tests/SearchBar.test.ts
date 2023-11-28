import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SearchBar from "../src/components/SearchBar.vue";

describe("SearchBar.vue", () => {
  it("emits the search event with the query", async () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find("input");
    const testQuery = "Vue.js";

    await input.setValue(testQuery);
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("search");
    expect(wrapper.emitted("search")![0]).toEqual([testQuery]);
  });
});
