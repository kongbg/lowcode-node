import dotenv from 'dotenv'
dotenv.config({path: `.env.${process.env.NODE_ENV}`}); // 将.env.***配置挂载到process上