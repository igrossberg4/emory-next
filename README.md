![2036 Homepage screenshot](https://i.imgur.com/Nq9CHb1.jpeg)

# Emory University 2036 Campaign Website

Aspirational and visionary, the 2036 Campaign invests in people for the
benefit of people. Not only about how Emory moves forward but also how
investments in Emory will lead to a better world, 2O36 presents an inspiring
vision of what we will accomplish together.

The website engages Emory donors and constituents with stories, the “why”, the
potential impact of the campaign; communicating the goals of each of Emory’s
schools & units in order to raise awareness, increase engagement, and ultimately, garner financial support for the University.


# Milestones

* Phase 1 (September 2021-February 2022ish) - soft launch. Goals to drum up
interest in the campaign, geared toward, but not exclusively focused on, major
and principal gift donors. Campaign committee members will also need access to specific information on the site.

* Phase 2 (February 2022-the life of the campaign) - public launch to a broader Emory audience, including the full alumni base, faculty, staff, students,
parents, community members.

## Tech Stack

[Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Development using local environment

* Install javascript dependencies:

```bash
npm install
```

* Run the development server:

```bash
npm run dev
```

* Open [http://localhost:3000/](http://localhost:3000/) in your browser.

## Development using docker and docker compose

* Setup build:
```bash
docker-compose up -d
```
* Check the development server at http://localhost:3000/
  
* Check the production server at http://localhost:8080/
  
* Regenerate production build:
```bash
docker-compose up -d --build
```
or
```bash
docker-compose exec next_prod npm run build
```

* If not server or process is present at port 8080, check the logs with:
```bash
docker-compose logs next_prod
```

## Deployment using docker and npm
* Deployment:
It's required to run the command ```npm run build```. We have two ways of doing it:
- Using node v12 and using bash.
- Using docker-compose (the next_prod service) and stopping the process when it's done
  
After the production build is done, it would be present at the out/ directory into the root of the project. This folder contains the artifact ready to be used as a static site.

## Project Resources

* [Creative Brief][creative-brief] (PDF)
* [Technical Brief][technical-brief] (GDocs)
* [Brand Guidelines][brand-guide] (GDrive folder)
* [Designs & Component Library][figma] (Figma)
* [Technical Spec][miro] (Miro)

[creative-brief]: https://drive.google.com/file/d/1TFiqv9IY3kSJSGcR6pqZRUskEguNjGgA/view
[technical-brief]: https://docs.google.com/document/d/1QsFaQ1iJL__LEeZFuiLoUCdJ1gpkcrtfjijpMgwmOVw/
[brand-guide]: https://drive.google.com/drive/folders/1kmWQ2nrndwP6nzaY7_brTNkqytepOiE2
[figma]: https://www.figma.com/file/ts9PYKFK6a53xMCnplR50t/2O36
[miro]: https://miro.com/app/board/o9J_l7T5iRo=/
