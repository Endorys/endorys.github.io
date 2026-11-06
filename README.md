# Endorys research website

The public website for Endorys, an independent medical technology research programme founded by Sadhu Shobab Bollipo in Bengaluru, India. The programme investigates controlled acoustic measurement, conformal sensing and calibrated analysis.

- Website: https://endorys.com/
- Public research: https://github.com/Endorys/platform
- Publication policy: [selective openness](https://github.com/Endorys/platform/blob/main/OPENNESS.md)
- Website permissions: [LICENSE.md](LICENSE.md)

## Current stage

Endorys is at the pre-prototype stage. Architecture documentation, experimental plans and synthetic software examples support independent review. The immediate objective is the **Acoustic Reference Test (E001)**: establishing a reproducible acoustic baseline using a non-biological phantom. Public-facing pages use the descriptive name; protocol links, filenames, schemas and measurement records retain E001 for traceability. Physical and clinical performance remain to be established; no approved device, therapeutic efficacy, funding or partnership is implied. Concept illustrations are not prototypes or measured output.

## Selective openness

Selected protocols, research documentation and reproducibility tools are published under their explicit component licences. Future commercial implementations, hardware detail, firmware, partner work and datasets require review before publication. Existing licence grants remain in force; this policy does not impose new restrictions on licensed reuse.

Keep confidential development in separate private repositories or appropriately controlled storage. Public branches, issues, pull requests and workflow artifacts are not confidential collaboration spaces. Before contributing, agree scope and check ownership, privacy, disclosure and licensing. Do not submit secrets, patient information or confidential employer material.

## Website structure

The site is static HTML/CSS/JavaScript. index.html is the compact homepage; technology.html, applications.html, research.html, about.html and contact.html contain focused details. site.css and site.js provide their shared presentation and navigation. research-library.html retains the full earlier research narrative and all 12 workstreams, using styles.css and app.js. overview.html remains the print-friendly venture overview. platform-architecture.svg is a native concept illustration, not a prototype or measured output.

CNAME holds the custom domain. robots.txt and sitemap.xml support indexing. source-sans-3.woff2 is self-hosted under its bundled font licence. responsive-preview.html and homepage-preview.html are noindex QA previews, not product interfaces. Older homepage section URLs are routed to their relevant detail pages by site.js.

Serve the repository root with a local static server to inspect changes. Verify local links, navigation, keyboard access, narrow-screen layout, image disclosures and factual claims before publishing. Preserve asset notices and existing valid permissions.

## Hosting boundary

The current site is an informational research showcase. GitHub Pages is not the planned host for paid SaaS, commercial transactions or sensitive account/medical-data workflows. Review [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) and select suitable infrastructure before adding such functionality. Moving hosting does not require abandoning GitHub development or the custom domain.

No analytics, account system or submission backend is intentionally implemented in this source. Hosting providers may process request logs under their own policies. Do not treat this static site as a secure collection service.

## Contact

For independent protocol review, laboratory collaboration or a defined engineering enquiry: sadhu.shobab@gmail.com. Begin with a non-confidential description. An enquiry does not itself create an NDA, partnership or commercial agreement.
