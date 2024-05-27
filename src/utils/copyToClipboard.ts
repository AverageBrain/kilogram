export const copyToClipboard = (
  content: string,
) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(content);
  } else {
    const text = document.createElement('textarea');
    text.value = content;
    document.body.appendChild(text);
    text.select();
    try {
      document.execCommand('copy');
    } catch {
      console.warn('Copy error');
    } finally {
      document.body.removeChild(text);
    }
  }
};
