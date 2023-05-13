import create from 'zustand';
import matching_json from'../../public/json/chracter_matching.json';

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
      console.log('>>>>zu) 현재 state:',newHair);
    },

    //헤어 메쉬 바꾸기
    hair_mesh_state:null,
    setHairMesh_state:(hair_state)=>{
      const matching=matching_json[0].헤어스타일[hair_state];
      set({hair_mesh_state:matching});
      console.log('>>>>>>들어온 값:',hair_state); //허쉬
      console.log('>>>>>>변환된 메쉬',matching);//hair_30_hush
    }
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
