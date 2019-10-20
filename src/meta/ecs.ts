import { ECS } from '../ECS/ECS';

import { Bounds } from '../core/components/Bounds';
import { Follow } from '../core/components/Follow';
import { Grid } from '../core/components/Grid';
import { Input } from '../core/components/Input';
import { PhysicsProperties } from '../core/components/PhysicsProperties';
import { Renderable } from '../core/components/Renderable';
import { Tile } from '../core/components/Tile';
import { TileMap } from '../core/components/TileMap';
import { TileSet } from '../core/components/TileSet';
import { Transform } from '../core/components/Transform';
import { World } from '../core/components/World';
import { AssetLoader } from '../core/systems/AssetLoader';
import { Physics } from '../core/systems/Physics';
import { PlayerController } from '../core/systems/PlayerController';
import { Renderer } from '../core/systems/Renderer';
import { TileMapRenderer } from '../core/systems/TileMapRenderer';
import { Viewport } from '../core/systems/Viewport';
import { WorldManager } from '../core/systems/WorldManager';

export const ecs = (() => {
  try {
    const ecs = new ECS();

    ecs.registerComponent(Bounds);
    ecs.registerComponent(Follow);
    ecs.registerComponent(Grid);
    ecs.registerComponent(Input);
    ecs.registerComponent(PhysicsProperties);
    ecs.registerComponent(Renderable);
    ecs.registerComponent(Tile);
    ecs.registerComponent(TileMap);
    ecs.registerComponent(TileSet);
    ecs.registerComponent(Transform);
    ecs.registerComponent(World);
    ecs.registerSystem(AssetLoader);
    ecs.registerSystem(Physics);
    ecs.registerSystem(PlayerController);
    ecs.registerSystem(Renderer);
    ecs.registerSystem(TileMapRenderer);
    ecs.registerSystem(Viewport);
    ecs.registerSystem(WorldManager);

    return ecs;
  } catch (e) {
    console.error('There was an error while wiring the ECS.', e);
  }
})()!;
