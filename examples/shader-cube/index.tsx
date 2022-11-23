import { Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector3 } from 'three';

import Container from '../common/container';
import fragmentShader from './fragment.glsl';

new Container().init().then(({ canvas, raf, renderer, resizeRendererToDisplaySize }) => {
  renderer.autoClearColor = false;

  const camera = new OrthographicCamera(
    -1, // left
    1, // right
    1, // top
    -1, // bottom
    -1, // near,
    1 // far
  );
  const scene = new Scene();
  const plane = new PlaneGeometry(2, 2);
  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new Vector3() },
  };
  const material = new ShaderMaterial({
    fragmentShader,
    uniforms,
  });
  scene.add(new Mesh(plane, material));

  function render(time: number) {
    time *= 0.001; // convert time to seconds

    renderer.render(scene, camera);
    uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    uniforms.iTime.value = time;
    raf(render);
  }
  raf(render);
});
