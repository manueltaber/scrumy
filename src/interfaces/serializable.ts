export interface Serializable {
  parseJSON(json: any);
  toJSON(): any;
}
