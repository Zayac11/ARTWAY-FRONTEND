# Getting Started

This project was made by Dev.gang.


## Installation and layout

Download Node.js from https://nodejs.org/en/download/

Update npm

### `npm install -g npm`

clone this repository

### `git clone https://github.com/Zayac11/ARTWAY-FRONTEND <Folder_name>`

Open a console in a folder and go to the cloned repository

### `cd <Folder_name>`

Install the packages required for the project

### `npm install`

Finally start the project

### Change `api.js`

Open `<Folder_name>/src/api/api.js` and change const `debug` how you need

### Create `.env` file in the directory named `Folder_name` and add your secret data to it

```
REACT_APP_BASE_URL = <your local domain name/>
REACT_APP_PRODUCTION_URL = <your prod. domain name/>
```

### `npm start`

Now wait, our project will open soon in the browser on the http://localhost:3000/

## Build

1. Open console in `<Folder_name>`
2. `npm run build` builds the app for production to the build folder.
