import { Injectable } from '@angular/core';

import { Serializable } from '../interfaces/serializable';

@Injectable()
export class CacheService {

  /**
   * Load a list of serializable objects from local storage.
   * @param {string} key - The string containing the item key.
   * @param {new() => T} objType - The target class (Generic).
   * @return {Serializable[]} The loaded items.
   */
  public loadItemsFromCache<T extends Serializable>(key: string, objType: { new(): T }): T[] {
    let jsonItems = JSON.parse(localStorage.getItem(key));
    return this.parseItemsFromJSON(jsonItems, objType);
  }

  /**
   * Save a list of serializable objects to local storage.
   * @param {string} key - The string containing the item key.
   * @param {Serializable[]} items - The items to save to local storage.
   * @return {boolean} Successfully saved.
   */
  public saveItemsToCache(key: string, items: Serializable[]): boolean {
    let jsonItems = this.parseItemsToJSON(items);
    if (jsonItems) {
      try {
        localStorage.setItem(key, JSON.stringify(jsonItems));
        return true;
      } catch (e) { }
    }
    return false;
  }

  /**
   * Parse a list of serializable objects from JSON.
   * @param {any} jsonItems - The JSON item list that should be parsed.
   * @param {new() => T} objType - The target class (Generic).
   * @return {Serializable[]} The parsed items.
   */
  public parseItemsFromJSON<T extends Serializable>(jsonItems: any, objType: { new(): T }): T[] {
    let res: T[] = [];
    if (jsonItems) {
      for (let jsonItem of jsonItems) {
        let obj: T = new objType();
        obj.parseJSON(jsonItem);
        res.push(obj);
      }
    }
    return res;
  }

  /**
   * Parse a list of serializable objects to JSON.
   * @param {Serializable[]} items - The items to parse to JSON.
   * @return {any} The parsed JSON document.
   */
  public parseItemsToJSON(items: Serializable[]): any {
    let jsonItems = [];
    for (let item of items) {
      let jsonItem = item.toJSON();
      jsonItems.push(jsonItem);
    }
    return jsonItems;
  }

}
