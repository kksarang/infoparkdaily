"""Inspect generated PDF text and A4 page bounds; render contact sheets for review."""
import json
from pathlib import Path
import fitz

root = Path('artifacts/resume-builder')
manifest = json.loads((root / 'manifest.json').read_text())
results = []
errors = []
for item in manifest:
    doc = fitz.open(root / item['file'])
    text = '\n'.join(page.get_text() for page in doc)
    compact = ' '.join(text.split())
    expected = ' '.join(item['expectedName'].split())
    if expected not in compact:
        errors.append(f"Missing name: {item['file']}")
    if item['fixture'] == 'edge' and 'Community volunteer' not in text:
        errors.append(f"Missing custom section: {item['file']}")
    if '\ufffd' in text or '\x00' in text:
        errors.append(f"Broken text extraction: {item['file']}")
    for number, page in enumerate(doc):
        if abs(page.rect.width - 595.28) > 2 or abs(page.rect.height - 841.89) > 2:
            errors.append(f"Not A4: {item['file']} page {number + 1}")
        for word in page.get_text('words'):
            x0, y0, x1, y1 = word[:4]
            if x0 < 0 or y0 < 0 or x1 > page.rect.width + 1 or y1 > page.rect.height + 1:
                errors.append(f"Text outside page: {item['file']} page {number + 1}")
    results.append({**item, 'pages':len(doc), 'text_characters':len(text)})
    if item['fixture'] == 'fresher':
        doc[0].get_pixmap(matrix=fitz.Matrix(0.6, 0.6)).save(root / (item['template'] + '.png'))
    doc.close()
# Render a four-column contact sheet with a PDF renderer.
items = [i for i in manifest if i['fixture'] == 'fresher']
for batch in range((len(items) + 11) // 12):
    sheet = fitz.open()
    page = sheet.new_page(width=1200, height=1080)
    for offset, item in enumerate(items[batch*12:(batch+1)*12]):
        col, row = offset % 4, offset // 4
        page.insert_image(fitz.Rect(col*300+12,row*360+25,col*300+288,row*360+335),filename=str(root/(item['template']+'.png')),keep_proportion=True)
        page.insert_text((col*300+14,row*360+350),item['template'],fontsize=10)
    page.get_pixmap().save(root / f'contact-sheet-{batch+1}.png')
(root/'qa-report.json').write_text(json.dumps({'checked':len(results),'errors':errors,'results':results},indent=2))
print(json.dumps({'checked':len(results),'errors':errors,'page_counts':sorted(set(i['pages'] for i in results))},indent=2))
if errors:
    raise SystemExit(1)
