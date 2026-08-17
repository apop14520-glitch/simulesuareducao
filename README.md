# Ana Letícia · Consultora GRAM Energia

Landing page para apresentação do serviço de energia por assinatura da GRAM Energia, com simulador de economia e solicitação de atendimento pelo WhatsApp.

## Recursos

- página responsiva para celular e computador;
- simulador indicativo com desconto padrão de 8,5%;
- formulário organizado para atendimento pelo WhatsApp;
- galeria das usinas de geração renovável em Rondônia;
- favicon e identidade visual inspirados nas cores da GRAM Energia;
- configuração pronta para publicação na Netlify.

## Executar localmente

Requisitos: Node.js 22.13 ou mais recente.

```bash
npm install
npm run dev
```

## Gerar a versão da Netlify

```bash
npm install
npm run build:netlify
```

Os arquivos finais serão criados na pasta `netlify-dist`.

## Publicar pela Netlify

O arquivo `netlify.toml` já contém o comando de compilação e a pasta de publicação. Ao importar este repositório na Netlify, use:

- Build command: `npm run build:netlify`
- Publish directory: `netlify-dist`

O site é estático e não armazena as informações preenchidas pelo visitante. O envio dos dados acontece somente quando a pessoa escolhe continuar para o WhatsApp.
