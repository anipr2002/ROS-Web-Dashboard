import { create } from 'zustand';

export interface IService {
    serviceName: string;
    serviceType: string;
    args? : unknown
}

interface ServiceStore {
    defaultServiceList: IService[] | null;
    setDefaultServiceList: (defaultServiceList: IService[] | null) => void;
}


const useServiceStore = create<ServiceStore>((set) => ({
    defaultServiceList: null,
    setDefaultServiceList: (defaultServiceList) => set({ defaultServiceList }),
}));

export default useServiceStore;
