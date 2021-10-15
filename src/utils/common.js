export const autoSizeTextarea = (textareaRef, offsetHeight = 5) => {
  textareaRef.style.height = "auto";
  textareaRef.style.height = (textareaRef.scrollHeight + offsetHeight) + "px";
};
