'use strict'

const express = require('express')
// const serve = require('express-static')
var cors = require('cors')
const { exec } = require("child_process")
// import { Session } from './session';
// const mqtt = require('mqtt')
// const { networkInterfaces } = require('os')


import { v4 as uuidv4 } from 'uuid'
const bodyParser = require('body-parser')
// const swaggerUi = require('swagger-ui-express');
import * as fs from 'fs';
import * as path from 'path';
// const copyfiles = require('copyfiles')
// import { Room } from './room';

// const service_name: string = 'camera-manager.service'

function getFiles(dir: string, baseDir: string, files: string[] = []): string[] {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, baseDir, files);
    } else {
      const relativePath = path.relative(baseDir, name);
      files.push(relativePath);
    }
  }
  return files;
}

function mkdir(path: string) {
  console.log(`path ${path}, ${path.length}`)
  for (var at = 0; ; ++at) {
    at = path.indexOf('/', at)
    if (at == 0) continue

    if (at == -1) at = path.length


    let tmp = path.slice(0, at)

    if (!fs.existsSync(tmp)) {
      fs.mkdirSync(tmp);
    }

    if (at == path.length) break
  }
}
// TODO: inotify /media

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

export class Control {
  private port: number | undefined
  private audio_files: string[] | undefined

  constructor(config: {port: number, rootdir: string}) {
    if (config.hasOwnProperty('port')) {
      this.port = config['port']
    }
  }

  init() {
    mkdir(this.media_path)
    this.audio_files = this.getAudioFiles()

    // let media_path = 'media'
    // const snapData = process.env.SNAP_DATA;
    // if(snapData) {
    //   media_path = `${snapData}/${media_path}`
    // }
    // else {
    //   media_path = path.join(__dirname, media_path)
    // }
    // console.log(`media path: ${media_path}`)
    
    app.use(express.static(path.join(__dirname, '../client')))
    app.use('/media', express.static(this.media_path))

    app.post('/', (req: { body: any; }, res: { json: (arg0: { result: string; id: any; }) => void; }) => {
      let id = uuidv4()
      let name = id;
      console.log(req.body);
      let body = req.body;
      if (body.hasOwnProperty('name')) {
        name = body.name;
      }

      console.log(`sessions: ${id}:${name} has been created successfully`)
    })

    app.get('/audio', (req: any, res: any) => {
      console.log('[GET] audio!!!!')
      res.json({
        result: 'ok',
        data: this.audio_files
      })
    })
  }

  start() {
    const server = app.listen(this.port, '0.0.0.0', () => {
      console.log(`server is running at ${server.address().port}`)
    })
  }

  getAudioFiles() {
    const directoryPath = this.media_path
    const allFiles = getFiles(directoryPath, directoryPath)
    console.log('All files:', allFiles)
    return allFiles.map(item => `/media/${item}`)
  }

  get media_path(): string {
    let p: string = 'media'
    const snapCommon: string | undefined = process.env.SNAP_COMMON;
    console.log(`SNAP_COMMON: ${process.env.SNAP_COMMON}`)
    if(snapCommon) {
      p = `${snapCommon}/${p}`
    }
    else {
      p = path.join(__dirname, p)
    }
    return p
  }
}
