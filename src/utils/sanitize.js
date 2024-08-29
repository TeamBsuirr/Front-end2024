import DOMPurify from 'dompurify';

export const sanitizeHTML = (htmlContent) => {
  return DOMPurify.sanitize(htmlContent);
};
