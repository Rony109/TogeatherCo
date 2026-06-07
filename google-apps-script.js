// ================================================================
//  Togeather Co — Google Apps Script
// ================================================================
//
//  SETUP (one-time):
//  1. Open your Google Sheet (create one if needed).
//     Rename the first tab to "Waitlist".
//
//  2. Click Extensions → Apps Script.
//     Delete any default code, paste this entire file, Save (Ctrl+S).
//
//  3. Click Deploy → New deployment.
//     Type: Web app
//     Execute as: Me
//     Who has access: Anyone
//     Click Deploy → copy the Web App URL.
//
//  4. In index.html, find the SHEET_URL constant near the bottom
//     of the <script> block and replace the placeholder with
//     your Web App URL.
//
//  5. Update FROM_EMAIL and REPLY_TO below to your real address.
//     The email is sent from your Google account by default.
// ================================================================

// -- Configuration -----------------------------------------------
var SHEET_NAME = 'Waitlist';
var FROM_NAME  = 'Togeather Co';
var FROM_EMAIL = 'togeatherco@gmail.com'; // Update to your address
var REPLY_TO   = 'togeatherco@gmail.com'; // Update to your address
// ----------------------------------------------------------------

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    addToSheet(data);
    sendConfirmationEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('Togeather doPost error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Sheet insertion ─────────────────────────────────────────────
function addToSheet(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Write header row on first use
  if (sheet.getLastRow() === 0) {
    var header = sheet.getRange(1, 1, 1, 7);
    header.setValues([['#', 'Timestamp', 'Full Name', 'Email', 'Phone', 'Gender', 'City']]);
    header.setFontWeight('bold');
    header.setBackground('#3e1622');
    header.setFontColor('#d4b896');
  }

  var rowIndex = sheet.getLastRow(); // 0-based entry number
  sheet.appendRow([
    rowIndex,                                          // entry #
    data.timestamp || new Date().toISOString(),        // timestamp
    data.fullName  || '',                              // name
    data.email     || '',                              // email
    data.phone     || '',                              // phone
    data.gender    || '',                              // gender
    data.city      || ''                               // city
  ]);

  sheet.autoResizeColumns(1, 7);
}

// ── Confirmation email ──────────────────────────────────────────
function sendConfirmationEmail(data) {
  var firstName = data.fullName
    ? data.fullName.trim().split(' ')[0]
    : 'there';

  GmailApp.sendEmail(
    data.email,
    "You're on the list — Togeather Co",
    // Plain-text fallback
    "Hi " + firstName + ",\n\nYou're officially on the Togeather Co waitlist!\n\nAs a founding member you'll get first access to our launch events in the Greater Toronto Area.\n\nWe'll be in touch soon.\n\n— The Togeather Co Team\ntogeatherco@gmail.com",
    {
      name:     FROM_NAME,
      replyTo:  REPLY_TO,
      htmlBody: buildEmailHtml(firstName, data)
    }
  );
}

// ── HTML email template ─────────────────────────────────────────
// Inline styles only — email clients strip <style> blocks.
// Colours and typography match the Togeather Co landing page.
function buildEmailHtml(firstName, data) {
  return '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
'  <meta charset="UTF-8"/>' +
'  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>' +
'  <title>You\'re on the list — Togeather Co</title>' +
'</head>' +
'<body style="margin:0;padding:0;background-color:#fdf6f0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:#2c1810;">' +

// ── Outer wrapper
'<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background-color:#fdf6f0;">' +
'<tr><td align="center" style="padding:40px 16px;">' +

// ── Card
'<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width:580px;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(62,22,34,.12);">' +

// ── HEADER ──────────────────────────────────────────────────────
'<tr>' +
'  <td align="center" style="background:linear-gradient(135deg,#3e1622 0%,#5c2535 60%,#7a3348 100%);padding:44px 40px 36px;">' +
'    <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:0 auto 14px;">' +
'      <tr>' +
'        <td style="padding-right:10px;vertical-align:middle;">' +
'          <img src="https://via.placeholder.com/38x25/d4b896/d4b896?text=+" width="38" height="25" alt="" style="display:block;"/>' +
          // SVG logo as table-cell fallback text
'        </td>' +
'        <td style="vertical-align:middle;">' +
'          <span style="font-size:26px;font-weight:700;color:#ffffff;font-family:Georgia,serif;letter-spacing:-.01em;">To<span style="color:#d4b896;">geather Co</span></span>' +
'        </td>' +
'      </tr>' +
'    </table>' +
'    <p style="margin:0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:rgba(212,184,150,.7);font-family:Helvetica,Arial,sans-serif;font-weight:500;">Premium Matchmaking Events &middot; Greater Toronto Area</p>' +
'  </td>' +
'</tr>' +

// ── HERO MESSAGE ────────────────────────────────────────────────
'<tr>' +
'  <td align="center" style="padding:48px 40px 36px;border-bottom:1px solid #f5dfe0;">' +
'    <p style="margin:0 0 8px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#b8906a;font-weight:600;font-family:Helvetica,Arial,sans-serif;">You\'re officially on the list</p>' +
'    <h1 style="margin:0 0 18px;font-family:Georgia,\'Times New Roman\',serif;font-size:38px;font-weight:700;color:#3e1622;line-height:1.2;">Welcome, <em style="color:#b8906a;font-style:italic;">' + firstName + '</em></h1>' +
'    <p style="margin:0 auto;font-size:16px;color:#6b4040;line-height:1.75;max-width:400px;font-family:Helvetica,Arial,sans-serif;">' +
'      You\'ve secured your spot as a founding member of Togeather Co. We\'re building something special in the Greater Toronto Area &mdash; and you\'re in.' +
'    </p>' +
'  </td>' +
'</tr>' +

// ── WHAT'S NEXT ─────────────────────────────────────────────────
'<tr>' +
'  <td style="padding:36px 40px 28px;background-color:#fdf6f0;">' +
'    <p style="margin:0 0 22px;font-family:Georgia,\'Times New Roman\',serif;font-size:20px;font-weight:700;color:#3e1622;">What happens next</p>' +

    // Step 1
'    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="margin-bottom:18px;">' +
'      <tr>' +
'        <td style="width:40px;vertical-align:top;padding-top:2px;">' +
'          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#f5dfe0,#efe0cc);border:1.5px solid #d4b896;text-align:center;font-family:Georgia,serif;font-size:14px;font-weight:700;color:#5c2535;line-height:32px;">1</div>' +
'        </td>' +
'        <td style="padding-left:14px;">' +
'          <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#3e1622;font-family:Helvetica,Arial,sans-serif;">You\'re on the priority list</p>' +
'          <p style="margin:0;font-size:13px;color:#a08080;line-height:1.65;font-family:Helvetica,Arial,sans-serif;">As a founding member you\'ll get first access to events and exclusive launch pricing.</p>' +
'        </td>' +
'      </tr>' +
'    </table>' +

    // Step 2
'    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="margin-bottom:18px;">' +
'      <tr>' +
'        <td style="width:40px;vertical-align:top;padding-top:2px;">' +
'          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#f5dfe0,#efe0cc);border:1.5px solid #d4b896;text-align:center;font-family:Georgia,serif;font-size:14px;font-weight:700;color:#5c2535;line-height:32px;">2</div>' +
'        </td>' +
'        <td style="padding-left:14px;">' +
'          <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#3e1622;font-family:Helvetica,Arial,sans-serif;">We\'ll review your application</p>' +
'          <p style="margin:0;font-size:13px;color:#a08080;line-height:1.65;font-family:Helvetica,Arial,sans-serif;">Every member is personally reviewed. Expect a follow-up from us within a few days.</p>' +
'        </td>' +
'      </tr>' +
'    </table>' +

    // Step 3
'    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%">' +
'      <tr>' +
'        <td style="width:40px;vertical-align:top;padding-top:2px;">' +
'          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#f5dfe0,#efe0cc);border:1.5px solid #d4b896;text-align:center;font-family:Georgia,serif;font-size:14px;font-weight:700;color:#5c2535;line-height:32px;">3</div>' +
'        </td>' +
'        <td style="padding-left:14px;">' +
'          <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#3e1622;font-family:Helvetica,Arial,sans-serif;">Your first invitation arrives</p>' +
'          <p style="margin:0;font-size:13px;color:#a08080;line-height:1.65;font-family:Helvetica,Arial,sans-serif;">When launch events are confirmed you\'ll receive an exclusive invitation before the general public.</p>' +
'        </td>' +
'      </tr>' +
'    </table>' +
'  </td>' +
'</tr>' +

// ── YOUR DETAILS ─────────────────────────────────────────────────
'<tr>' +
'  <td style="padding:0 40px 36px;background-color:#fdf6f0;">' +
'    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="background-color:#ffffff;border-radius:12px;border:1px solid #e8d5cc;overflow:hidden;">' +
'      <tr>' +
'        <td colspan="2" style="padding:16px 22px 14px;border-bottom:1px solid #f5dfe0;">' +
'          <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#a08080;font-family:Helvetica,Arial,sans-serif;">Your registration</p>' +
'        </td>' +
'      </tr>' +
'      <tr>' +
'        <td style="padding:10px 22px 2px;font-size:12px;color:#a08080;font-family:Helvetica,Arial,sans-serif;width:70px;">Name</td>' +
'        <td style="padding:10px 22px 2px;font-size:13px;font-weight:500;color:#3e1622;font-family:Helvetica,Arial,sans-serif;">' + (data.fullName || '') + '</td>' +
'      </tr>' +
'      <tr>' +
'        <td style="padding:2px 22px;font-size:12px;color:#a08080;font-family:Helvetica,Arial,sans-serif;">Email</td>' +
'        <td style="padding:2px 22px;font-size:13px;font-weight:500;color:#3e1622;font-family:Helvetica,Arial,sans-serif;">' + (data.email || '') + '</td>' +
'      </tr>' +
'      <tr>' +
'        <td style="padding:2px 22px;font-size:12px;color:#a08080;font-family:Helvetica,Arial,sans-serif;">Gender</td>' +
'        <td style="padding:2px 22px;font-size:13px;font-weight:500;color:#3e1622;font-family:Helvetica,Arial,sans-serif;">' + (data.gender || '') + '</td>' +
'      </tr>' +
'      <tr>' +
'        <td style="padding:2px 22px 12px;font-size:12px;color:#a08080;font-family:Helvetica,Arial,sans-serif;">City</td>' +
'        <td style="padding:2px 22px 12px;font-size:13px;font-weight:500;color:#3e1622;font-family:Helvetica,Arial,sans-serif;">' + (data.city || '') + '</td>' +
'      </tr>' +
'    </table>' +
'  </td>' +
'</tr>' +

// ── CTA DIVIDER ──────────────────────────────────────────────────
'<tr>' +
'  <td align="center" style="padding:8px 40px 40px;background-color:#fdf6f0;">' +
'    <p style="margin:0 0 22px;font-size:14px;color:#6b4040;line-height:1.65;font-family:Helvetica,Arial,sans-serif;">Follow us for event announcements and sneak peeks.</p>' +
'    <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:0 auto;">' +
'      <tr>' +
'        <td style="padding:0 6px;"><a href="#" style="display:inline-block;width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(212,184,150,.45);text-decoration:none;text-align:center;line-height:44px;color:#d4b896;font-size:11px;font-weight:600;font-family:Helvetica,Arial,sans-serif;background-color:transparent;">IG</a></td>' +
'        <td style="padding:0 6px;"><a href="#" style="display:inline-block;width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(212,184,150,.45);text-decoration:none;text-align:center;line-height:44px;color:#d4b896;font-size:11px;font-weight:600;font-family:Helvetica,Arial,sans-serif;background-color:transparent;">TK</a></td>' +
'        <td style="padding:0 6px;"><a href="#" style="display:inline-block;width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(212,184,150,.45);text-decoration:none;text-align:center;line-height:44px;color:#d4b896;font-size:11px;font-weight:600;font-family:Helvetica,Arial,sans-serif;background-color:transparent;">in</a></td>' +
'      </tr>' +
'    </table>' +
'  </td>' +
'</tr>' +

// ── FOOTER ───────────────────────────────────────────────────────
'<tr>' +
'  <td style="background-color:#3e1622;padding:28px 40px;text-align:center;">' +
'    <p style="margin:0 0 8px;font-size:12px;font-family:Helvetica,Arial,sans-serif;">' +
'      <a href="mailto:togeatherco@gmail.com" style="color:rgba(212,184,150,.75);text-decoration:none;">togeatherco@gmail.com</a>' +
'      <span style="color:rgba(255,255,255,.2);padding:0 8px;">&middot;</span>' +
'      <a href="#" style="color:rgba(253,240,240,.35);text-decoration:none;">Privacy Policy</a>' +
'      <span style="color:rgba(255,255,255,.2);padding:0 8px;">&middot;</span>' +
'      <a href="#" style="color:rgba(253,240,240,.35);text-decoration:none;">Unsubscribe</a>' +
'    </p>' +
'    <p style="margin:0;font-size:11px;color:rgba(255,255,255,.2);font-family:Helvetica,Arial,sans-serif;">&copy; 2025 Togeather Co. Greater Toronto Area, Canada.</p>' +
'  </td>' +
'</tr>' +

'</table>' + // end card
'</td></tr>' +
'</table>' + // end outer wrapper

'</body>' +
'</html>';
}
