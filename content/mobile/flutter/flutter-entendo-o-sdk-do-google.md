---
title: Flutter - Entendo o SDK do Google
description: Framework do Google para construir aplicativos nativos para Android, iOS, Web e Desktop, utilizando o mesmo código-base, promentendo um desenvolvimento rápido, Interfaces super bonitas e Performance nativa.
img: /flutter.svg
alt: flutter
tag: mobile
language: flutter
---

## Visão geral

- É o framework do Google para construir aplicativos nativos para Android, iOS, Web e Desktop, utilizando o mesmo código-base.
- Para criar um projeto basta usar o comando "flutter create (opcional: --org br.com.grauztecnologia) nome_projeto" 
- Flutter é baseado em 3 pilares: Desenvolvimento rápido, Interfaces super bonitas e Performance nativa.
- No Flutter, tudo é um widget.
-  **Widget**: É um componente do seu aplicativo, seja um botão, um ícone, um texto, uma imagem, etc. Ao final, vários widgets irão compor o nosso aplicativo.
- **Widget tree**: É a estrutura que representa como nossos widgets estão organizados. Conforme os widget vão sendo criados/destruídos, a árvore de widgets também vai sofrendo alterações. Assim como em uma página web temos o DOM, no Flutter, temos a widget tree.
- **pub.dev**: Gerenciador de pacotes da linguagem Dart.
- **Packag**e: Um módulo/pacote, puramente com código Dart.
- **Plugin**: Contém código específico da plataforma (java/kotlin, swift/obj-c), geralmente faz acesso à algum recurso nativo, como bateria, câmera.
- **Material package**: Conjuntos de widgets que seguem as definições do Material Design.
- **Cupertino packag**e: Conjunto de widgets que seguem as definições de interface do iOS.

## Declarative UI

- Nossa interface, reflete o estado da nossa aplicação. Sempre que o estado da aplicação muda, os widgets são reconstruídos para atender aquele novo estado. Seja um botão ou ícone que muda de cor após ser pressionado ou até mesmo toda uma tela após o usuário logar no aplicativo.

## Composição > Herança

- Entender a diferença entre composição sobre herança, no contexto de um aplicativo em Flutter, facilitará o entendimento de como os widgets se relacionam.
- **Composição**: Widget X possui o widget Y.
- **Herança**: Widget X é um widget Y (já que X é filho de Y).
- Lembrando que widgets são pequenos "blocos", fica simples de entender o motivo de Flutter utilizar esse conceito. Conforme formos montando vários blocos, nosso aplicativo vai tomando forma. Esta montagem dos blocos é a composição.

## Arquitetura

- **Código**: Inicia pelo nosso código em Dart do aplicativo, códigos específicos de cada plataforma (caso haja), os packages e plugins (que também são códigos Dart e/ou específicos), imagens, fontes e qualquer outro ativo do projeto.
- **Flutter (Framework)**: O framework em si, também escrito em Dart.
- **Flutter (Engine)**: O motor responsável por unir o seu código e o do framework e prepará-los para que sejam executados pelo hardware. Utiliza a biblioteca Skia e o mesmo processador de textos do Google Chrome.
- **Runners**: Responsável por delegar e controlar as instruções binárias ao hardware.
- **Hardware**: Onde é executado as instruções binárias.
> Durante o desenvolvimento, o seu código Dart é interpretado (JIT), possibilitando assim o hot reload e hot restart.
>Ao gerar a versão final de um aplicativo, o código Dart é compilado (AOT) para bibliotecas arm/x86 e executado diretamente pelo hardware e isto é o que garante a alta performance.

## Estrutura de pastas e arquivos de um projeto

Ao iniciarmos um projeto com o Flutter, a seguinte estrutura é criada:

- **android**: Contém arquivos específicos da plataforma Android.
- **ios**: Contém arquivos específicos da plataforma iOS.
- **lib**: Contém o código Dart do aplicativo. É possível criar pastas e subpastas aqui dentro, porém o arquivo main.dart deve estar na raiz.
- **main.dart**:  O ponto de partida de qualquer aplicativo em Flutter. Dentro dele, deve conter a chamada ao método main().
- **teste**: Pasta que contém os arquivos de testes do aplicativo.
- **pubspec.yaml**: Este arquivo contém várias informações do aplicativo, como nome, versão, descrição, pacotes/dependências. Também contém o caminho para arquivos estáticos, como imagens e fontes.

> Obs: Neste tipo de arquivo, YAML, a indentação é extremamente importante. Utiliza-se 2 espaços em branco.

- **pubspec.lock**: Contém metadados dos pacotes/dependências do aplicativo.

## Widgets

- Em Flutter, (quase) tudo é um Widget. 
- Todo aplicativo Flutter é um widget. Composto de outra centenas de widgets.
- Existem apenas 2 tipos de widgets: Stateless e Stateful.
- Podemos classificar os widgets em 2 grupos principais: Layout e UI (user interface).
- Widgets de layout, são aqueles que se preocupam apenas em posicionar outros widgets. Alguns dos principais: Column, Row, Scaffold, Stack,...
- Widgets de interface, são aqueles que efetivamente estão visíveis ao usuário, como: Text, RaisedButton, Switch, ...
- Precisamos dar destaque para 2 conjuntos de widgets amplamente utilizados, o primeiro e mais popular é o Material package, que segue as definições de layout do Material Design e o Cupertino package, seguindo as definições de design do iOS.

##  Stateless x Stateful

Como já foi dito anteriormente no Flutter temos apenas 2 tipos de widgets:

**Stateless**:  Um widget que não tem seu estado alterado.

- Um texto, é um widget que não tem seu estado alterado.

**Stateful**: Um widget que tem seu estado alterado.

- Um switch, é um widget que tem seu estado alterado.

Por definição, na própria documentação da API, temos:
> Um widget é uma descrição imutável de parte de uma interface de usuário

Mas nós temos dois tipos, mutável e não mutável, então como pode ser possível essa afirmação?
A documentação complementa com a seguinte afirmação:
> Widgets por si só, não possuem estado mutável (todos os campos devem ser final). Se precisar associar um estado mutável a um widget, considere utilizar o StatefulWidget, que cria um objeto do tipo State...

Logo, podemos assumir que com o objeto State, o widget do tipo StatefulWidget torna-se mutável. 

## Ciclo de vida dos widgets

### Stateless

- Por ser mais simples e não possui estado, não dá trabalho nenhum ao framework. Apenas é construído e pronto, permanece imutável. 
- Quandro criamos um Stateless widget, o Flutter executa o seu construtor e sem seguida o método build().

```
class MeuWidgetImutavel extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Text('Eu não terei meu estado alterado');
  }
}
```

### Stateful

- inicialmente, parece ser tão simples quando o Stateless widget, quando criamos nosso widget, o Flutter chama o seu construtor e em seguida o método createState(). 

```
class MeuWidgetImutavel extends StatefulWidget {

  @override
  _MeuWidgetImutavelState createState() => _MeuWidgetImutavelState();
}

class _MeuWidgetImutavelState extends State<MeuWidgetImutavel> {
  @override
  Widget build(BuildContext context) {
    return Text('Eu não terei meu estado alterado');
  }
}
```
- O uso do "_" torna o widget privado para o escopo da biblioteca em que ele se encontra;
- O uso de "=>" indica que este método executa apenas 1 função.

Mas não se engane, pois a diferença não é apenas no nome dos métodos. Lembre-se que ao criar um objeto do tipo State, um Stateful widget ganha poderes mutáveis?! Então, é dentro dele que a mágica acontece. 

Nosso MeuWidgetImutavel ao ser construído pelo framework, executa o método createState()  e este por sua vez, executa apenas 1 função, que é instanciar  _MeuWidgetImutavelState. Ele é um filho de **State**, logo, herda algumas características e comportamentos.

Vamos analisar com calma o ciclo de vida de um objeto **State**.

- initState: Chamado apenas 1 única vez, na criação no widget. Quando o widget é inserido na widget tree.
- build: Chamado em diferentes situações. Sempre que o widget precisar ser reconstruído ou após o initState() ou após a função setState() e até mesmo quando o widget for removido da widget tree para ser inserido em outro ponto (isto ficará mais claro quando construirmos nosso primeiro app).
- dispose: Chamado quando o widget for removido da widget tree permanentemente. 
- setState: Responsável por notificar nosso widget que o estado interno foi alterado. Por exemplo, ao concluir uma requisição HTTP, queremos exibir estas informações na tela. Para isso, preenchemos nossa tela com as informações recebidas e invocamos a função setState(). 
- didUpdateConfig: Sempre que o seu widget sofrer alterações, este método é chamado e executado antes do build(). Ou seja, sempre que chamar chamar o setState(), este método é executado. Pode ser útil ao lidar com animações e/ou quando precisar ter acesso ao estado antigo do widget

## Navegação

A navegação no Flutter utiliza o conceito de "pilha" (stack). Ou seja, se estamos na Tela A e vamos para a Tela B, internamente, estamos colocando a Tela B acima da Tela A. Assim, a Tela B está no "topo" da pilha. Se desejarmos voltar à Tela A, basta remover a Tela B do topo da pilha.

Para manipular a "pilha" de telas no Flutter, utilizamos o widget Navigator. Com o princípio de  "o último que entra é o primeiro que sai", temos as operações de push e pop, para adicionarmos e removermos telas da nossa "pilha" de navegação.
> - **Push**: Estamos "empurrando" uma nova tela ao topo da pilha.
> - **Pop**: A tela que está no topo da pilha, é removida.