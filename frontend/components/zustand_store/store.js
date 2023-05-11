import create from 'zustand';


const useStore = create((set) => ({
    // state 선언
    glasses: null,
    setGlasses: (newGlasses) => {
      set({ glasses: newGlasses });
    },
  }));
  
export default useStore;
