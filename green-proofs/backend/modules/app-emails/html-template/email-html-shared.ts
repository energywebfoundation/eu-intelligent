import type { GlobalTemplateParams } from './email-template-params.js';

export type EmailBuilderParams = GlobalTemplateParams;

/**
 * Shift all lines left by the *smallest* indentation level,
 * and remove initial newline and all trailing spaces.
 * source: https://adamcoster.com/blog/prettify-your-javascript-strings
 */
export function undent(content: string) {
  // Remove initial and final newlines
  content = content.replace(/^[\r\n]+/, '').replace(/\s+$/, '');
  const dents = content.match(/^([ \t])*/gm);
  if (!dents || dents.length === 0) {
    return content;
  }
  dents.sort((dent1, dent2) => dent1.length - dent2.length);
  const minDent = dents[0];
  if (!minDent) {
    // Then min indentation is 0, no change needed
    return content;
  }
  // eslint-disable-next-line security/detect-non-literal-regexp
  const dedented = content.replace(new RegExp(`^${minDent}`, 'gm'), '');
  return dedented;
}

/**
 * Notes:
 * 1. This email incorporates some mso- rules, please do not remove them as they are for Outlook 2007-2019
 * 2. @WARN Before modifying the template consult: https://www.caniemail.com/ and https://www.goodemailcode.com/ for Outlook support thing
 * 3. Real testing can be done only in real Outlook unfortunately, the old one which is hard to setup. Mateusz has working setup so ask him as last resort ~9.07.2025
 * 4. The simpler the code the greater chance it will work properly, so don't overcomplicate. Pretend it's year 2006, and you try to be modern webmaster that actually takes care about HTML quality.
 */
export const getEmailTemplate = () => (content: string) => undent(/* html */`
<!doctype html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
    <meta name="x-apple-disable-message-reformatting">
    <link
      href="https://fonts.googleapis.com/css2?family=Geist&display=swap"
      rel="stylesheet"
      type="text/css"
    >
    <style type="text/css">
    </style>
    <title></title>
    <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
  </head>
  <body class="body">
    <table class="table" align="center" role="presentation">
      <!-- Spacing on top -->
      <tr><td style="height: 64px;">&nbsp;</td></tr>

      <!-- Content -->
      <tr>
        <td class="content-cell">
          ${undent(content)}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td class="footer-cell">
        </td>
      </tr>
    </table>
  </body>
</html>
`);
