import 'reset-css';
import { WebGLRenderer } from 'three';

export default class Container {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    document.body.appendChild(this.canvas);
  }

  async init(): Promise<{
    canvas: HTMLCanvasElement;
    raf: (callback: FrameRequestCallback) => number;
    renderer: WebGLRenderer;
    resizeRendererToDisplaySize: () => boolean;
  }> {

    return {
      canvas: this.canvas,
      raf: requestAnimationFrame,
      renderer: this.renderer,
      resizeRendererToDisplaySize: this.resizeRendererToDisplaySize.bind(this),
    };
  }
  

  resizeRendererToDisplaySize() {
    const pixelRatio = window.devicePixelRatio;
    const width = (this.canvas.clientWidth * pixelRatio) | 0;
    const height = (this.canvas.clientHeight * pixelRatio) | 0;
    const needResize = this.canvas.width !== width || this.canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  }
}
