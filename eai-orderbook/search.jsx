import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Extended: useState(useContext(createContext(false))),

  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


const Body = props => {
  const Estilo = useThemeUI().theme.styles
  const [Loading, setLoading] = props.useContext.Loading.DataMain
  const [Extend, setExtend] = props.useContext.Extend.Search
  const Images = props.useContext.Images


// ----------------------------------

const ModuloSlim  = () => {

  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "21px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%" }}>
              <Text sx={Estilo.d1sb}>Buscar
              </Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(true)
                }}
              >
                <Image src={Images.Flechad[0].src} />
              </Button>
            </Box>
          </Flex>

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------

const ModuloSimple  = () => {
 // console.log({Images})
  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "27px", borderBottomStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "0px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%", mb:2 }}>
              <Text sx={Estilo.d1sb}>Buscar</Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(false)
                }}
              >
                <Image  src={Images.Flechau[0].src} />
              </Button>
            </Box>
          </Flex>

          <Filtros {...props} />
        </Box>
      </Flex>
    </div>
  )
}

// ------------------------------

  try {

    return (
      <Grid sx={{p:0, m: 0, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            {(props.useStatus.search()===1 & Extend) ? ModuloSimple() : <div/>}
            {(props.useStatus.search()===1 & !Extend) ? ModuloSlim() : <div/>}
          </div>
        }

      </Grid>
    )
    
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------

const Filtros = props => {
  const Estilo = useThemeUI().theme.styles;
  const [FiltroProceso, setFiltroProceso] = props.useContext.Filtro.Proceso
  const [Search, setSearch] = props.useContext.Search
  

  return (
    <Grid sx={{p:2, m: 2}}>
      <Flex sx={{ width: "100%", bg: "White" }} columns={[1,null,2]}>

      <Box sx={{ width: "50%", mr:2 }}>
        <Input {...props.useAcciones.useChange(Search, setSearch)} />
      </Box>

      </Flex>
    </Grid>
  );
};

// -----------------------------------------------------------------------------








// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div>
      <ContextProvider>
        <Flex>
          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------

