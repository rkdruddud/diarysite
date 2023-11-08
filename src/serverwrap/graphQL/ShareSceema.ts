// 공유 스키마
import { gql } from '@apollo/client';


export const UPLOAD_IMG = gql`
  mutation singleUpload($id: String!, $date: String!, $filename: String!, $fileData) {
    singleUpload(id: $id, date: $date, filename: $filename, fileData:$fileData) {
      id
      date
      filename
      mimetype
      encoding
    }
  }
`;

export const GET_DIARY = gql`
  query getDiary($id: String!, $date: String!) {
    diary(id: $id, date: $date) {
      id
      date
      filename
      }
  }
`;
