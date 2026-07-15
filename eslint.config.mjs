import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = [
  ...nextCoreWebVitals,
  prettier,
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  {
    // React Compiler-era rules (react-hooks 7) flag intentional patterns in
    // these animation prototypes. Keep them as advisories, not hard errors.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]

export default eslintConfig
