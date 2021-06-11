# IMPORTANT
Make sure to have your `Redirect URL` in Anilist Client point to `get_token.html` or anything you want as long as the endpoint of token handling is the same. Meaning the name on the client area on Anilist has to be the same as on your server.

Example:
- Anilist Client Redirect URL: `https://website.com/test/handle.html`
- Your `handle.html` should be in `root/test/{HERE}`