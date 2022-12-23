import Config from '@/constants/config';

interface SystemData {
  lock: boolean;
  timer: number;
  prevTimer: number;
}

export default class System {
  public static Get(): SystemData {
    const system = { lock: true, timer: 0, prevTimer: 15 };
    try {
      const localStorageData = localStorage.getItem(Config.LOCAL_STORAGE_KEY);
      if (localStorageData) {
        const systemData = JSON.parse(localStorageData) as SystemData;
        system.lock = typeof systemData.lock === 'boolean' ? !!systemData.lock : true;
        system.timer = typeof systemData.timer === 'number' ? systemData.timer || 0 : 0;
        system.prevTimer = typeof systemData.prevTimer === 'number' ? systemData.prevTimer || 15 : 15;
      }
    } catch (error) {
      console.error('localStorage parse error', error);
    }

    return system;
  }

  public static SetLock(enable: boolean) {
    const system = this.Get();
    system.lock = enable;
    localStorage.setItem(Config.LOCAL_STORAGE_KEY, JSON.stringify(system));
  }

  public static SetTimer(time: number) {
    const system = this.Get();
    system.timer = time;
    localStorage.setItem(Config.LOCAL_STORAGE_KEY, JSON.stringify(system));
  }

  public static SetPrevTimer(prevTimer: number) {
    const system = this.Get();
    system.prevTimer = prevTimer;
    localStorage.setItem(Config.LOCAL_STORAGE_KEY, JSON.stringify(system));
  }
}
