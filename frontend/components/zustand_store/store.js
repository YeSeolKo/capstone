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


//NOTE 새로고침 - 사라지지 않게 
// 새로고침 시 Zustand 상태를 로컬 스토리지에 저장
useStore.subscribe(
  (snapshot) => {
    localStorage.setItem('zustandState', JSON.stringify(snapshot));
  },
  (state) => state
);

export default useStore;
