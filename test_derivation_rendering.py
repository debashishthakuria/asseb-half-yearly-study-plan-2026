"""Regression: derivation answers must use actual typeset mathematical notation."""
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent


class DerivationRendering(unittest.TestCase):
    def test_all_six_derivations_are_typeset_on_both_pages(self):
        workshop = (ROOT / "physics-derivations.html").read_text(encoding="utf-8")
        ids = [
            "electric-charges-fields", "potential-capacitance", "current-electricity",
            "moving-charges-magnetism", "magnetism-matter", "electromagnetic-induction",
        ]
        for chapter in ids:
            with self.subTest(chapter=chapter):
                page = (ROOT / f"physics-{chapter}.html").read_text(encoding="utf-8")
                self.assertIn('class="derivation-steps"', page)
                self.assertIn('class="katex-mathml"', page)
        self.assertGreaterEqual(workshop.count('class="derivation-steps"'), len(ids))
        self.assertGreaterEqual(workshop.count('class="katex-mathml"'), 16)
        self.assertNotIn('V_rms²', workshop)
        self.assertNotIn('∮E·dA', workshop)


if __name__ == "__main__":
    unittest.main()
