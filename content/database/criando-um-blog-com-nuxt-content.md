---
title: Criando um blog com Nuxt Content
description: O modulo content do nuxt é um headless CMS (sistema de gerenciamento de conteúdo sem cabeçalho) baseado em arquivos do Git, que fornece recursos poderosos quando se trata de escrever blogs, sites de documentação ou apenas conteúdo a qualquer site comum.
img: /vue.png
alt: my first blog post
tag: frontend
language: nuxtjs
---

O modulo content do nuxt é um headless CMS (sistema de gerenciamento de conteúdo sem cabeçalho) baseado em arquivos do Git, que fornece recursos poderosos quando se trata de escrever blogs, sites de documentação ou apenas conteúdo a qualquer site comum.

## Instalação
- Primeiro é necessário instalar o modulo usando npm ou yarn:

```
npm install @nuxt/content
// or
yarn add @nuxt/content
```
- Então é necessario adicionar dentro da propriedade "modules" no arquivo nuxt.config:

```
export default {
  modules: [
    '@nuxt/content'
  ]
}
```
> OBS: Se você criou um novo projeto com create nuxt-app, pode optar por adicionar o módulo de conteúdo e, portanto, ele será instalado para você.

## Criar o primeiro artigo em markdown
- O módulo "content" funciona lendo os arquivos que estão no diretório content/, sendo assim crie uma pasta no diretorio raiz com nome "content".

>OBS:  Se você criou seu projeto com create nuxt-app, o conteúdo / diretório já estará criado.

- Dentro do diretório **content/** vamos criar outro diretório chamado **articles/** onde ficara nossos artigos do blog.
- O modulo **content** pode ler arquivos no formato markdown, csv, yaml, json, json5 ou xml. Vamos criar nosso primeiro artigo com um arquivo de markdown (.md) chamado "meu-primeiro-artigo.md" no diretório "content/articles/".
- Agora podemos adicionar um título e um texto para o nosso artigo:

```
# Meu primeiro artigo

Bem-vindo ao meu primeiro artigo no blog usando o módulo content do nuxtjs
```

## Navegando para o artigo
- Para exibir nosso artigo em nossa página, podemos usar uma página dinâmica prefixando a página com um sublinhado (_). Vamos criar um componente de página chamado _slug.vue dentro do diretório "page/blog/", e podemos usar a variável params.slug fornecida pelo vue router para obter o nome de cada artigo.
- Em seguida, podemos usar asyncData no componente da página para buscar o artigo antes que a página seja renderizada. Podemos acessar nosso conteúdo por meio do contexto usando a variável **$content**. Como queremos buscar uma página dinâmica, também precisamos saber qual artigo buscar com params.slug que está disponível para nós no contexto.

```
// pages/blog/_slug.vue

<script>
export default {
  async asyncData ({ $content, params }) {
    // buscar os artigos aqui
  }
}
</script>
```

- Dentro da nossa função asyncData, criamos uma variável chamada article e buscamos nosso conteúdo usando o **await** seguido do **$content**. Precisamos passar para o **$content** o que queremos buscar, que, no nosso caso, é a pasta do artigo seguida pelo nome do arquivo, que obtemos dos nossos parâmetros de URL. Em seguida, encadeamos o método de busca até o final e retornamos o artigo que conterá o resultado de nossa busca.

```
// pages/blog/_slug.vue

<script>
export default {
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    return { article }
  }
}
</script>
``` 

- Para exibir o conteúdo do artigo, estamos usando o componente ``<nuxt-content />`` passando a variável que retornamos ao prop de documento. Neste exemplo, o empacotamos em uma tag de article HTML, pois é melhor semântico HTML, mas você pode usar uma div ou outra tag HTML, se preferir.

```
// pages/blog/_slug.vue

<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```

- Agora podemos executar nosso servidor de desenvolvimento e ir para a rota [http://localhost:3000/blog/meu-primeiro-artigo](http://localhost:3000/blog/meu-primeiro-artigo) e devemos ver nosso conteúdo em nosso arquivo de markdown.

![exemplo](https://nuxtjs.org/blog/creating-blog-with-nuxt-content/get-started-with-nuxt-content.png)

## Variáveis injetadas por padrão

O modulo nuxt content nos dá acesso a variáveis injetadas que podemos acessar e mostrar em nosso template. Vamos dar uma olhada nas variáveis padrão que são injetadas em nosso documento:

- **body**: texto do corpo

- **dir**: diretório
- **extension**: extensão de arquivo (.md é um exemplo)
- **path**: caminho do arquivo
- **slug**:  slug de arquivo
- **toc**: array contendo o índice
- **createdAt**: data de criação do arquivo
- **updatedAt**: data da última atualização do arquivo

Podemos acessar todas essas variáveis usando a variável article que criamos anteriormente. article é um objeto que contém todas essas variáveis injetadas extras às quais temos acesso. Vamos inspecioná-los imprimindo-os usando uma tag ``<pre>``.

```
<pre> {{ article }} </pre>
```

Isso significa que podemos acessar essas variáveis usando nossa variável article seguida pelo que queremos usar. Por exemplo, article.updatedAt nos fornecerá a data da última atualização da postagem.

```
<p>última atualização: {{ article.updatedAt }}</p>
```
Podemos formatar isso criando um método que aceita uma data e retorna uma nova data com as opções de ano, mês e dia formatadas da maneira que queremos.

~~~javascript
methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('pt-br', options)
    }
 }
~~~
 

E então, em nosso template, podemos usar o método **formatDate** que passa na data que obtemos de nosso conteúdo, que retornará uma data formatada no padrão brasileiro.

```
<p>Article last updated: {{ formatDate(article.updatedAt) }}</p>
```

## Variáveis injetadas personalizadas

Também podemos adicionar variáveis injetadas personalizadas adicionando um bloco de assunto do YAML ao nosso arquivo markdown. Ele deve estar no topo do arquivo e deve ser um formato YAML válido definido entre três linhas tracejadas triplas. Isso é útil para adicionar variáveis de SEO, como título, descrição e imagem do seu artigo.
> content/articles/meu-primeiro-artigo.md

```
---
title: Meu Primeiro Artigo
description: Aprenda como usar @nuxt/content para criar um blog
img: first-blog-post.jpg
alt: meu primeiro post
---
```

Agora temos uma variável **title, description, img e alt** que podemos acessar usando nossa variável **article**.
> pages/article/_slug.vue

```
<template>
  <article>
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <img :src="article.img" :alt="article.alt" />
        <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>

    <nuxt-content :document="article" />
  </article>
</template>
```

## Estilizando o conteúdo do markdown

Se inspecionarmos esta página, podemos ver que tudo o que está escrito dentro da nossa marcação é envolto em uma div com uma classe de conteúdo nuxt. Isso significa que podemos adicionar estilos facilmente a todos os nossos elementos provenientes do nosso arquivo de remarcação, agrupando-os na classe **nuxt-content**.
> pages/article/_slug.vue

```
<style>
.nuxt-content h1 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content p {
  margin-top: 12px;
}
</style>
```

Todas as outras tags que são originárias do YAML que podem ser estilizadas normalmente usando TailwindCSS ou adicionando css na tag style.

> OBS: Os estilos com escopo não funcionarão com nuxt-content, portanto, se você adicionar na tag de estilo, não deverá usar o escopo. Você pode adicionar os estilos aqui ou como um estilo global em seu CSS

## Adicionando um ícone nos headings (h1, h2, h3, h4, h5, h6)

Se você inspecionar o conteúdo do artigo markdown, você irá observar que dentro da tag ``<h2>`` existe uma tag ``<a>`` com um href que inclui uma âncora para vincular a si mesma e uma tag span com classes de ícone e link de ícone. Isso é útil para vincular a essa seção da página. Os links nos títulos estão vazios e, portanto, ocultos, então vamos adicionar um estilo a eles. Usando as classes de ícone, podemos adicionar um svg como imagem de fundo para o nosso ícone. Você precisará primeiro adicionar o svg à sua pasta de ativos.
> pages/article/_slug.vue

```
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
```

## Adicionar um sumário

A variável toc gerada nos permite adicionar um sumário à nossa postagem no blog. Vamos adicionar alguns títulos à nossa postagem no blog.

```
## This is a heading
This is some more info

## This is another heading
This is some more info
```
  
Agora podemos ver esses novos headinhs dentro do **toc** um array com um id, um tamanho e o texto. O valor da profundidade refere-se ao valor da tag de cabeçalho; portanto, o valor `<h2>` é 2, o valor `<h3>` é 3, etc.

```
This is some more info

### This is a sub heading
This is some more info

### This is another sub heading
This is some more info

## This is another heading
This is some more info
```

Como temos acesso ao toc id e ao texto, podemos fazer um loop sobre eles e imprimir cada um deles e usar o componente `<NuxtLink>` para vincular ao id da seção à qual queremos vincular.
> pages/article/_slug.vue

```
<nav>
    <ul>
      <li v-for="link of article.toc" :key="link.id">
         <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
      </li>
    </ul>
</nav>
```

Agora os links do sumário estão funcionando e ao clicar em um deles levará à parte correta do página. O módulo **content** adiciona automaticamente um ID e um link a cada cabeçalho. Se inspecionarmos um dos títulos de nosso arquivo de markdown em nossas ferramentas de desenvolvimento, veremos que nossa tag `<h2>` tem um ID. Esse é o mesmo ID encontrado no **toc**, que é basicamente como o **toc** pode ser vinculado ao cabeçalho correto.

Podemos melhorar ainda mais isso usando classes dinâmicas para estilizar as classes de cabeçalho com base no tamanho do cabeçalho que podemos adicionar à nossa tag **nuxt-link**. Se o link tiver tamanho 2, adicione um preenchimento no eixo y e se a profundidade for 3 adicione uma margem esquerda e um fundo de preenchimento. Aqui estamos usando classes TailwindCSS, mas fique à vontade para usar nomes e estilos personalizados de classes.
> pages/article/_slug.vue

```
:class="{
     'py-2': link.depth === 2,
     'ml-2 pb-2': link.depth === 3
}"
```

## Use HTML em seus arquivos markdown

Às vezes, podemos querer adicionar HTML aos nossos arquivos de remarcação. Vamos adicionar um div com algumas classes, para que ele tenha uma cor de fundo azul com texto em branco, alguns preenchimentos e uma margem inferior.
> content/article/meu-primeiro-artigo.md

```
<div class="bg-blue-500 text-white p-4 mb-4">
  This is HTML inside markdown that has a class of note
</div>
```

## Adicionado um componente Vue

Também podemos adicionar componentes do Vue em nossos arquivos markdown. Isso significa que, se estivermos reutilizando componentes, como uma caixa de informações ou alerta, podemos criar um com os estilos de que precisamos e transmitir o texto como um slot.

Agora podemos adicionar componentes ao nosso aplicativo, configurando a propriedade **components** como **true** em nosso arquivo nuxt.config. (desde a v2.13)

```
export default {
    components: true
}
```

A importação automática de componentes não funcionará para `<nuxt-content>`, a menos que os registremos globalmente adicionando uma pasta **global** dentro da pasta de **components** .

Em seguida, podemos criar nosso componente InfoBox dentro desta pasta.
>components/global/InfoBox.vue

```
<template>
  <div class="bg-blue-500 text-white p-4 mb-4">
    <p><slot name="info-box">default</slot></p>
  </div>
</template>
```

No arquivo markdown, esses componentes estarão disponíveis sem a necessidade de importá-los.
>  content/article/meu-primeiro-artigo.md

```
<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>
```

Os componentes globais estarão disponíveis em todo o aplicativo, portanto, tenha cuidado ao adicionar componentes a esta pasta. Isso funciona diferente da adição de componentes na pasta de componentes, que são adicionados apenas se estiverem sendo usados.


