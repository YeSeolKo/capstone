import {proxy,useSnapshot} from 'valtio';

//상태관리
export const state = proxy({
    current: null,
    items: {
        hair:'#7b6314',
        face01:'#ebddad',
    }
  });
//함수
export const setHairColor=newHairColor=>{
    state.items.hair=newHairColor;
};
export const setFaceColor=newFaceColor=>{
    state.items.face01=newFaceColor;
};
export const setColor=newColor=>{
    state.color=newColor
}
