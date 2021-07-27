import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    button: {
      bg: "#00d8b2",
      color: "#0046b4",
    },
  },
})