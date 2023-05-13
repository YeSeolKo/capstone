// //json파일
// import matching_json from'/json/chracter_matching.json';
import matching_json from'../../public/json/chracter_matching.json';

//hair_type이랑 hair_mesh 이름 매칭 
//아무 hair_type이나 가능 
export default function hairMeshMatching(hair_type) {
    const hair_mesh = matching_json[0].헤어스타일[hair_type];
    //if hair_type 원랭스면 -> hair_mesh 찾아줌 hair_25_onelength
    return hair_mesh;
    };

 