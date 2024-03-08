import Calculator from './components/Calculator'
import Box from '@mui/material/Box'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Calculator />
    </Box>
  )
}

export default App
