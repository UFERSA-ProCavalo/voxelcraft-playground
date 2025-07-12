export default { extends: ['@commitlint/config-conventional'] ,
    rules: {
        'header-max-length': [2, 'always', 100],
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'chore',
                'revert',
                'build',
                'ci'
            ]
        ],
        'scope-empty': [2, 'never'],
        'scope-enum': [2, 'always', [
  "ci",
  "cli",
  "config",
  "libs",
  "apps",
  "packages",
  "deps",
  "core",
  "home",
  "playground",
  "docs",
  "repo",
  "scripts",
  "tests",
  "ui"
]
]
    }
};
