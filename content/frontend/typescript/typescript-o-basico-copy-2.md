---
title: Typescript - O básico do superset javascript
description: TypeScript é uma linguagem criada pela Microsoft e nada mais é que um superset do ECMAScript 6 que, por sua vez, é um superset do ECMAScript 5, que usamos mais frequentemente como base para nosso clássico JavaScript.
img: /vue.png
alt: my first blog post
tag: frontend
language: typescript
---

# Typescript - O básico

## Conceitos básicos

- TypeScript é uma linguagem criada pela Microsoft e nada mais é que um superset do ECMAScript 6 que, por sua vez, é um superset do ECMAScript 5, que usamos mais frequentemente como base para nosso clássico JavaScript.
- O código TypeScript é compilado e convertido para ES5 (pode ser alterado). Por isso, pode ser utilizado normalmente em qualquer projeto JavaScript.
- O TypeScript dispõe de recursos que complementam o JavaScript.

### Adicionar tipagem ao javascript

- **Any**: É o equivalente a uma variável escrita em JavaScript. O tipo any pode receber qualquer valor que você quiser.

```
let a: any = 'anything'
```

- **Boolean**: Verdadeiro e falso comum em todas linguagens.

```
let a: boolean = true
```

- **Number**: O TypeScript não dispõe de números inteiros, sem sinal ou algo do tipo. Todos os números são definidos como números reais e podem ser representados, inclusive, por binários, hexadecimais etc. Número é número.

```
let a: number = 10
a = 10.2
a = 0x01
```

- **String**: Strings têm uma variação muito interessante, que são os Template Strings. Você pode quebrar linhas e inserir variáveis muito mais facilmente que no JavaScript. Para isso, basta abrir a string com o caractere acento grave (`).

```
let a: string = 'I am a string'

let message: string = 'Hello, World.'
let a: string = `
  <div>
    <p>${message}</p>
  </div>
`
```

- **Array**: Há duas formas de se utilizar uma array. Ex: `any[] e Array<any>`. Ambas representam a mesma coisa. A primeira seria uma syntax sugar da segunda, que utiliza um recurso chamado Generics, muito comum em outras linguagens.

```
let a: any[]
let b: Array<any>
```

- **Tuple**: É bem semelhante a um array, porém com tamanhos e valores de tipos bem definidos.

```
  let a: [string, any] = ['key', 'value']
``` 

- **Enum**: é um tipo no qual declaramos um conjunto de valores constantes pré-definidos.

```
enum CardSuits { Clubs, Hearts, Spades, Diamonds } 
```
 
 - **Objects**: Temos dois tipos de objetos como podem ser visto abaixo. O objeto "a" funcionar como uma estrutura, que deve seguir exatamente este shape. O objeto "b" funciona como um dicionario de dados, que é mais flexivel do que uma estrutura e pode receber qualquer conjutno de chave/valor.
 
>>Obs: Perceba o caractere interrogação (?) no objeto "a". É o operador elvis, serve para indicar que uma chave é opcional. Também funciona com parâmetros de funções.

```
let a: { name: string, age: number, active?: boolean } = {
  name: 'Matheus Mariano',
  age: 19,
}
let b: { [key: string]: any } = {
  foo: '...',
  bar: true,
  ...
}
```
- **Interfaces**: Às vezes pode se tornar inviável escrever a estrutura de um objeto diretamente numa variável, até porque precisamos repeti-la várias vezes. Para isso, é possível utilizar **interfaces**.

```
interface User {
  name: string
  age: number
  active?: boolean
}

let a: User = { ... }
```

>Essas interfaces logicamente funcionam também com classes. Se quiser utilizar a interface em arquivos diferentes, você deve utilizar o export.


```
export interface Product {
  name: string
  price: number
  save: (options?: any) => void
}
```

E então

```
import { Product } from './product'

export class Shoe implements Product {
  name: string
  price: number
  save(options?: any): void {
    ...
  }
}
```

- **Type inference**: Por padrão, o compilador do TypeScript vai utilizar o type inference, que define o tipo da variável como o do valor recebido por ela. No caso abaixo, string. Pode ser configurado para assumir o tipo any.

```
var a = 'foo'
```

- **Functions**: Podemos definir os tipos dos parâmetros e quais valores uma função deve retornar.

```
function sum(a: number, b: number): number {
  return a+b
}
```
Quando queremos que uma função não retorne nada, temos o tipo especial void.

```
function foo(product: Product, options?: any): void {
  product.save(options)
}
```

> Observe novamente o operador elvis. Desta vez, afirmando que o parâmetro options é opcional. Só podemos utilizá-lo se o parâmetro não conter um valor padrão.

### Algumas questões:

- “O TypeScript converte o código para JavaScript, que não tem tipos. Então esses tipos serão ignorados no código final. Para quê servem os tipos então?”

>Há várias razões para se ter tipos. A primeira delas é o debug. O número de falhas no código reduz drasticamente, diminuindo o número de testes e debugs.

>A segunda é que você pode consultar as APIs e documentações enquanto escreve. Isto é fantástico.