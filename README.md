![2036 Homepage screenshot](https://i.imgur.com/Nq9CHb1.jpeg)

# Emory University 2036 Campaign Website

Aspirational and visionary, the 2036 Campaign invests in people for the
benefit of people. Not only about how Emory moves forward but also how
investments in Emory will lead to a better world, 2O36 presents an inspiring
vision of what we will accomplish together.

The website engages Emory donors and constituents with stories, the “why”, the
potential impact of the campaign; communicating the goals of each of Emory’s
schools & units in order to raise awareness, increase engagement, and ultimately,
garner financial support for the University.


# Milestones

* Phase 1 (September 2021-February 2022ish) - soft launch. Goals to drum up
  interest in the campaign, geared toward, but not exclusively focused on, major
  and principal gift donors. Campaign committee members will also need access
  to specific information on the site.

* Phase 2 (February 2022-the life of the campaign) - public launch to a broader
  Emory audience, including the full alumni base, faculty, staff, students,
  parents, community members.

## Tech Stack

[Next.js](https://nextjs.org/) open-source Javascript web framework, bootstrapped
with [`create-next-app`][create-next-app], and hosted on [Platform.sh][platform-sh]

## Getting started

Note: Local development requires Docker so that we can standardize software
versions and dependencies.

Install [Docker desktop](https://docker.com/products/docker-desktop) first.

### Installation & Development

    $ make dev

This command spins up the Docker container in development mode, installs node
dependencies via npm, and executes `npm run dev` internally, making the site
available at http://localhost:3000/ in your browser. Code changes in your
file system are detected and hot-reloaded in the browser.

### Production build

    $ make build

This command spins up the Docker container in production mode, installs node
dependencies via npm, and executes `npm run build` to build a static HTML
export of the project codebase making the site available via a basic HTTP
web server at http://localhost:8080/ in your browser. NOTE: Code changes in
your file system *are not monitored nor hot-reloaded* in the browser.

### Shutdown docker container

    $ make stop

This command stops either the local Docker development or production server.

### Log debugging

The `make dev` command itself shows console output from Next.js build process.

To see log info for the static HTML server from the prod build, run:

    $ docker-compose logs next_prod

## Platform.sh Integration

**Features include:**

* Node.js 14
* Automatic TLS certificates

**Customizations include:**

The following files and additions make the Next.js framework work on
Platform.sh, modified from the `npx` command [`create-next-app`][create-next-app].

* The `.platform.app.yaml`, `.platform/services.yaml`, and `.platform/routes.yaml`
  files provide Platform.sh-specific configuration.
* An additional module, [`config-reader-nodejs`][config-reader-nodejs], provides
  convenience wrappers for accessing the Platform.sh environment variables.
* A `scripts/platformsh_handle_mounts.sh` script leverages Platform build and
  deploy phases to add special handling for committed files pushed to directories
  also defined as mounts points via `.platform.app.yaml`.

## Project Resources

* [Creative Brief][creative-brief] (PDF)
* [Technical Brief][technical-brief] (GDocs)
* [Content Editor Guide][content-editor-guide] (GDocs)
* [Brand Guidelines][brand-guide] (GDrive folder)
* [Designs & Component Library][figma] (Figma)
* [Technical Spec][miro] (Miro)


[platform-sh]: https://platform.sh/marketplace/nodejs/
[create-next-app]: https://github.com/vercel/next.js/tree/canary/packages/create-next-app
[config-reader-nodejs]: https://github.com/platformsh/config-reader-nodejs
[creative-brief]: https://drive.google.com/file/d/1TFiqv9IY3kSJSGcR6pqZRUskEguNjGgA/view
[technical-brief]: https://docs.google.com/document/d/1QsFaQ1iJL__LEeZFuiLoUCdJ1gpkcrtfjijpMgwmOVw/
[brand-guide]: https://drive.google.com/drive/folders/1kmWQ2nrndwP6nzaY7_brTNkqytepOiE2
[figma]: https://www.figma.com/file/ts9PYKFK6a53xMCnplR50t/2O36
[miro]: https://miro.com/app/board/o9J_l7T5iRo=/
[content-editor-guide]: https://docs.google.com/document/d/1Tmr7MzXbNFwkzhJh7ibHq4DuHUwJl_D9RUAtmuHHyx0/
