# notplayer
npm + typescript + webpack

## Quick guide

### Install dependencies (only the first time)
```bash
npm i
```

### Run the local server at localhost:8080
```bash
npm run dev
```

### Run the server
```bash
npm run build:server
npm run start
```


### Build for production in the dist/ directory
```bash
npm run build
```


### snap packaging
```bash
npm run pack
```

```bash
sudo snap install ./notplayer_1.0.0_amd64.snap --dangerous --devmode
```

```bash
snap run --shell notplayer

node --version
# check if it's v20.9.0
```


## Default settings
- port: `10100`


## media files
```bash
mkdir -p /var/snap/notplayer/x1/media
```
and copy mp3 files in the above directory.
