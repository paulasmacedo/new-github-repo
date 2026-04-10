# new-github-repo

Aplicação web simples para gerar um roteiro de viagem básico.

## Como a aplicação funciona

1. O usuário informa:
   - `Destino`
   - `Número de dias`
   - `Preferência` (econômico, cultural ou aventura)
2. O JavaScript gera localmente um roteiro com até 3 sugestões de atividades para cada dia.
3. O resultado é exibido na tela em cards diários.
4. O botão **Exportar como texto** permite baixar o roteiro em um arquivo `.txt`.

## Estrutura do projeto

- `index.html` — página principal da aplicação
- `styles.css` — estilos simples e responsivos
- `script.js` — lógica em JavaScript puro e validação local
- `.github/workflows/ci-cd.yml` — pipeline de CI/CD para validação e deploy
- `package.json` — dependências de validação

## Segurança implementada

- `Content-Security-Policy` bloqueia fontes externas de script e estilo.
- Todos os campos de entrada são validados e sanitizados no JavaScript.
- A aplicação não depende de chamadas externas: todos os dados são gerados localmente.
- Não há uso de `innerHTML` para exibir o conteúdo do usuário.

## CI/CD com GitHub Actions

A pipeline em `.github/workflows/ci-cd.yml` faz o seguinte:

1. Executa validação HTML com `htmlhint` em cada push ou pull request para `master`.
2. Se a validação passar, publica o site no branch `gh-pages`.
3. O deploy é automático a cada push bem-sucedido em `master`.

### Executar localmente

```powershell
cd C:\Users\paula\new-github-repo
npm install
npm run validate
```

## Visualizar a página localmente

Execute o servidor PowerShell local:

```powershell
cd C:\Users\paula\new-github-repo
.\serve.ps1 -Port 8000
```

Em seguida, abra em seu navegador:

```text
http://localhost:8000/
```

## Publicar no GitHub Pages

Se quiser publicar manualmente:

1. Confirme que o repositório está no GitHub.
2. Vá em `Settings` > `Pages`.
3. Selecione a branch `gh-pages` e o diretório `/`.
4. Clique em `Save`.
5. Aguarde alguns minutos e abra o link fornecido.

### Alternativa de commit

```powershell
cd C:\Users\paula\new-github-repo
git add .
git commit -m "Add CI/CD and security improvements"
git push origin master
```

A GitHub Action cuidará do deploy automaticamente.
