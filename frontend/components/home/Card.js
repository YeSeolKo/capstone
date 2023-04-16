import tw from 'tailwind-styled-components';
import styled from 'styled-components';

export default function Card(contacts) {
  return(
    <div className='grid grid-cols-1 md:grid-cols-4 gap-8 sm:w-full'>
    <div className='p-6 bg-slate-400 rounded-md'
      key={contacts.id}
      name={contacts.name}
    /> 
    </div>
  );
}


