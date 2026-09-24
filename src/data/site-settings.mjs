export const previewBuild = process.env.PREVIEW_BUILD === 'true';
// A blank ID is intentional. Never borrow another website's measurement ID.
export const analyticsId = previewBuild ? '' : (process.env.PUBLIC_GA_ID || '').trim();
if (analyticsId && !/^G-[A-Z0-9]{6,20}$/.test(analyticsId)) throw new Error('PUBLIC_GA_ID must be blank or a valid GA4 measurement ID.');
export const consentVersion = `1:${analyticsId || 'disabled'}`;
export const contactEmail = 'jh@jameshoward.us';
