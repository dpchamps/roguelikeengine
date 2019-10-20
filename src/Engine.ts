import { ecs } from './meta/ecs';
import { application } from './renderer/application';

export const Engine = {
  start() {
    document.body.appendChild(application.renderer.view);
    document.body.addEventListener('keydown', e => e.preventDefault());

    application.ticker.add(delta => {
      ecs.runSystems(delta);
      ecs.runSystemsLate(delta);
    });
  },

  spawn(assembly: string) {
    return ecs.spawn(assembly);
  },
};
