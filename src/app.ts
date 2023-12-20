import express, {Express} from 'express'
import cors from 'cors'
import router from './routes/Router';
const port : number | string=  process.env.PORT || 5000;
const app : Express = express();
app.use(cors({origin: true}))

app.use(express.json())

app.use(router)

export const server = app.listen(port, () => {
        console.log('Running on port ' + port);
});


export default app;