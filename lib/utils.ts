import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboardBySelector(selector: string) {
  const copyText: HTMLDivElement | null = document.getElementById(
    selector
  ) as HTMLDivElement;

  if (copyText) {
    navigator.clipboard
      .writeText(copyText.textContent || "")
      .then(function () {
        /* Alert the copied text */
        alert(`Copied the text: ${copyText.textContent}`);
      })
      .catch(function (error) {
        alert("Copy failed: " + error);
      });
  } else {
    alert("Element not found");
  }
}

export function copyToClipboardByText(text: string) {
  let copyText = text;

  if (copyText) {
    navigator.clipboard
      .writeText(copyText || "")
      .then(function () {
        /* Alert the copied text */
        alert(`Copied the text: ${copyText}`);
      })
      .catch(function (error) {
        alert("Copy failed: " + error);
      });
  } else {
    alert("Element not found");
  }
}
