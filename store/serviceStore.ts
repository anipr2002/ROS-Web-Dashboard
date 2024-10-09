import { create } from 'zustand';

interface ServiceStore{
   defaultServiceList : string[] | null;
   setDefaultServiceList : (defaultServiceList : string[] | null) => void;
}

const useServiceStore = create<ServiceStore>((set) => ({
    defaultServiceList : null,
    setDefaultServiceList : (defaultServiceList) => set({ defaultServiceList }),
}));


export default useServiceStore;
