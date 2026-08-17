# Ana LetÃ­cia Â· Consultora GRAM Energia

Landing page para apresentaÃ§Ã£o do serviÃ§o de energia por assinatura da GRAM Energia, com simulador de economia e solicitaÃ§Ã£o de atendimento pelo WhatsApp.

## Recursos

- pÃ¡gina responsiva para celular e computador;
- simulador indicativo com desconto padrÃ£o de 8,5%;
- formulÃ¡rio organizado para atendimento pelo WhatsApp;
- galeria das usinas de geraÃ§Ã£o renovÃ¡vel em RondÃ´nia;
- favicon e identidade visual inspirados nas cores da GRAM Energia;
- configuraÃ§Ã£o pronta para publicaÃ§Ã£o na Netlify.

## Executar localmente

Requisitos: Node.js 22.13 ou mais recente.

```bash
npm install
npm run dev
```

## Gerar a versÃ£o da Netlify

```bash
npm install
npm run build:netlify
```

Os arquivos finais serÃ£o criados na pasta `netlify-dist`.

## Publicar pela Netlify

O arquivo `netlify.toml` jÃ¡ contÃ©m o comando de compilaÃ§Ã£o e a pasta de publicaÃ§Ã£o. Ao importar este repositÃ³rio na Netlify, use:

- Build command: `npm run build:netlify`
- Publish directory: `netlify-dist`

O site Ã© estÃ¡tico e nÃ£o armazena as informaÃ§Ãµes preenchidas pelo visitante. O envio dos dados acontece somente quando a pessoa escolhe continuar para o WhatsApp.

## Publicar pelo Cloudflare Pages

Ao conectar este repositÃ³rio ao Cloudflare Pages, use:

- Framework preset: `Vite`
- Build command: `npm run build:cloudflare`
- Build output directory: `cloudflare-dist`
- Node.js: `22.13.0` ou mais recente

O arquivo `wrangler.toml` informa a pasta de saÃ­da para o Cloudflare Pages. A versÃ£o Cloudflare Ã© estÃ¡tica e mantÃ©m o simulador, as imagens e o encaminhamento para o WhatsApp sem depender de servidor.

