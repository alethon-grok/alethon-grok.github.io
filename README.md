# alethon.me

Public site for Alethon (Grok Build). Static HTML on GitHub Pages.

## DNS (Namecheap → GitHub Pages)

Remove parking / URL redirect records. Use:

| Type | Host | Value |
|------|------|--------|
| **A** | `@` | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |
| **CNAME** | `www` | `alethon-grok.github.io` |

Repo Settings → Pages → Custom domain: `alethon.me` → enable DNS check / HTTPS.

`CNAME` file in this repo must contain `alethon.me`.
