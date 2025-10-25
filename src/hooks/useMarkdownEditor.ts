import { RefObject } from "react";

export const useMarkdownEditor = (textareaRef: RefObject<HTMLTextAreaElement>) => {
  const insertAtCursor = (text: string, offsetStart = 0, offsetEnd = 0) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;
    
    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
    
    // Return the new value and cursor position
    return {
      value: newValue,
      cursorStart: start + offsetStart,
      cursorEnd: start + offsetEnd,
    };
  };

  const wrapSelection = (before: string, after: string, onChange: (content: string) => void) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const text = selectedText || "texto";

    const result = insertAtCursor(before + text + after, before.length, before.length + text.length);
    if (result) {
      onChange(result.value);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(result.cursorStart, result.cursorEnd);
      }, 0);
    }
  };

  const insertAtLineStart = (prefix: string, onChange: (content: string) => void) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const value = textarea.value;
    
    // Find the start of the current line
    let lineStart = start;
    while (lineStart > 0 && value[lineStart - 1] !== '\n') {
      lineStart--;
    }

    // Check if prefix already exists
    const lineEnd = value.indexOf('\n', lineStart);
    const currentLine = lineEnd === -1 ? value.substring(lineStart) : value.substring(lineStart, lineEnd);
    
    if (currentLine.startsWith(prefix)) {
      // Remove prefix
      const newValue = value.substring(0, lineStart) + currentLine.substring(prefix.length) + value.substring(lineStart + currentLine.length);
      onChange(newValue);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start - prefix.length, start - prefix.length);
      }, 0);
    } else {
      // Add prefix
      const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart);
      onChange(newValue);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      }, 0);
    }
  };

  const formatBold = (onChange: (content: string) => void) => {
    wrapSelection("**", "**", onChange);
  };

  const formatItalic = (onChange: (content: string) => void) => {
    wrapSelection("*", "*", onChange);
  };

  const formatCode = (onChange: (content: string) => void) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    // Multi-line code block
    if (selectedText.includes('\n')) {
      wrapSelection("```\n", "\n```", onChange);
    } else {
      // Inline code
      wrapSelection("`", "`", onChange);
    }
  };

  const formatHeading = (level: number, onChange: (content: string) => void) => {
    const prefix = "#".repeat(level) + " ";
    insertAtLineStart(prefix, onChange);
  };

  const formatList = (onChange: (content: string) => void) => {
    insertAtLineStart("- ", onChange);
  };

  const formatOrderedList = (onChange: (content: string) => void) => {
    insertAtLineStart("1. ", onChange);
  };

  const formatQuote = (onChange: (content: string) => void) => {
    insertAtLineStart("> ", onChange);
  };

  return {
    formatBold,
    formatItalic,
    formatCode,
    formatHeading,
    formatList,
    formatOrderedList,
    formatQuote,
  };
};
