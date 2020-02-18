### Purpose

This is an ExpressJS API service **interface** that sits between DHIS2 (data source) and the frontend. It is a middleware that handles:

- Simplifying requests & queries to DHIS API
- Cacheing/storage of commonly-used & large data chunks
- Pagination (splitting large data chunks for faster UI/frontend)
- Redundancy with cached data (limit calls to DHIS API)
- Offers options to replicate/extend use & implementation of the dashboard. Simply change the constants & configs & apply to another source program/DHIS2 instance

Eventually, this will be shipped along with with a React dashboard & packaged into a DHIS2 app. It will run [concurrently](https://github.com/kimmobrunfeldt/concurrently) with the React dashboard

---

### Development setup
1. Clone this repository
``` bash
$ git clone https://github.com/uonafya/gcd-middleware
```

2. Navigate to project directory
``` bash
$ cd gcd-middleware
```

2. Create a ``` .env ``` file using the example given and edit it accordingly
``` bash
$ cp .env.example .env
$ vi .env
```

3. Install dependencies
``` bash
$ npm install
```

4. Start/run the server
``` bash
$ npm run dev
```

---

### Structure
The folder structure is as follows:
#### Folder structure
```
📦gcd-middleware
 ┣ 📂middleware
 ┃ ┣ 📂county
 ┃ ┣ 📂national
 ┃ ┣ 📜common.js
 ┃ ┗ 📜dashboard.js
 ┣ 📂routes
 ┃ ┣ 📂county
 ┃ ┣ 📂national
 ┃ ┣ 📜common.js
 ┃ ┗ 📜dashboard.js
  ┣ 📂utils
 ┃ ┣ 📜index.js
 ┣ 📜README.md
 ┣ 📜index.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
 ```
 
 
## Credits
Developed and maintained by [USAID HealthIT](https://healthit.uonbi.ac.ke) for the [Ministry of Health](https://health.go.ke)
