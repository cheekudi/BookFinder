// Modal.test.ts
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Modal from "../src/components/Modal.vue";

describe("Modal.vue", () => {
  it("renders content via slots", () => {
    const wrapper = mount(Modal, {
      slots: {
        default: '<div class="test-content">Test Content</div>',
      },
    });

    expect(wrapper.find(".test-content").exists()).toBe(true);
    expect(wrapper.find(".test-content").text()).toContain("Test Content");
  });

  it("emits close event when close button is clicked", async () => {
    const wrapper = mount(Modal);

    await wrapper.find(".close-button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("close");
  });

  it("emits close event when backdrop is clicked", async () => {
    const wrapper = mount(Modal);

    // Clicking the modal's backdrop to close the modal
    await wrapper.find(".modal").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("close");
  });

  it("does not emit close event when modal content is clicked", async () => {
    const wrapper = mount(Modal);

    // Clicking inside the modal content should not close the modal
    await wrapper.find(".modal-content").trigger("click");
    expect(wrapper.emitted().close).toBeFalsy();
  });
});
