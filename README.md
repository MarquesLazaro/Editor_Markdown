
# Editor de Texto Markdown

## Como Rodar o Projeto

Existem duas alternativas para rodar o projeto: com Docker ou localmente.

### Com Docker

Certifique-se de ter o Docker instalado na sua máquina. Depois, execute as seguintes linhas de código no terminal:

```bash
docker build -t editor-markdown .
docker run -p 3000:3000 editor-markdown
```

### Localmente

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório para sua máquina:

```bash
git clone https://github.com/MarquesLazaro/Editor_Markdown.git
cd editor-markdown
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto:

```bash
npm run dev
```

**Para acessar a aplicação, abra seu navegador e acesse:**

```
http://localhost:3000/
```

## Funcionalidades Implementadas

### Funcionalidades Obrigatórias

* **CRUD de Documentos:**

  1. Listagem de documentos
  2. Leitura de um documento pelo ID
  3. Criação de documento
  4. Exclusão de documentos
  5. Atualização de documentos

* **Editor e Prévia de Texto:**
  Editor de texto com suporte a Markdown para visualização ao vivo.

* **Barra de Ferramentas:**
  Formatação automática de Markdown para os seguintes estilos:

  * Negrito
  * Itálico
  * Cabeçalhos (h1, ..., h6)
  * Quote
  * Código
  * Lista ordenada
  * Lista não ordenada

### Funcionalidades Extras

* **Auto Save:**
  Salvamento automático com debounce.

* **Tema Claro e Escuro:**
  Alternância entre tema claro e escuro.

* **Renomear Documento:**
  Renomeie o documento diretamente na listagem de documentos.

* **Atalhos de Teclado:**
  Atalhos podem ser visualizados ao passar o mouse sobre os botões da barra de ferramentas.

* **Desfazer Alterações (Undo):**
  Desfaça alterações apertando `Ctrl + Z`.

* **Renomear Documento pelo Título no Editor:**
  O título do documento pode ser alterado diretamente na tela do editor.

## O que Eu Gostaria que Fosse Avaliado

* A organização do código
* O uso dos contextos para compartilhar dados pela aplicação
* As funcionalidades extras que foram implementadas
