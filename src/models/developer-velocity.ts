import { Serializable } from '../interfaces/serializable';

export class DeveloperVelocity implements Serializable {

  public name: string;
  public velocity: number = 0.8;
  public sprintDays: number = 10;

  public parseJSON(json: any) {
    this.name = json['name'];
    this.velocity = json['velocity'];
    this.sprintDays = json['sprintDays'];
  }

  public toJSON(): any {
    return {
      name: this.name,
      velocity: this.velocity,
      sprintDays: this.sprintDays
    };
  }

}