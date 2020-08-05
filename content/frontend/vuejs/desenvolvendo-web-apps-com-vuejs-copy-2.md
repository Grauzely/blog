---
title: Desenvolvendo web apps com VueJS
description: VueJS é um framework progressivo, que significa que ele foi projetado desde sua concepção para ser adotável incrementalmente. A forma mais simples de implementar o VueJS é usando uma tag script para importar o framework.
img: /vue.png
alt: my first blog post
tag: frontend
language: vuejs
---

- VueJS é um framework progressivo, que significa que ele foi projetado desde sua concepção para ser adotável incrementalmente.

- A forma mais simples de implementar o VueJS é usando uma tag script para importar o framework.

```
	<!-- versão de desenvolvimento, inclui avisos úteis no console  -->
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	
	<!-- versão de produção, otimizada para tamanho e velocidade -->
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```


- Toda aplicação Vue é iniciada com a criação de uma instância Vue com a função 'Vue':

```
 	var vm = new Vue ({
 		//opções
 	})
```

- Ciclo de vida da instância
Ao criar uma new Vue( ) passaremos por vários gatilhos que podem ser acionado dentro do ciclo da instância:
1. **beforeCreate** - É executado na própria inicialização do seu componente. Os dados não foram reativados e os eventos ainda não foram configurados.
2. **created** - Pode acessar os dados reativos e os eventos ativos. Os templates e o Virtual DOM não foram montados ou renderizados. 
3. **beforeMount** - É executada antes da renderização inicial acontecer e após a compilação das funções do template ou renderização. (menos usado)
4. **mounted** - Tem acesso total ao componente reativo, aos templates e ao DOM renderizado (via $el). Usado para buscar dados no componente (melhor usar created para isso), modificar o DOM e integrar bibliotecas que não são do Vue.
5. **beforeUpdate** - É executado após a execução dos dados no componente e o ciclo de atualização é iniciado, imediatamente antes do DOM ser corrigido e renderizado novamente.
6. **updated** - É executado após a alteração dos dados no seu componente e o DOM ter sido renderizado novamente. Se precisar acessar o DOM após alterar uma propriedade, é o local mais seguro.
7. **beforeDestroy** - Executado antes da desmontagem. Seu componente ainda estará totalmente presente e funcional. Se precisar limpar eventos ou assinaturas reativas, antes do Destroy aqui é o melhor lugar.
8.**destroyed** - Não existe mais nada anexado ao componente tudo foi destruido. Você pode usar ele gatilho para fazer qualquer limpeza de última hora ou informa um servidor que o componente foi destruído como um delator furtivo.

## Sintaxe de Templates

- VueJS utiliza uma sintaxe de *templantes* baseada em HTML, permitindo que você vincule declarativamente o DOM renderizado aos dados da instancia Vue.

- **Texto** - 0 data binding (Ligação de dados) mais simples, é com a sintaxe de Mustache (chaves duplas) usado dentro de textos:

```
 <h1>Mensagem: {{ msg }} </h1>
```

-  **Atributos** - chaves duplas não podem ser usadas em atrivutos HTML, para isso utiliza-se a diretiva v-bind:

```
<div v-bind:id="dynamicId"></div> 
```
 
-  **Expressões Javascript** - É possivel colocar expressões javascript de linha única dentro de qualquer tipo de data binding:

```
 {{ number + 1 }} 
 {{ ok ? 'SIM' : 'NÃO' }} 
 {{ message.split('').reverse().join('') }} 
 <div v-bind:id="'list-' + id"></div>
```

## Diretivas

- São atributos com prefixo **v-**. O trabalho de uma diretiva é aplicar reativamente efeitos colaterais ao DOM, ou seja realizar algum efeito quando o valor da expressão é modificado.
1. Parametros - Algumas diretivas podem aceitar "parâmetros", denotado pelo símbolo de dois pontos após a diretiva:

```
<a v-bind:href="url"> ... </a> 
<a v-on:click="doSomething"> ... </a> 
```

2. Argumentos dinâmicos - A partido da versão 2.6.-, também é possível usar uma expressão JavaScript no argumento de uma diretiva envolvendo-a com colchetes:

```  
 <a v-bind:[attributeName]="url"> ... </a>  
 <a v-on:[eventName]="doSomething"> ... </a> 
```

3. Modificadores - São sufixos denotados por um ponto, que indicam que aquela diretiva deve ser vinculada de alguma maneira especial. Por exemplo, o modificador .precent indica que o v-on chamará a função event.prenventDefault() quando o evento for disparado:

```
  <form v-on:submit.prevent="onSubmit"> ... </form> 
```

4. Abreviações - Para v-bind e v-on é possivel usar abreviações como ":" para v-bind e "@" para v-on:

```
 <a :href="url"> ... </a> 
<a @click="doSomething"> ... </a> 
```

## Lista de diretivas

1. **v-text** = atualiza o texto contido no elemento, mas pode ser usar o mustache {{  }} no lugar.  

```
<span v-text="msg"></span> é igual <span>{{msg}}</span>.
```

2. **v-html** = atualiza o innerHTML do elemento.

3. **v-show** = Alterna a propriedade CSS *display* do elemento baseado na condição de verdade do valor da expressão é disparada quando sua condição muda.

4. **v-if** = Renderiza condicionalmente o elemento baseado na condição de verdade do valor da expressão.

5. **v-else-if** = Denota o “bloco senão se” para v-if. Pode ser encadeado.

5. **v-else** = Denota o "bloco senão" de uma cadeia v-if ou v-if/v-else-if.

6. **v-for** = Renderiza o elemento ou bloco de template múltiplas vezes baseados nos dados de origem (data). O valor deve usar a sintaxe especial *alias in expression* . Por exemplo:

```
<div v-for="item in items">
  {{ item.text }}
</div> 
```

Alternativamente é possível também especificar um anias para o índice (ou a chave, se usada em um objeto). Por exemplo:
```
<div v-for="(item, index) in items"></div>
<div v-for="(val, key) in object"></div>
<div v-for="(val, name, index) in object"></div>
```

Para força o v-for reordernar elementos, pode pode atribuir um valor ao atributo *key*:

```
 <div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

7. **v-on** ou **@** =  O atribui uma escuta de evento ao elemento.
- Modificadores:
+ **.stop** - chama event.stopPropagation().
+ **.prevent** - chama event.preventDefault().
+ **.capture** - adiciona escuta de eventos em modo de captura.
+ **.self** - aciona o manipulador somente se o evento foi disparado a partir deste elemento.
+** .{keyCode | keyAlias}** - aciona o manipulador apenas em certas chaves.
+ **.native** - escuta por um evento nativo no elemento-raiz do componente.
+ **.once** - aciona o manipulador somente uma vez.
+ **.left** - (2.2.0+) aciona o manipulador somente para eventos do botão esquerdo do mouse.
+ **.right** - (2.2.0+) aciona o manipulador somente para eventos do botão direito do mouse.
+ **.middle** - (2.2.0+) aciona o manipulador somente para eventos do botão do meio do mouse.
+ **.passive** - (2.3.0+) atribui um evento ao DOM com { passive: true }.

8. **v-bind** ou **:** = Dinamicamente faz a interligação de um ou mais atributos ou propriedades de um componente a uma expressão.

9. **v-model** = cria uma interligação de mão dupla (*two-way binding*) em um elemento de entrada (input) de formulário ou componente.

10. **v-slot** ou **#** = Denotar slots ou slots nomeados que esperam receber propriedades. 

```
<!-- Slots nomeados -->
<base-layout>
  <template v-slot:header>
    Header content
  </template>

  Default _slot_ content

  <template v-slot:footer>
    Footer content
  </template>
</base-layout>
```

10. **v-pre** = Pula a compilação para esse elemento e todos os filhos.

```
<span v-pre>{{ isso não será compilado }}</span>
```

11. **v-cloak** - Essa diretiva permanecerá no elemento até que a instância associada de Vue termine de compilar. Ao ser combinada com regras CSS como [v-cloak] { display: none }, essa diretiva pode ser usada para esconder mustache não-compiladas até que a instância de Vue esteja pronta.

12. **v-once** = Renderiza o elemento e componente *somente uma vez*. Em re-renderizações subsequentes, o elemento/componente e todos seus filhos serão tratados como conteúdo estático e pulados.

## Atributos Especiais

1. **key** = É usado principalmente como um aviso para o algoritmo do virtual DOM do Vue identificar VNodes quando comparar a nova lista de nós com a anterior.
2. **ref** = É usada para registar a referência para um elemento ou um componente filho. A referencia sera registrada no objeto *$refs* do componente pai.
3. **is** = Usado para Componentes Dinâmicos e para trabalhar limitações dos templates do DOM.

## Opções / Dados

1. **data** - É um objeto do Vue que vai conter os dados da aplicação que serão reativos. Quando definido em um componente deve ser declarado como uma função que retorna o objeto de dados inicial, pois haverá muitas instancias criadas usando a mesma definição.
2. **props** - Uma lista/hash de atributos que são expostos para aceitar dados do componente pai. Possui tanto uma sintaxe baseada em Array como, alternativamente, uma sintaxe baseada em Object, que permite configurações avançadas como checagem de tipos, validações personalizadas e valores padrão.
3. **propsData** - Passa props a uma instância durante a sua criação. A intenção disso é primariamente tornar testes unitários mais fáceis.
4. **computed** - são variáveis cujo o valor depende de outras variáveis, funcionam como funções que você pode tratar como fossem propriedades. Toda vez que alguma dependência mudar dentro da propriedade computada, o seu valor será recalculado.

## SEO

- Pensando em SEO temos duas alternativas para ser implementadas:

1º - Prerender - Existe um plugin chamado *prerender-spa-plungin* que pode ser adicionado ao webpack e realiza uma pré-renderização da página SPA do Vue para que os bots (crawler's) de indexação dos motores de busca tenha um conteúdo prono para indexar. Ele é viável para aplicações com conteúdo não muito dinâmico.
- /contato
- /faq
- sobre-nós

2º NuxtJS - É um framework SSR (server-side rendering) que envolve o ecossistema do Vue.js. É mais indicado em casos que se deva da um suporte de conteúdo gerado dinamicamente.
-/produtos/:id