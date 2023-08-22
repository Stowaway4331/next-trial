# About

This is a sample login/signup page along with a dashboard page built with [Next.js](https://nextjs.org/) and [NextAuth.js](https://next-auth.js.org/) that demonstrates how a website can be protected by OAuth.

# Tech Stack

![Tech Stack](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&align=center&titleAlign=center&showBorder=false&lineCount=2&hideTitle=true&bg=%230D1117&badge=%23161B22&border=%2321262D&titleColor=%2358A6FF&line1=nextdotjs%2Cnext%2Cffffff%3Breact%2Creact%2C58a6ff%3Btypescript%2Ctypescript%2C3178C6%3B&line2=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zLjcxODc1IDMuOTI5NzJDNS42Mjc4OSAzLjM2NzMzIDguNDU1NjggMi41MjQxMSA5LjY0ODI4IDIuMTY4MTJDMTAuMDE3MyAyLjA1Nzk3IDEwLjQwNzUgMi4wNTcxMSAxMC43NzcxIDIuMTY1MzNDMTEuOTI2IDIuNTAxNzMgMTQuNTk4NCAzLjI4NzgzIDE2LjY2NDggMy45MjM0OUMxNy4wODI4IDQuMDUyMDkgMTcuMzY3OSA0LjQ0NTkzIDE3LjM1NzUgNC44ODMxOUMxNy4xMTg4IDE0Ljk4NjcgMTIuMDE5NiAxNy40MTA1IDEwLjU4NDIgMTcuODkzNkMxMC4zMzg4IDE3Ljk3NjIgMTAuMDgzNyAxNy45NzY0IDkuODM4MDIgMTcuODk0NUM4LjM5NTY3IDE3LjQxMzcgMy4yNTQyMSAxNC45OTUxIDMuMDA5MDcgNC44OTcxNEMyLjk5ODMgNC40NTMxNyAzLjI5Mjc2IDQuMDU1MjEgMy43MTg3NSAzLjkyOTcyWiIgZmlsbD0iI0Q5RDlEOSIvPg0KPG1hc2sgaWQ9Im1hc2swXzE1Nl8yNTIiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjMiIHk9IjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNiI%2BDQo8cGF0aCBkPSJNMy43MTg3NSAzLjkyOTcyQzUuNjI3ODkgMy4zNjczMyA4LjQ1NTY4IDIuNTI0MTEgOS42NDgyOCAyLjE2ODEyQzEwLjAxNzMgMi4wNTc5NyAxMC40MDc1IDIuMDU3MTEgMTAuNzc3MSAyLjE2NTMzQzExLjkyNiAyLjUwMTczIDE0LjU5ODQgMy4yODc4MyAxNi42NjQ4IDMuOTIzNDlDMTcuMDgyOCA0LjA1MjA5IDE3LjM2NzkgNC40NDU5MyAxNy4zNTc1IDQuODgzMTlDMTcuMTE4OCAxNC45ODY3IDEyLjAxOTYgMTcuNDEwNSAxMC41ODQyIDE3Ljg5MzZDMTAuMzM4OCAxNy45NzYyIDEwLjA4MzcgMTcuOTc2NCA5LjgzODAyIDE3Ljg5NDVDOC4zOTU2NyAxNy40MTM3IDMuMjU0MjEgMTQuOTk1MSAzLjAwOTA3IDQuODk3MTRDMi45OTgzIDQuNDUzMTcgMy4yOTI3NiA0LjA1NTIxIDMuNzE4NzUgMy45Mjk3MloiIGZpbGw9IiNEOUQ5RDkiLz4NCjwvbWFzaz4NCjxnIG1hc2s9InVybCgjbWFzazBfMTU2XzI1MikiPg0KPHBhdGggZD0iTTEwLjIxMTIgOS43NzQ2NUwxMC4wOTg2IDEuNzE4MzFMMTcuODE2OSAzLjgwMjgyTDEwLjIxMTIgOS43NzQ2NVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xNTZfMjUyKSIvPg0KPHBhdGggZD0iTTEwLjIxMTMgOS43NzQ2NVYyTDIuODMwOTggMy45NzE4M0wxLjgxNjg5IDguNzYwNTZMNS4wMjgxNiAxMy43NzQ2TDEwLjIxMTMgOS43NzQ2NVoiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8xNTZfMjUyKSIvPg0KPHBhdGggZD0iTTE3LjU5MTUgMy45NzE4M0w0LjkxNTQ3IDEzLjc3NDZWMTguMjI1NEgxNy40MjI1TDE3LjU5MTUgMy45NzE4M1oiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8xNTZfMjUyKSIvPg0KPC9nPg0KPGRlZnM%2BDQo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTU2XzI1MiIgeDE9IjEwLjIxMTIiIHkxPSIyIiB4Mj0iMTUuNjE5NyIgeTI9IjUuNTQ5MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPg0KPHN0b3Agc3RvcC1jb2xvcj0iIzE5QUFFOCIvPg0KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMUVBNUYxIi8%2BDQo8L2xpbmVhckdyYWRpZW50Pg0KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzE1Nl8yNTIiIHgxPSIzLjA1NjMzIiB5MT0iNC4xNDA4NSIgeDI9IjEwLjIxMTMiIHkyPSI5LjY2MTk3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI%2BDQo8c3RvcCBzdG9wLWNvbG9yPSIjMkJFMkI4Ii8%2BDQo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxOUI5RTMiLz4NCjwvbGluZWFyR3JhZGllbnQ%2BDQo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfMTU2XzI1MiIgeDE9IjE3LjMwOTgiIHkxPSI0LjAyODE3IiB4Mj0iNy45NTc3MiIgeTI9IjE2Ljk4NTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4NCjxzdG9wIHN0b3AtY29sb3I9IiM5MjVDREYiLz4NCjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0NDNDJFNSIvPg0KPC9saW5lYXJHcmFkaWVudD4NCjwvZGVmcz4NCjwvc3ZnPg0K%2Cnextauth%2C%3Btailwindcss%2Ctailwind%2C06B6D4%3Bmongodb%2Cmongodb%2C47A248%3B)

Live demo [here](https://jeremie-nextauth.vercel.app/).
