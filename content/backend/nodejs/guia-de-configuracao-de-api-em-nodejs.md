---
title: Guia de configuração de API em NodeJS
description: Aqui temos um passa-a-passo rápido de como configurar uma aplicação Nodejs para se tornar uma api restfull para ser uma ponte de comunicação entre o banco de dados e aplicação.
img: /node.png
alt: nodejs api
tag: backend
language: nodejs
---

Aqui temos um passa-a-passo rápido de como configurar uma aplicação Nodejs para se tornar uma api restfull para ser uma ponte de comunicação entre o banco de dados e aplicação.

1. Criar o diretório onde ficará a API RESTFUL.

2. Para iniciar a aplicação do nodejs, digitamos o comando **npm init -y** dentro do diretório que foi criado. obs: o paramentro **-y** é usando para ignorar as perguntas de configurações iniciais que o nodejs irá fazer.

3. Com isso irá criar no diretório um arquivo chamado **package.json** que é um arquivo de configuração.

4. Criar um arquivo chamado **server.js** que será o aquivo principal executado pelo nodejs.

5. Para criamos um servidor HTTP é necessário instalar alguns pacotes com **npm** (Gerenciador de pacotes do Node - Node Package Manager):
- 	http - **npm install http** -  que é um modulo http do nodejs.
- 	express - **npm install express** - que é um framework para aplicativo da web do nodejs.

6. Além disso é bom instalar o pacote de debug do nodejs -**npm install debug**.

7. Tudo iss pode ser executado com de uma vez só com o comando **npm install http express debug --save**. Obs: o parametro **--save** salva o(s) pacote(s) no arquivo **package.json**, que serve de referência para o seu projeto. Logo quando você utiliza o comando npm install todos os módulos que foram instalado com o --save serão instalados sem a necessidade de defini-los um a um.

8. Será gerada uma pasta chamada **node_modules** com vários módulos do node, é uma boa pratica nunca enviar essa pasta para o servidor, sempre deixa-la no **.gitignore**.

9. Alterar a tag **scripts** do arquivo **package.json** para o comando de execução do nodejs - **start: "node ./server.js"** . Assim ao executar no terminar só será necessário o comando **npm start**.

10. Instalar o pacote **npm install nodemon --save-dev** ele monitora seu servidor para que quando ocorra qualquer alteração no código automaticamente seu servidor seja resetado. Obs: **-dev** vai salvar esse pacote apenas para desenvolvimento não será enviado para produção. É executado pelo comando **nodemon ./server.js**.

11. Instalar o pacote **npm install body-parser --save** que é um modulo que é capaz de converter o body de uma requisição para vários formatos, e um deles que vamos utilizar é o **json**.

12. (Se utilizar banco de dados **MondoDB**) instalar o pacote **npm install mongodb --save** que é o pacote com as dependências para usar o **MongoDB** em sua aplicação.

13. (Se utilizar banco de dados **MondoDB**) instalar o pacote **npm install mongoose --save** que é uma biblioteca do nodejs que traduz os dados do banco de dados para objetos javascript  para ser usados na aplicação.

14. Para fazer autenticação de dados usamos o **JWT (JSON Web Token)** que é um sistema de transferência de dados que pode ser enviado via POST ou em um cabeçalho HTTP (hearder) de maneira "segura", essa informação é assinada digitalmente por um algoritmo HMAC, ou um par de chaves pública/privada usando RSA. Para instalar o pacote usamos o comando **npm install jsonwebtoken --save**.

15. Instalar o pacote **npm install md5 --save** para criptografia de senhas.

16. Se necessário fazer upload de arquivos na API instalar o pacote **npm install multer --save**

17. Se necessário envios de emails na API instalar o pacote **npm install sendgrid@2.0.0 --save**

18. Se necessário fazer validações padrões na API instalar o pacote **npm install validator --save**

