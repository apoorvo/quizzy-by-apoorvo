import { toast, Slide } from "react-toastify";

const TOASTR_OPTIONS = {
  position: toast.POSITION.BOTTOM_CENTER,
  transition: Slide,
  theme: "colored"
};

export const ANSWER_OPTIONS = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
  { value: 4, label: "Option 4" }
];

export { TOASTR_OPTIONS };
