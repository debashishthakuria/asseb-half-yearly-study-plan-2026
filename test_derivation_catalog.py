"""Every prescribed chapter has a navigable collection of typeset derivations."""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IDS = (
    'electric-charges-fields', 'potential-capacitance', 'current-electricity',
    'moving-charges-magnetism', 'magnetism-matter', 'electromagnetic-induction',
)

class DerivationCatalog(unittest.TestCase):
    def test_chapter_by_chapter_index(self):
        data = json.loads((ROOT / 'physics-derivation-catalog.json').read_text(encoding='utf-8'))
        self.assertEqual(set(data), set(IDS))
        index = (ROOT / 'physics-derivations.html').read_text(encoding='utf-8')
        self.assertIn('Chapter 1', index)
        self.assertIn('Chapter 6', index)
        for number in range(1, 7):
            self.assertIn(f'href="#chapter-{number}"', index)
            self.assertIn(f'id="chapter-{number}"', index)
        for chapter in IDS:
            entries = data[chapter]
            with self.subTest(chapter=chapter):
                self.assertGreaterEqual(len(entries), 3)
                page = (ROOT / f'physics-{chapter}.html').read_text(encoding='utf-8')
                self.assertGreaterEqual(page.count('class="derivation-steps"'), len(entries))
                self.assertGreaterEqual(page.count('class="katex-mathml"'), 2 * len(entries))
                for item in entries:
                    self.assertIn(item['title'], page)
                    self.assertIn(item['title'], index)
                    self.assertIn('PDF', item['source'])
                    self.assertTrue(item['steps'])
                    self.assertTrue(all(len(step) >= 2 for step in item['steps']))
        self.assertNotIn('Series LCR impedance', index)
        self.assertNotIn('Why a charging capacitor needs displacement current', index)

if __name__ == '__main__':
    unittest.main()
