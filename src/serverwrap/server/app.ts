import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import RegisterRouter from './Routers/Register';
import LoginRouter from './Routers/Login';
import FindIDRouter from './Routers/FindID';
import FindPWRouter from './Routers/FindPW';
import DiaryRouter from './Routers/Diary';

import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import  {FileUpload } from 'graphql-upload/Upload.js';
import Upload from 'graphql-upload/Upload';
import {createWriteStream} from 'fs';
import { ApolloServer, gql } from 'apollo-server-express';
const app = express();
const PORT = 5000;
const typeDefs = gql`
  type Query {
    hello: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    singleUpload(id: String!, date: String!, filename: String!, fileData: Upload!): File
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: async (_:any, { id, date, filename, fileData }: { id: string, date: string, filename: string, fileData:  Promise<FileUpload> }) => {
      if (!id || !date || !filename || !fileData) {
        throw new Error("id, date, filename, and fileData are required fields.");
      }
  
      const { createReadStream, mimetype, encoding } = await fileData;
      const stream = createReadStream();
  
      // 파일을 저장할 경로를 설정
      const uploadPath = path.join(__dirname, 'uploads', filename);
      const writeStream = createWriteStream(uploadPath);
      stream.pipe(writeStream);
  
      // 파일 정보 및 id, date를 반환
      return { filename, mimetype, encoding, id, date };
    },
  },
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startGraphQLServer = async () =>{
   await server.start();
    server.applyMiddleware({ app , path:'/graphql'});
}

// 본인의 소스코드에서 apikey, domain이 적혀있는 env 파일을 지정.
dotenv.config({path: path.resolve(__dirname, "../../../.env")});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/Register', RegisterRouter);
app.use('/Login', LoginRouter);
app.use('/FindID', FindIDRouter);
app.use('/FindPW', FindPWRouter);
app.use('/UserHome', DiaryRouter);




app.use('/graphql', (req, res, next)=>{
    res.status(404).send("Start GraphQL Server");
});

app.use('/',(req, res, next)=>{
    res.status(404).send("Start Server");
});

app.listen(5000, function() {
    console.log('listening on 5000');
    
});



startGraphQLServer();