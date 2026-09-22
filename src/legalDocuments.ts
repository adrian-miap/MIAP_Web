import snapshot from './legal-documents.json'

const reviewed = '22 September 2026'
const reviewNotice = `<p><strong>Effective date and last reviewed:</strong> ${reviewed}</p>`
const enquiries = '<a href="mailto:enquiries@makeitaplan.com?subject=Data%20Protection%20Enquiry">enquiries@makeitaplan.com</a>'

const cookiePolicy = `
${reviewNotice}
<p>This policy explains the cookies, local storage, scripts and similar technologies used on makeitaplan.com. Read it with our <a href="#/legal/privacy-policy">Privacy Policy</a>.</p>
<h2>1. Your choices</h2>
<p>Optional analytics and marketing technologies stay off until you consent. You can accept all, reject non-essential technologies, or choose categories. Change or withdraw your choice at any time through <strong>Cookie settings</strong> in the footer. Rejecting optional technologies does not prevent use of the site.</p>
<h2>2. Necessary storage and services</h2>
<table><thead><tr><th>Name or service</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead><tbody>
<tr><td>miap-cookie-consent-v1 (local storage)</td><td>Makeitaplan</td><td>Remembers and applies privacy choices.</td><td>Until site data is cleared or the consent version changes.</td></tr>
<tr><td>Beacon Forms and beacon_vid</td><td>Beacon CRM / Beacon Products Ltd</td><td>Displays, secures and processes the enquiry form and its sessions.</td><td>Session data varies; beacon_vid may last up to 365 days.</td></tr>
<tr><td>hCaptcha storage and device signals</td><td>Intuition Machines, Inc.</td><td>Protects the enquiry form against spam and abuse.</td><td>Session and security-dependent durations.</td></tr>
</tbody></table>
<h2>3. Analytics technologies</h2>
<p>These load only after Analytics consent.</p>
<table><thead><tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Typical duration</th></tr></thead><tbody>
<tr><td>_ga</td><td>Google Analytics</td><td>Distinguishes visitors and measures site use.</td><td>Up to 2 years.</td></tr>
<tr><td>_ga_&lt;container-id&gt;</td><td>Google Analytics</td><td>Maintains session and measurement state.</td><td>Up to 2 years.</td></tr>
<tr><td>_gid / _gat, if set</td><td>Google Analytics</td><td>Short-term measurement and rate control.</td><td>24 hours / 1 minute.</td></tr>
<tr><td>_clck</td><td>Microsoft Clarity</td><td>Persists a Clarity visitor identifier and preferences.</td><td>Up to 1 year.</td></tr>
<tr><td>_clsk</td><td>Microsoft Clarity</td><td>Connects page views into a session.</td><td>Up to 1 day.</td></tr>
<tr><td>CLID, ANONCHK, MR, MUID and SM, if set</td><td>Microsoft / Clarity</td><td>Supports consent, session and visitor signals.</td><td>Session to approximately 13 months.</td></tr>
</tbody></table>
<h2>4. Marketing technologies</h2>
<p>Marketing consent permits advertising measurement or personalisation signals if configured. We do not currently load a separate advertising platform merely because this option is available. We will update this policy before introducing another marketing technology.</p>
<h2>5. Lawful basis and transfers</h2>
<p>We rely on consent under the Privacy and Electronic Communications Regulations 2003 (PECR), as amended, and the UK GDPR for optional technologies. Necessary technologies are used where strictly necessary to provide a requested service, remember privacy choices or secure the form.</p>
<p>Some providers process information outside the UK using applicable UK adequacy regulations or safeguards such as the UK International Data Transfer Agreement or UK Addendum.</p>
<h2>6. Controls and contact</h2>
<p>Browser controls can also delete or block cookies, but may remove your saved choice or affect the enquiry form. Questions: ${enquiries}.</p>`

const privacyPolicy = `
${reviewNotice}
<p>Makeitaplan Limited is committed to protecting personal data. This notice explains what we collect, why we use it, who receives it, how long we keep it and your rights.</p>
<h2>1. Controller and Data Protection Officer</h2>
<p>Makeitaplan Limited is the controller. <strong>Data Protection Officer:</strong> Gemma Cutler.<br /><strong>Email:</strong> ${enquiries}<br /><strong>Postal address:</strong> Makeitaplan Ltd, 47 Brook Road, Horsham, West Sussex RH12 5FS<br /><strong>Telephone:</strong> +44 (0) 203 6579 666</p>
<h2>2. Scope and children</h2>
<p>This notice covers website visitors, prospective clients, client contacts, suppliers and people who contact us. The site and our consultancy services are directed to organisations and adults. We do not knowingly collect children's personal data through this site. Please contact the DPO if you believe a child has provided personal data.</p>
<h2>3. Personal data we collect</h2>
<ul>
<li><strong>Identity and contact data:</strong> name, work role, organisation, postal address, email address and telephone number.</li>
<li><strong>Enquiry and relationship data:</strong> form content, correspondence, preferences, feedback, project requirements and service history.</li>
<li><strong>Contract, transaction and finance data:</strong> quotations, orders, invoices, payments and limited bank information needed for business accounting. We do not collect payment-card details through this website.</li>
<li><strong>Technical and usage data:</strong> IP address, browser/device information, pages, interactions, referral source, approximate location and consent choices where analytics is enabled.</li>
<li><strong>Marketing data:</strong> records of communication preferences, consent, objection or opt-out where relevant.</li>
</ul>
<p>We do not intend to collect special-category or criminal-offence data through the website. Please do not include such data in the enquiry form unless necessary and agreed with us.</p>
<h2>4. How we collect data</h2>
<p>We collect data directly when you contact us, submit the Beacon form, request or receive services, communicate with us or provide feedback. Essential security tools collect limited technical data. Google Analytics and Microsoft Clarity collect usage data only with consent. We may receive business-contact data from your organisation, public professional sources, software partners or referrals.</p>
<h2>5. Purposes and lawful bases</h2>
<table><thead><tr><th>Purpose</th><th>Data used</th><th>Lawful basis</th></tr></thead><tbody>
<tr><td>Respond to enquiries, assess requirements and take steps before a contract.</td><td>Identity, contact and enquiry data.</td><td>Steps at your request before a contract; legitimate interests in responding to organisational enquiries.</td></tr>
<tr><td>Provide consultancy, implementation, migration, training and support.</td><td>Contact, project, contract and service data.</td><td>Contract; legitimate interests in administering business-to-business services.</td></tr>
<tr><td>Manage billing, accounting, tax, disputes and records.</td><td>Transaction, finance, contract and correspondence data.</td><td>Contract; legal obligation; legitimate interests in debt recovery and legal claims.</td></tr>
<tr><td>Operate, secure, troubleshoot and improve the website.</td><td>Technical, usage and security data.</td><td>Legitimate interests in secure and effective services; consent where PECR requires it.</td></tr>
<tr><td>Measure website use with Google Analytics and Microsoft Clarity.</td><td>Technical and usage data.</td><td>Consent.</td></tr>
<tr><td>Send relevant business marketing where used.</td><td>Business contact and preference data.</td><td>Consent where PECR requires it; otherwise legitimate interests, subject to your absolute right to object.</td></tr>
<tr><td>Protect rights, prevent fraud and comply with regulators or law.</td><td>Relevant data.</td><td>Legal obligation; legitimate interests in security and legal claims.</td></tr>
</tbody></table>
<p>Where we rely on legitimate interests, we balance our interests against your rights. Ask the DPO about a specific assessment.</p>
<h2>6. Recipients and service providers</h2>
<p>We share only necessary data with staff, contractors and professional advisers; Beacon CRM/Beacon Products Ltd and hCaptcha for enquiries; Google Analytics and Microsoft Clarity where consented; GitHub and Cloudflare for hosting, delivery and security; accounting, banking, insurance and IT suppliers; software partners involved in requested services; and public authorities where required.</p>
<p>Processors must use data only under our written instructions and apply confidentiality and security requirements. Some providers act as separate controllers for limited purposes, and their privacy notices also apply.</p>
<h2>7. International transfers</h2>
<p>Some providers may process personal data outside the UK. Before a restricted transfer, we use a lawful UK mechanism such as UK adequacy regulations, the UK International Data Transfer Agreement, the UK Addendum to EU Standard Contractual Clauses, or another permitted safeguard or exception. Where required, we complete a transfer risk assessment or data protection test and apply supplementary measures. Contact the DPO for information about relevant safeguards.</p>
<h2>8. Security and automated processing</h2>
<p>We use proportionate technical and organisational measures including access controls, secure hosting and transport, least privilege, supplier review, backups, confidentiality and incident procedures. We notify affected people and regulators where legally required.</p>
<p>hCaptcha uses automated risk assessment to distinguish genuine form submissions from spam or abuse. This may affect whether a form can be submitted, but it is a security decision rather than a decision producing legal or similarly significant effects. Google Analytics and Microsoft Clarity create usage measurements after consent. We do not make solely automated decisions about individuals that produce legal or similarly significant effects.</p>
<h2>9. Retention</h2>
<table><thead><tr><th>Record</th><th>Typical retention</th></tr></thead><tbody>
<tr><td>General or unsuccessful enquiries</td><td>Up to 24 months after last meaningful contact.</td></tr>
<tr><td>Client contracts, projects and support records</td><td>Contract duration plus 6 years, unless a claim or legal obligation requires longer.</td></tr>
<tr><td>Invoices, tax and accounting records</td><td>At least 6 years after the relevant financial year.</td></tr>
<tr><td>Marketing records</td><td>Reviewed at least every 24 months and retained until opt-out or no longer relevant; a minimal suppression record may be retained to honour an objection.</td></tr>
<tr><td>Consent record</td><td>Until site data is cleared or the consent version changes.</td></tr>
<tr><td>Analytics data</td><td>The configured provider retention period, reviewed periodically and limited to what is necessary.</td></tr>
<tr><td>Complaints and rights requests</td><td>Normally 6 years after closure where needed to demonstrate compliance or manage claims.</td></tr>
</tbody></table>
<p>We may keep data longer for a live complaint, investigation, litigation hold or legal requirement. Active data is deleted or anonymised when no longer needed. Deleted data may remain in encrypted, access-restricted disaster-recovery backups until those backups rotate out under our backup schedule.</p>
<h2>10. Marketing and cookies</h2>
<p>You can object to direct marketing at any time by contacting us or using any unsubscribe option provided. We do not sell personal data. Optional analytics and marketing technologies remain off until you consent. Change choices through <strong>Cookie settings</strong> in the footer. See our <a href="#/legal/cookie-policy">Cookie Policy</a>.</p>
<h2>11. Your rights</h2>
<p>Subject to legal conditions and exemptions, you may request access, correction, erasure, restriction or portability, object to processing, withdraw consent, and challenge relevant automated decisions.</p>
<p>Rights requests are normally free. We may request information to verify identity or clarify the request. We respond without undue delay and usually within one month. The statutory period may be paused while we reasonably await verification or clarification and may be extended where law permits for complex or multiple requests; we will explain any extension or refusal.</p>
<h2>12. Data-protection complaints</h2>
<p>Complain by email to ${enquiries}, through our <a href="#/contact">electronic contact form</a>, by post to the DPO, or by telephone. We will acknowledge receipt within 30 days, make appropriate enquiries, keep you informed of progress where necessary and provide an outcome without undue delay.</p>
<p>If dissatisfied, you may complain to the Information Commissioner's Office at <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</a> or 0303 123 1113. We would appreciate the opportunity to respond first, but this does not restrict your right to approach the regulator.</p>
<h2>13. Changes</h2>
<p>We review this notice regularly and update the date above. Material changes may also be communicated directly where appropriate. Please tell us if your personal data changes.</p>`

const updatePrivacy = () => privacyPolicy

const updateTerms = (html: string) => {
  let updated = html
    .replace(/makeitaplan\.co\.uk/gi, 'makeitaplan.com')
    .replace(/General Data Protection Regulation \(\(EU\) 2016\/679\)/g, 'UK General Data Protection Regulation (UK GDPR)')
    .replace(/outside of the European Economic Area/gi, 'outside the United Kingdom')
  updated += `
<h2>Data processing addendum</h2>
<p>Applicable data-protection law includes the UK GDPR, Data Protection Act 2018, PECR as amended, and the Data (Use and Access) Act 2025.</p>
<h3>Processing details</h3>
<table><tbody><tr><th>Subject matter</th><td>CRM consultancy, implementation, configuration, migration, training, support and troubleshooting described in the contract.</td></tr><tr><th>Duration</th><td>The contract term and any documented transition, return, deletion or legally required retention period.</td></tr><tr><th>Nature and purpose</th><td>Accessing, organising, validating, importing, exporting, configuring, testing, reporting on and supporting Customer CRM data solely to deliver the contracted services.</td></tr><tr><th>Personal data</th><td>Identity, contact, relationship, donation, membership, volunteering, event, case-management and other CRM fields specified by the Customer. Special-category data is included only where expressly documented and necessary.</td></tr><tr><th>Data subjects</th><td>Supporters, donors, beneficiaries, volunteers, members, event participants, employees, suppliers and other people represented in Customer data.</td></tr></tbody></table>
<p>Where Makeitaplan processes personal data solely on a Customer's documented instructions, it will process only on those instructions; ensure personnel confidentiality and proportionate security; impose equivalent duties on subprocessors and remain responsible for them; assist with rights requests, security, breaches, DPIAs and regulator consultation; notify breaches without undue delay; return or delete data at the end unless law requires retention; provide compliance information and permit proportionate audits; and flag apparently unlawful instructions.</p>
<h3>Security measures</h3>
<p>Measures appropriate to the documented risks include least-privilege access, individual accounts and authentication controls, encryption in transit, appropriate encryption or equivalent protection at rest, secure transfer methods, confidentiality obligations, supported devices and software, malware protection, backups where applicable, logging and monitoring appropriate to the service, supplier due diligence, incident response, secure deletion, and periodic review of access and controls.</p>
<h3>Subprocessors</h3>
<p>The Customer gives general written authorisation for subprocessors reasonably necessary to deliver the services. Makeitaplan will maintain a current list in the order documentation or data-processing schedule, notify the Customer before a material new subprocessor is used, and allow a reasonable period to object on evidenced data-protection grounds. If the parties cannot resolve an objection, either may terminate the affected service without penalty beyond charges already incurred.</p>
<p>Restricted transfers require a lawful UK mechanism and assessment, including adequacy regulations, the UK IDTA or UK Addendum where appropriate. Detailed processing, subprocessors and security measures may be recorded in the quotation, specification or a separate schedule.</p>`
  return `${reviewNotice}${updated}`
}

const legalData = {
  updatedAt: '2026-09-22',
  documents: snapshot.documents.map((document) => {
    if (document.slug === 'cookie-policy') return { ...document, source: 'local', html: cookiePolicy }
    if (document.slug === 'privacy-policy') return { ...document, source: 'local', html: updatePrivacy() }
    if (document.slug === 'terms-and-conditions') return { ...document, source: 'local', html: updateTerms(document.html) }
    return { ...document, source: 'local', html: `${reviewNotice}${document.html.replace(/makeitaplan\.co\.uk/gi, 'makeitaplan.com')}` }
  }),
}

export default legalData
