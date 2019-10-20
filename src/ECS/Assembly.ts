interface IAssemblyComponent {
  name: string;
  init?: any;
}

export interface IAssembly {
  name: string;
  components: IAssemblyComponent[];
  immediate?: boolean;
}
