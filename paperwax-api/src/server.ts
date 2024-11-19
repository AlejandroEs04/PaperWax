import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import productRoutes from './routes/ProductRoutes'
import paperRoutes from './routes/PaperRoutes'
import rawMaterialRoutes from './routes/RawMaterialRoutes'
import rollMaterialRoutes from './routes/RollMaterialRoutes'
import processRoutes from './routes/ProcessRoutes'
import authRoutes from './routes/AuthRouter'
import saleRoutes from './routes/SaleRoutes'
import { corsOptions } from './config/cors'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(cors(corsOptions))

// Routes 
app.use('/api/products', productRoutes)
app.use('/api/papers', paperRoutes)
app.use('/api/raw-material', rawMaterialRoutes)
app.use('/api/roll-material', rollMaterialRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/process', processRoutes)
app.use('/api/sales', saleRoutes)

export default app