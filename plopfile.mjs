const choices = [
  { name: 'Common', value: 'Common' },
  { name: 'Form', value: 'Form' },
]

export default function (plop) {
  // コンポーネントジェネレータ
  plop.setGenerator('new page', {
    description: '新規pageの作成',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          '?どこにpageを作成しますか？ >> src/app/ （ex: about, about/sub):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/{{kebabCase name}}/page.tsx',
        templateFile: 'plop-templates/page/page.tsx.hbs',
      },
      {
        type: 'addMany',
        destination: 'src/app/{{kebabCase name}}',
        base: 'plop-templates/page/page-structure',
        templateFiles: 'plop-templates/page/page-structure/**/*.hbs',
      },
    ],
  })
  plop.setGenerator('component in page', {
    description: 'page内でのコンポーネント',
    prompts: [
      {
        type: 'input',
        name: 'page',
        message: '? どのディレクトリに作成しますか？ >> src/app/ （ex: about):',
      },
      {
        type: 'input',
        name: 'name',
        message: '? コンポーネントの名前を入力 (ex: header):',
      },
    ],
    actions: [],
  })
  plop.setGenerator('component in page(ContainerとPresenter)', {
    description: 'page内でのコンポーネント(ContainerとPresenter)',
    prompts: [
      {
        type: 'input',
        name: 'page',
        message:
          '? どのディレクトリに作成しますか？ >> src/app/  （ex: about):',
      },
      {
        type: 'input',
        name: 'path',
        message:
          '? どのディレクトリに作成しますか？ >> src/app/{{page}}/_components/ （ex: header):',
      },
      {
        type: 'input',
        name: 'name',
        message: '? コンポーネントの名前を入力 (ex: header):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/{{kebabCase page}}/_components/{{path}}/{{pascalCase name}}/{{pascalCase name}}Container.tsx',
        templateFile:
          'plop-templates/components/container-presenter/container.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/app/{{kebabCase page}}/_components/{{path}}/{{pascalCase name}}/{{pascalCase name}}Presenter.tsx',
        templateFile:
          'plop-templates/components/container-presenter/presenter.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/app/{{kebabCase page}}/_components/{{path}}/{{pascalCase name}}/index.tsx',
        templateFile:
          'plop-templates/components/container-presenter/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/app/{{kebabCase page}}/_components/{{path}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile:
          'plop-templates/components/container-presenter/stories.tsx.hbs',
      },
    ],
  })
  plop.setGenerator('common component', {
    description: '共通のコンポーネントの作成',
    prompts: [
      {
        type: 'list',
        name: 'choice',
        message: 'どこに作成しますか？',
        choices: choices,
      },
      {
        type: 'input',
        name: 'name',
        message: '? コンポーネントの名前を入力 (ex: header):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/_components/{{choice}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/components/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/app/_components/{{choice}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/components/stories.tsx.hbs',
      },
    ],
  })
  plop.setGenerator('common component(Container Presenter)', {
    description: '共通のコンポーネントの作成(ContainerとPresenter)',
    prompts: [
      {
        type: 'list',
        name: 'choice',
        message: 'どこに作成しますか？',
        choices: choices,
      },
      {
        type: 'input',
        name: 'name',
        message: '? コンポーネントの名前を入力 (ex: header):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/_components/{{choice}}/{{pascalCase name}}/{{pascalCase name}}Container.tsx',
        templateFile:
          'plop-templates/components/container-presenter/container.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/app/_components/{{choice}}/{{pascalCase name}}/{{pascalCase name}}Presenter.tsx',
        templateFile:
          'plop-templates/components/container-presenter/presenter.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/app/_components/{{choice}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile:
          'plop-templates/components/container-presenter/stories.tsx.hbs',
      },
    ],
  })
}
