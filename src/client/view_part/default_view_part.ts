// import * as THREE from 'three'

import { RestClient } from '../util/rest_client';
import { Control } from '../control';
import { ViewPart } from '../view_part';

export class DefaultViewPart extends ViewPart {

  constructor(public control: Control) {
    let rest = new RestClient(`http://localhost:10100`)
    console.log(rest)
    super(control)
  }

  async init(): Promise<void> {
    return super.init()
  }

  dispose(): void {
    super.dispose()
  }

  update(): void {
    super.update()
  }

  onkeydown(_: KeyboardEvent) {
  }

  onstart(args?: any) {
    console.log(args)
  }

  onstop(args?: any) {
    console.log(args)
  }
}
