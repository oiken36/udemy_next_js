import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Album = {
  userId: number;
  id: number;
  title: string;
};

export const fetchAlbums = async () => {
  const result = await axios.get<Album[]>(
    'https://jsonplaceholder.typicode.com/albums'
  ).then();
  return result.data;
};

// export const AlbumList = () => {
//   const { data } = useQuery<Album[]>(['albums'], fetchAlbums);
//   return (
//     <div
//       style={{
//         height: '300px',
//         border: 'solid 2px gray',
//         margin: 'auto',
//         backgroundColor: 'cornsilk',
//         overflowY: 'scroll'
//       }}
//     >
//       <h2>アルバムリスト</h2>
//       {data?.map((album) => (
//         <p key={album.id}>{album.title}</p>
//       ))}
//     </div>
//   );
// };
