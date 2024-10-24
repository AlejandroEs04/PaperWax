import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import productRoutes from './routes/ProductRoutes'
import paperRoutes from './routes/PaperRoutes'
import rawMaterialRoutes from './routes/RawMaterialRoutes'
import rollMaterialRoutes from './routes/RollMaterialRoutes'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())

// Routes 
app.use('/api/products', productRoutes)
app.use('/api/papers', paperRoutes)
app.use('/api/raw-material', rawMaterialRoutes)
app.use('/api/roll-material', rollMaterialRoutes)

export default app