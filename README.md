Conduit RealWorld Example Applications

General functionality:

Authenticate users via JWT (login/signup pages + logout button on settings page) CRU* users (sign up & settings page - no deleting required) CRUD Articles CR*D Comments on articles (no updating required) GET and display paginated lists of articles API Info: List of tags (GET)

/api/tags Login (POST)

/api/user Data Sample: {user: {email: "a@gmail.com", password: "hello123"}} Signup (POST)

/api/users Data Sample: {user: {email: "a@gmail.com", password: "hello123", username: "test123"}} Signup (POST)

/api/users Data Sample: {user: {email: "a@gmail.com", password: "hello123", username: "test123"}} Verify User (GET)

/api/user You need to add authorization: Token .. Public Articles (GET)

/api/articles?limit=10&offset=0 The general page breakdown looks like this:

Home page (URL: /#/ ) List of tags List of articles pulled from Global, or by Tag Pagination for list of articles Sign in/Sign up pages (URL: /login, /register ) Use JWT (store the token in localStorage) Settings page (URL: /settings ) Editor page to create/edit articles (URL: /article/new, /article/article-slug-here ) Article page (URL: /article/article-slug-here ) Delete article button (only shown to article's author) Render markdown from server client side Comments section at bottom of page Profile page (URL: /profile/@username) Show basic user info