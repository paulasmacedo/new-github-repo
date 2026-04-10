# new-github-repo

Aplicação web simples para gerar um roteiro de viagem básico.

## Estrutura do projeto

- `index.html` — página principal da aplicação
- `styles.css` — estilos simples e responsivos
- `script.js` — lógica em JavaScript puro

## Como usar

1. Abra `index.html` em um navegador.
2. Informe o destino, número de dias e preferência.
3. Clique em **Gerar roteiro**.
4. Use **Exportar como texto** para baixar seu roteiro.

## Publicar no GitHub Pages

1. Confirme que o repositório está no GitHub e contém `index.html` na raiz.
2. No GitHub, vá para `Settings` > `Pages`.
3. Em `Source`, selecione a branch `master` (ou `main`) e o diretório `/` (root).
4. Clique em `Save`.
5. Aguarde alguns minutos e acesse o link fornecido.

### Alternativa com GitHub CLI

Se preferir, use:

```powershell
cd C:\Users\paula\new-github-repo
git add .
git commit -m "Adiciona gerador de roteiro de viagem"
git push origin master
```

Em seguida, ative o GitHub Pages nas configurações do repositório.
