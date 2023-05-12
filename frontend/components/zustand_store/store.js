import create from 'zustand';


//FIXME - 새로고침 하면 사라짐 
const useStore = create((set) => ({
    // 안경 (처음엔 o,x )
    glasses_state: null,
    setGlasses_state: (newGlasses) => {
      set({ glasses_state: newGlasses });
    },

    //얼굴형
    face_state:null,
    setFace_state:(newFace)=>{
      set({face_state:newFace});
    },
    //헤어스타일
    hair_state:null,
    setHair_state:(newHair)=>{
      set({hair_state:newHair});
    },
  }));
  
export default useStore;
