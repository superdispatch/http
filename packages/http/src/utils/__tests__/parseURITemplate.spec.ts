import extended from 'uritemplate-test/extended-tests.json';
import examplesBySection from 'uritemplate-test/spec-examples-by-section.json';
import examples from 'uritemplate-test/spec-examples.json';

import { parseURITemplate } from '../parseURITemplate';

const specs = [
  ['Examples', examples],
  ['Examples By Section', examplesBySection],
  ['Extended', extended],
] as const;

test('spec content', () => {
  expect(Object.keys(examples)).toMatchInlineSnapshot(`
    Array [
      "Level 1 Examples",
      "Level 2 Examples",
      "Level 3 Examples",
      "Level 4 Examples",
    ]
  `);
  expect(Object.keys(examplesBySection)).toMatchInlineSnapshot(`
    Array [
      "3.2.1 Variable Expansion",
      "3.2.2 Simple String Expansion",
      "3.2.3 Reserved Expansion",
      "3.2.4 Fragment Expansion",
      "3.2.5 Label Expansion with Dot-Prefix",
      "3.2.6 Path Segment Expansion",
      "3.2.7 Path-Style Parameter Expansion",
      "3.2.8 Form-Style Query Expansion",
      "3.2.9 Form-Style Query Continuation",
    ]
  `);
  expect(Object.keys(extended)).toMatchInlineSnapshot(`
    Array [
      "Additional Examples 1",
      "Additional Examples 2",
      "Additional Examples 3: Empty Variables",
      "Additional Examples 4: Numeric Keys",
      "Additional Examples 5: Explode Combinations",
    ]
  `);
});

for (const [description, spec] of specs) {
  describe(description, () => {
    for (const [title, { variables, testcases }] of Object.entries(spec)) {
      for (const [template, expected] of testcases) {
        test(`${title}: ${template as string}`, () => {
          const output = parseURITemplate(template as string, variables);

          if (typeof expected === 'string') {
            expect(output).toBe(expected);
          } else {
            expect(expected).toContain(output);
          }
        });
      }
    }
  });
}
