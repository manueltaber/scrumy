import { Injectable } from '@angular/core';

import { CacheService } from '../services/cache.service';

@Injectable()
export class SettingService {

  constructor(public cacheService: CacheService) {
    
  }

}
