import { Component } from '../../ECS/ComponentManager';
import { EntityId } from '../../ECS/ECSTypes';

export enum FollowType {
  LOCK = 'LOCK',
  SMOOTH = 'SMOOTH',
  LAG = 'LAG',
}

interface IFollow {
  followType: FollowType;
  active: boolean;
}

export class Follow extends Component<IFollow> {
  followType = FollowType.LOCK;
  active = true;
}
