import { Component } from '../../ECS/ComponentManager';
import { Vector2D } from '../../util/Vector2D';

export enum ForceType {
  // Continuous force using mass
  CONTINUOUS,
  // Continuous force without mass,
  ACCELERATE,
  // Instant force using mass
  IMPULSE,
  // Instant force ignoring mass
  RAPID_ACCELERATE,
}

interface IPhysicsProperties {
  speed: number;
  maxSpeed: number;
  mass: number;
  velocity: Vector2D;
  force: Vector2D;
}

export class PhysicsProperties extends Component<IPhysicsProperties> {
  speed = 0;
  maxSpeed = 0;
  mass = 0;
  velocity = Vector2D.zero();
  force = Vector2D.zero();

  init(o: {} | IPhysicsProperties = {}) {
    super.init(o);
  }
}
